import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {

  const [formData, setFormData] = React.useState({
    email: '',
    password: '', 
  });

  const {user, loading, error} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogin = (e) => {

    e.preventDefault();

    dispatch(loginUser(formData))
      .then((res)=>{
        console.log(res);  
        
        if(res.payload.success){
          
          toast.success("Login successful!");
          setFormData({});
          navigate("/shop");
        }
        else{
          toast.error(`${res.payload}`);
        }
      })
    
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5">
          {/* Title */}
          <h2 className="text-3xl font-serif text-black text-center mb-8">
            Welcome Back
          </h2>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="you@example.com"
                value ={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e)=>setFormData({...formData,password:e.target.value})}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-3.5 rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer "
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-black hover:underline transition"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Optional Footer Text */}
        <p className="mt-8 text-center text-sm text-gray-500">
          © 2025 Zero Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;