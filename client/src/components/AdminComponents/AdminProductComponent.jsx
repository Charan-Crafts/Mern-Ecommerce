import React, { useState } from "react";
import { SquarePen, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteProduct, getAllProducts } from "../../redux/slice/adminProductSlice";
import LoaderOverlay from "../LoaderOverlay";
import { useNavigate } from "react-router-dom";
import EditPage from "../../pages/AdminPages/EditPage";

const AdminProductComponent = ({ productDetails }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const handleDeleteProduct = async (id) => {
    setIsDeleting(true);

    const res = await dispatch(deleteProduct(id));

    if (res.payload.success) {
      toast.success("Product deleted successfully");
      dispatch(getAllProducts());
    }

    setIsDeleting(false);
  };

  const handleEditMode = (productDetails) => {
    setEditMode(true);
    console.log(productDetails);
    
    navigate("/admin/edit-product",{
      state: { productDetails: productDetails }
    });
    
  }

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 w-56 hover:shadow-xl transition-all duration-300" key={productDetails._id}>

      {/* Loader only for this product */}
      {isDeleting && <LoaderOverlay />}

      {/* Product Image */}
      <img
        src={productDetails.image}
        alt={productDetails.name}
        className="w-full h-36 object-contain rounded-lg"
      />

      {/* Text Content */}
      <div className="mt-3 space-y-1 py-3 border-t border-gray-200">
        <h3 className="text-base font-semibold text-gray-900 text-center mb-3">
          {productDetails.productName}
        </h3>
        <p className="text-xs text-gray-500">{productDetails.productCategory}</p>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-black mt-1">
            ₹{productDetails.productPrice}
          </p>

          <p>
            {productDetails.stockQuantity === 0 ? (
              <span className="bg-red-400 px-2 py-1 rounded-xl text-white text-xs font-bold">
                Out of stock
              </span>
            ) : (
              <span className="font-bold bg-gray-200 rounded-full p-1">{productDetails.stockQuantity}</span>
            )}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-4">
        <button className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition" onClick={()=>handleEditMode(productDetails)}>
          <SquarePen size={20} className="text-black" />
        </button>

        <button
          className="w-10 h-10 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition"
          onClick={() => handleDeleteProduct(productDetails._id)}
        >
          <Trash size={20} className="text-red-600" />
        </button>
      </div>

    </div>
  );
};

export default AdminProductComponent;
