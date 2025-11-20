const { uploadToCloudinary, deleteFromCloudinary } = require("../../config/Cloudinary")
const productModel = require("../../models/product.model");
const addNewProduct = async (req, res) => {
    const { productName, productDescription, productPrice, productCategory, productStock } = req.body;

    const file = req.file.path;


    try {   

        const user = req.user;

        if (user.role !== "admin") {

            return res.status(403).json({
                message: "Access denied. Admins only.",
                success: false
            });
        }
        // Get the cloudinary url

        const cloudinaryResponse = await uploadToCloudinary(file);

        // Create a new product object

        const productRequest = {
            productName,
            productDescription,
            productPrice,
            productCategory,
            image: cloudinaryResponse,
            stockQuantity: productStock,
            productCategory
        }

        const newProduct = await productModel.create(productRequest);

        return res.status(201).json({
            message: "New product added successfully",
            success: true,
            data: newProduct
        })


    } catch (error) {
        console.log("error", error);
        return res.status(500).json(
            {
                message: "Error while adding new product",
                error,
                success: false
            }
        );
    }
}

const deleteProduct = async (req, res) => {

    const productId = req.params.id;

    const user = req.user;

    if (user.role !== "admin") {

        return res.status(403).json({
            message: "Access denied. Admins only.",
            success: false
        });
    }

    try {
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        const image = deletedProduct.image;

        const publicId = image.split("/").at(-1).split(".")[0];

        const response = await deleteFromCloudinary(publicId);

        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            data:deletedProduct._id
        })

    } catch (error) {
        console.log("error while deleting the product", error);
        return res.status(500).json({
            message: "Error while deleting the product",
            error,
            success: false
        });
    }
}

const editProductDetails = async (req, res) => {

    const productId = req.params.id;

    const updates = req.body;

    try {

        const user = req.user;

        if (user.role !== "admin") {

            return res.status(403).json({
                message: "Access denied. Admins only.",
                success: false
            });
        }

        const findProduct = await productModel.findById(productId);

        console.log(updates);


        if (!findProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        const updateProduct = await productModel.findByIdAndUpdate(
            productId,
            { $set: updates },
            { new: true }
        )

        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            data: updateProduct
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while updating the product",
            error,
            success: false
        });
    }
}

const updateProductImage = async (req, res) => {

    const productId = req.params.id;

    console.log(req.file,productId);
    
    const file = req.file.path;

    try {
        const user = req.user;

        if (user.role !== "admin") {

            return res.status(403).json({
                message: "Access denied. Admins only.",
                success: false
            });
        }

        const findProduct = await productModel.findById(productId);

        const oldImageId = findProduct.image;

        const publicId = oldImageId.split("/").at(-1).split(".")[0];

        const deleteOldProductImage = await deleteFromCloudinary(publicId);

        // Now store the new Image to cloudinary

        const cloudinaryResponse = await uploadToCloudinary(file);
        // console.log("Clodu");
        
        console.log(cloudinaryResponse);
        

        findProduct.image = cloudinaryResponse;

        await findProduct.save();

        return res.status(200).json({
            message: "Product image updated successfully",
            success: true,
            data: findProduct
        });

    } catch (error) {
        console.log("error", error);

        return res.status(500).json({
            message: "Error while updating the product image",
            error,
            success: false
        });

    }
}

const getAllProducts = async (req, res) => {

    try {

        

        const products = await productModel.find({});

        return res.status(200).json({
            message: "All products fetched successfully",
            success: true,
            data: products
        });

    } catch (error) {
        log("error", error);
        return res.status(500).json({
            message: "Error while fetching all products",
            error,
            success: false
        });
    }
}
module.exports = { addNewProduct, deleteProduct, editProductDetails, updateProductImage, getAllProducts };