const express = require('express');

const router = express.Router();

const multer = require('../../middleware/multer.middleware');

const productController = require("../../controllers/adminControllers/product.controller")

const authMiddleware = require('../../middleware/auth.middleware');


router.post("/add-product",multer.single("productImage"),authMiddleware,productController.addNewProduct);

router.delete("/delete-product/:id",authMiddleware,productController.deleteProduct);

router.put("/update-product/:id",authMiddleware,productController.editProductDetails);

router.put("/update/product-image/:id",multer.single("productImage"),authMiddleware,productController.updateProductImage);

router.get("/",authMiddleware,productController.getAllProducts);


module.exports = router;