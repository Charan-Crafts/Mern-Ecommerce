const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productCategory:{
        type:String,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true});

const Product =mongoose.model("Product",productSchema);

module.exports=Product;