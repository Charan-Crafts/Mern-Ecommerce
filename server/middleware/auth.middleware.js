const jwt =  require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {

    try {

        let token = ""

        if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken
        } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        // verify token

        const decode = jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET);

        if(!decode){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        req.user = decode;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = authMiddleware
