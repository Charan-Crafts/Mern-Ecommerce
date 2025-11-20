import React from 'react';
import AuthLayout from './pages/AuthPages/AuthLayout';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/AuthPages/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage';
import Dashboard from './pages/AdminPages/Dashboard';
import AdminLayout from './pages/AdminPages/AdminLayout';
import Orders from './pages/AdminPages/Orders';
import Products from './pages/AdminPages/Products';
import ShopLayout from './pages/ShopPages/ShopLayout';
import ShopProducts from './pages/ShopPages/ShopProducts';
import Cart from './pages/ShopPages/Cart';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { checkAuthenticatedUser } from './redux/slice/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProduct from './pages/AdminPages/AddProduct';
import EditPage from './pages/AdminPages/EditPage';
const App = () => {


  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  // Replace with real user data

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(checkAuthenticatedUser())
      .then((res) => {
        // console.log(res);  

        if (!res.payload.success) {
          toast.error("Session Expired! Please login again.");
          navigate("/login");
        }

        if (res.payload.success) {
          const user = res.payload.user?.role; // <-- get role from API response

          if (user === 'admin') {
            navigate("/admin");
          } else {
            navigate("/shop");
          }
        }
      });

    console.log(user);



  }, [dispatch]);

  return (
    <div className='p-3'>
      <ToastContainer />
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </ProtectedRoutes>
        }>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/admin" element={

          <ProtectedRoutes isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </ProtectedRoutes>
        }>
          <Route path="" element={<Dashboard />} />
          <Route path="orders" element={<Orders />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="add-product" element={<AddProduct />}></Route>
          <Route path='edit-product' element={<EditPage />}></Route>
        </Route>

        <Route path="/shop" element={
          <ProtectedRoutes isAuthenticated={isAuthenticated} user={user}>
            <ShopLayout />
          </ProtectedRoutes>
        }>
          <Route path="" element={<ShopProducts />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
