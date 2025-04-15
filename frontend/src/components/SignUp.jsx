import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Background from "../assets/back.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "individual",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);  // Add menuOpen state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");

    try {
      const response = await axios.post("/user/signup", formData);
      setSuccess(response.data.message);
      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "individual",
      });

      if (response.status >= 200 && response.status < 300) {
        navigate("/signin");
      } else {
        console.error("Sign Up failed");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center pt-20"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <header className="w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* ✅ Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="Suvidha Logo" className="h-10 mr-2" />
            <span className="text-lg font-bold text-green-700">
              Suvidha Foundation
            </span>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            className="lg:hidden block text-green-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* ✅ Navbar Links */}
          <nav
            className={`lg:flex space-x-6 ${menuOpen ? "block" : "hidden"} absolute lg:relative top-16 lg:top-0 bg-white lg:bg-transparent w-full lg:w-auto left-0 lg:flex-row flex-col lg:items-center shadow-md lg:shadow-none p-4 lg:p-0`}
          >
            <a href="/" className="text-green-700 font-semibold block lg:inline-block p-2">
              Home
            </a>
            <a href="/aboutus" className="text-green-700 font-semibold block lg:inline-block p-2">
              About Us
            </a>
            <a href="#" className="text-green-700 font-semibold block lg:inline-block p-2">
              Programs
            </a>
            <a href="#" className="text-green-700 font-semibold block lg:inline-block p-2">
              Contact Us
            </a>
            <a
              href="/signin"
              className="bg-green-600 text-white px-4 py-2 rounded block lg:inline-block text-center"
            >
              SignIn
            </a>
          </nav>
        </div>
      </header>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-20 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome To</h2>
        <div className="text-4xl font-bold text-green-700 flex justify-center items-center">
          <span className="mr-2">Suvidha</span>
          <span className="text-orange-500">Share</span>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6 w-full">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label className="block">Select Role:</label>
          <select
            name="role"
            className="w-full px-4 py-2 border rounded"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="individual">Individual</option>
            <option value="volunteer">Volunteer</option>
            <option value="organisation">Restaurant</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
