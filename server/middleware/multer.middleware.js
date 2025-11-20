const multer = require('multer');

const fs = require('fs');

const path = require('path');

// Store the file in a temporary location before uploading to cloudinary

const uploadPath = path.join(__dirname,"../public/temp");


// If the uploadPath directory does not exist, create it
if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath,{recursive:true});
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage }) 

module.exports = upload;