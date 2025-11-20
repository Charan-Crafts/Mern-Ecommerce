const mongoose = require('mongoose');

const connectDB = async () => {

    try {

        const response = await mongoose.connect(process.env.MONGO_URL)

        if (response) {
            console.log("MongoDB connected successfully");
        }
        
    } catch (error) {
        console.log("Error while connecting to MongoDB",error);
        
    }
}

module.exports = connectDB;