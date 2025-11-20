const cloudinary = require('cloudinary').v2;

const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadToCloudinary = async(filePath)=>{

    try {

        if(!filePath)return null;

        const response = await cloudinary.uploader.upload(filePath);

        // console.log("response from cloudinary",response);


        fs.unlinkSync(filePath); //deleting the file from local storage after uploading to cloudinary


        return response.url;
        
    } catch (error) {
        console.log("error while uploading the image into cloudinary",error);
        
    }

}

const deleteFromCloudinary = async(publicId)=>{

    try {

        const response = await cloudinary.uploader.destroy(publicId);

    
        return response;
        
    } catch (error) {
        log("error while deleting the image from cloudinary",error);
    }
}

module.exports = {uploadToCloudinary,deleteFromCloudinary};