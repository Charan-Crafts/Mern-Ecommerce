import React, { useState, useEffect } from "react";
import LoaderOverlay from "../../components/LoaderOverlay";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { updateImage } from "../../redux/slice/adminProductSlice";
import { getAllProducts,updateProductDetails } from "../../redux/slice/adminProductSlice";
const EditPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.adminProduct);

    // Get product details from navigation state
    const productDetails = location.state?.productDetails || {};

    const [productData, setProductData] = useState({
        productName: "",
        productDescription: "",
        productPrice: "",
        productCategory: "",
        productStock: "",
        productImage: null
    });

    const [imageLoading, setImageLoading] = useState(false);

    const [imagePreview, setImagePreview] = useState(productDetails.image || null);

    const categories = [
        "Electronics",
        "Clothing",
        "Books",
        "Home & Kitchen",
        "Sports & Outdoors",
        "Health & Beauty",
        "Toys & Games",
        "Automotive",
        "Grocery & Gourmet Food",
        "Pet Supplies"
    ];

    useEffect(() => {
        // Pre-fill form with existing product details
        setProductData({
            productName: productDetails.productName || "",
            productDescription: productDetails.productDescription || "",
            productPrice: productDetails.productPrice || "",
            productCategory: productDetails.productCategory || "",
            productStock: productDetails.stockQuantity || "",
            productImage: null
        });
    }, [productDetails]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData({ ...productData, productImage: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    

    const handleImageUpdate = async (productId) => {
        console.log("Image update logic to be implemented");
        console.log(productId);
        if(productData.productImage === null){
            toast.error("Please select an image first");
            return;
        }

        setImageLoading(true);
        const response = await dispatch(updateImage({productImage: productData.productImage, id: productId}))
        
        if(response.payload.success){
            toast.success("Image updated successfully");

            // add update the image in the preview
            setImagePreview(response.payload.data.image);

            dispatch(getAllProducts());
        }
        else{
            toast.error(response.payload.message);
        }
        setImageLoading(false);
    }

    const handleProductUpdate =async (e) => {
        e.preventDefault();
        console.log("Product update logic to be implemented");
        const request = {
            productName: productData.productName,
            productDescription: productData.productDescription,
            productPrice: productData.productPrice,
            productCategory: productData.productCategory,
            stockQuantity: productData.productStock
        }

        const response = await dispatch(updateProductDetails({id:productDetails._id, productDetails:request}));

        if(response.payload.success){
            toast.success("Product details updated successfully");
            dispatch( getAllProducts() );
            navigate(-1);
        }
        else{
            toast.error(response.payload.message);
        }       
        
    }

    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col p-6 gap-6">

            {isLoading && <LoaderOverlay />}

            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-4xl font-bold text-black font-serif">
                    Update Product
                </h1>

                <div className=" w-2/4 flex items-center justify-around">
                    <button
                        className="bg-black text-xl px-4 py-2 rounded-xl font-bold text-white hover:bg-gray-700"
                        onClick={(e)=>handleProductUpdate(e)}
                    >
                        Update
                    </button>

                    <button
                        className="bg-red-600 text-xl px-4 py-2 rounded-xl font-bold text-white hover:bg-red-700"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>



            </div>

            {/* Form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    
                >

                    {/* Image Upload & Preview */}
                    <div className="flex flex-col items-center">
                        <label className="font-semibold mb-2 text-gray-700">
                            Product Image
                        </label>

                        <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden mb-2 bg-gray-50 hover:border-gray-400 transition">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Product Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">No Image Selected</span>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            id="productImage"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="productImage"
                            className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            Choose Image
                        </label>

                        <button className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition mt-8" disabled={imageLoading} onClick={()=>handleImageUpdate(productDetails._id)}> 
                            {
                                imageLoading ? "Updating..." : "Update Image"
                            }
                        </button>


                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-4">
                        {/* Product Name */}
                        <div className="flex flex-col">
                            <label htmlFor="productName" className="font-semibold mb-1">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="productName"
                                className="p-2 border rounded-md"
                                placeholder="Enter product name"
                                value={productData.productName}
                                onChange={(e) =>
                                    setProductData({ ...productData, productName: e.target.value })
                                }
                            />
                        </div>

                        {/* Product Description */}
                        <div className="flex flex-col">
                            <label htmlFor="productDescription" className="font-semibold mb-1">
                                Product Description
                            </label>
                            <textarea
                                id="productDescription"
                                rows="4"
                                className="p-2 border rounded-md"
                                placeholder="Enter product description"
                                value={productData.productDescription}
                                onChange={(e) =>
                                    setProductData({ ...productData, productDescription: e.target.value })
                                }
                            ></textarea>
                        </div>

                        {/* Product Price */}
                        <div className="flex flex-col">
                            <label htmlFor="productPrice" className="font-semibold mb-1">
                                Product Price (₹)
                            </label>
                            <input
                                type="number"
                                id="productPrice"
                                className="p-2 border rounded-md"
                                placeholder="0.00"
                                value={productData.productPrice}
                                onChange={(e) =>
                                    setProductData({ ...productData, productPrice: e.target.value })
                                }
                            />
                        </div>

                        {/* Category */}
                        <div className="flex flex-col">
                            <label htmlFor="productCategory" className="font-semibold mb-1">
                                Product Category
                            </label>
                            <select
                                id="productCategory"
                                className="p-2 border rounded-md"
                                value={productData.productCategory}
                                onChange={(e) =>
                                    setProductData({ ...productData, productCategory: e.target.value })
                                }
                            >
                                <option value="">--- Select ---</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Stock */}
                        <div className="flex flex-col">
                            <label htmlFor="productStock" className="font-semibold mb-1">
                                Product Stock
                            </label>
                            <input
                                type="number"
                                id="productStock"
                                className="p-2 border rounded-md"
                                placeholder="Enter stock quantity"
                                value={productData.productStock}
                                onChange={(e) =>
                                    setProductData({ ...productData, productStock: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPage;
