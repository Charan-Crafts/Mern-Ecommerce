import React from "react";
import { useNavigate } from "react-router-dom";
import AdminProductComponent from "../../components/AdminComponents/AdminProductComponent";
import {useDispatch,useSelector} from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "../../redux/slice/adminProductSlice";
const Products = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {productList} = useSelector((state)=>state.adminProduct)

  const handleAddNewProduct = () => {
    navigate("/admin/add-product");
  };

  console.log(productList);
  

  useEffect(()=>{
    dispatch(getAllProducts())
    .then((res)=>{
      // console.log(res);
    });
  },[dispatch]);

  return (
    <div className="bg-gray-400 min-h-screen mt-4 p-4 flex flex-col">

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-black font-serif mb-6 text-shadow-lg">
          Products Management
        </h1>

        <div className="w-full flex items-center justify-around">
          <input
            type="search"
            className="p-2 rounded-md w-2/8 text-xl border-b-2 bg-gray-50 shadow-md"
            placeholder="Search products"
          />
          <button
            className="ml-4 px-6 py-2 bg-black text-white rounded-xl shadow-md hover:shadow-xl text-xl cursor-pointer"
            onClick={handleAddNewProduct}
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product list */}
      <div className="bg-gray-50 mt-3 grid grid-cols-4 gap-4 p-4 rounded-2xl shadow-lg overflow-y-auto">
        {
          productList.map((product)=>{
            return <AdminProductComponent productDetails ={product}/>
          })
        }
      </div>
    </div>
  );
};

export default Products;
