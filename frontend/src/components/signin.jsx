import React, { useState } from "react";
import Signlogo from "../assets/suvidhasharelogo.png";
import Food from "../assets/food.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call login API
    try {
      const response = await axios.post("/user/login", {
        email: email,
        password: password,
      });


      if (response.status === 200) {
        const role  = response.data.data.user.role; 
        localStorage.setItem("user", response.data);
        console.log(role)

        //Redirect user to dashboard
        
          navigate('/dashboard')
      } 
      else {
        console.error("Login failed:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${Food})` }}
    >
      <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-bold">Welcome To</h1>
          <img src={Signlogo} alt="Logo" className="max-w-xs mt-2" />
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:ring focus:ring-indigo-300"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:ring focus:ring-indigo-300"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 text-gray-500"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/SignUp" className="text-indigo-600 hover:underline cursor-pointer">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
