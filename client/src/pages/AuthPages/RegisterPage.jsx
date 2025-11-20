import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { registerUser } from '../../redux/slice/authSlice';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phoneNumber: "",
  })

  const navigate = useNavigate();

  const handleRegistration = (e) => {
    // console.log(formData);
    e.preventDefault();
    if (
      formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    // console.log(formData);
    // toast.success("Registered Successfully!");

    dispatch(registerUser(formData)).then((res) => {

      console.log(res.payload);

      if (res.payload.success) {
        toast.success("Registered Successfully!");
        navigate("/shop")
        setFormData({});

      } else {
        toast.error(`${res.payload}`);
      }

    })

  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Title */}
          <h2 className="text-3xl font-serif text-black text-center mb-8">
            Create Account
          </h2>

          <form className="space-y-6" onSubmit={handleRegistration}>
            {/* Username */}
            <div>
              <label htmlFor="userName" className="block text-sm font-semibold text-gray-800 mb-2">
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                required
                placeholder="johndoe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-400"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Gender - Radio Buttons (Better UX than checkboxes) */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">Gender</label>
              <div className="flex gap-6">
                {['Male', 'Female', 'Other'].map((option) => (
                  <label key={option} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={option.toLowerCase()}
                      className="w-4 h-4 text-black focus:ring-black border-gray-300"
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    />
                    <span className="ml-2 text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-800 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-400"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-400"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-gray-400"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-3.5 rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer "
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-black hover:underline transition"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          © 2025 Zero Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;