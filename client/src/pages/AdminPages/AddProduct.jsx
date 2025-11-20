import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { addNewProduct, getAllProducts } from "../../redux/slice/adminProductSlice";
import LoaderOverlay from "../../components/LoaderOverlay";

const AddProduct = () => {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);

  const { isLoading } = useSelector((state) => state.adminProduct)


  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productStock: "",
    productImage: null
  });

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

  const handleProductCancel = () => {
    navigate("/admin/products");
  };

  // Handle image + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProductData({ ...productData, productImage: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleProductSubmittion = (e) => {
    e.preventDefault();
    console.log(productData);
    dispatch(addNewProduct(productData))
      .then((res) => {
        console.log(res.payload.success);
        if(res.payload.success){
          dispatch(getAllProducts());
          navigate("/admin/products");
          toast.success("Product added successfully!"); 
          setProductData({});
          return;
        }else{
          const error = res.payload;
          toast.error(error);
        }
      })

    // navigate("/admin/products");
    // toast.success("Product added successfully!"); 
    // setProductData({});
  };

  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6 gap-6">

      {isLoading &&(
        <LoaderOverlay/>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-black font-serif">
          Add Product
        </h1>

        <button
          className="bg-red-600 text-xl px-4 py-2 rounded-xl font-bold text-white hover:bg-red-700"
          onClick={handleProductCancel}
        >
          Cancel
        </button>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleProductSubmittion}
        >

          {/* Image Upload */}
          <div className="flex flex-col">
            <label htmlFor="productImage" className="font-semibold mb-1">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              name="productImage"
              id="productImage"
              className="p-2 border rounded-md"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="mt-4 w-40 h-40 object-cover rounded-lg border shadow-md"
              />
            )}
          </div>

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
          <div className="flex flex-col col-span-1 md:col-span-2">
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
                setProductData({
                  ...productData,
                  productDescription: e.target.value
                })
              }
            ></textarea>
          </div>

          {/* Price */}
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
                setProductData({
                  ...productData,
                  productCategory: e.target.value
                })
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

          {/* Submit */}
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-xl text-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Add Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
