const userModel = require('../models/user.model');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const generateAccessTokenAndRefreshToken = (userId, role, email) => {

    const accessToken = jwt.sign({
        userId,
        role,
        email
    }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    });

    const refreshToken = jwt.sign({
        userId,
        role,
        email
    }, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION
    });

    return { accessToken, refreshToken };
}

const hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

const userRegister = async (req, res) => {

    const { userName, password, email, gender, phoneNumber, role } = req.body;

    try {

        if(!userName || !password || !email ){
            return res.status(400).json({
                message: "Please provide all required fields",
                success: false
            })
        }

        // Checjk if user already exists

        const checkUser = await userModel.findOne({ email });

        if (checkUser) {
            return res.status(400).json(
                {
                    message: "User already exists",
                    success: false
                }
            )
        }

        // Hash password

        const hashedPassword =await  hashPassword(password);

        // Create new user
        const newUser = await userModel.create({
            userName,
            password: hashedPassword,
            email,
            gender,
            phoneNumber,
            role
        })

        // Generate tokens

        const { accessToken, refreshToken } = generateAccessTokenAndRefreshToken(newUser._id, role, email);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
        
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user:{
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role,
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const userLogin = async(req,res)=>{

    const { email, password } = req.body;

    try {
        
        // Check if user exists

        const checkUser = await userModel.findOne({ email });

        if(!checkUser){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false
            })
        }

        // Compare pasword 

        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid credentials",
                success:false
            })
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateAccessTokenAndRefreshToken(checkUser._id, checkUser.role, email);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
           
            maxAge: 15 * 60 * 1000 // 15 minutes
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user:{
                userName: checkUser.userName,
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const logout = async(req,res)=>{

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })
}

const checkUser = async(req,res)=>{

    const user = req.user;
    return res.status(200).json({
        success:true,
        user
    })
}

module.exports = {
    userRegister,
    userLogin,
    logout,
    checkUser
}