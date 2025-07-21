import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddFood = () => {
  const { user } = useAuth();
  const [addFood, setAddfood] = useState({
    title: "",
    description: "",
    quantity: "",
    pickupTime: "",
    location: "",
    price: 0,
    category: "other",
    foodType: "veg"
  });
  const [image, setImage] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddfood({ ...addFood, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    try {
      // Use FormData for file upload
      const formData = new FormData();
      Object.entries(addFood).forEach(([key, value]) => formData.append(key, value));
      if (image) formData.append("image", image);

      const response = await axios.post(
        'http://localhost:5000/api/v1/food/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      );

      setSuccess("Food added successfully!");
      setError("");
      setAddfood({
        title: "",
        description: "",
        quantity: "",
        pickupTime: "",
        location: "",
        price: 0,
        category: "other",
        foodType: "veg"
      });
      setImage(null);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong!");
      setSuccess("");
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
        <div className="bg-green-800 p-10 rounded-2xl shadow-xl w-full max-w-3xl">
          <h2 className="text-4xl font-bold text-center text-white mb-8">ADD FOOD</h2>

          {success && <div className="text-green-300 text-xl font-bold mb-4 text-center">{success}</div>}
          {error && <div className="text-red-300 text-xl font-bold mb-4 text-center">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Food Name */}
            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-1 text-lg">Food Name</label>
              <input
                type="text"
                name="title"
                placeholder="Enter food name"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={addFood.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-1 text-lg">Description</label>
              <textarea
                rows="3"
                name="description"
                placeholder="Enter food description..."
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg resize-none"
                value={addFood.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-white font-semibold mb-1 text-lg">Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={addFood.quantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-white font-semibold mb-1 text-lg">Price (₹)</label>
              <input
                type="number"
                name="price"
                placeholder="0 for free"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={addFood.price}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-white font-semibold mb-1 text-lg">Category</label>
              <select
                name="category"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={addFood.category}
                onChange={handleChange}
              >
                <option value="meal">Cooked Meal</option>
                <option value="grocery">Grocery</option>
                <option value="bakery">Bakery Items</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Food Type */}
            <div>
              <label className="block text-white font-semibold mb-1 text-lg">Food Type</label>
              <select
                name="foodType"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={addFood.foodType}
                onChange={handleChange}
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            {/* Pickup Time */}
            <div>
              <label className="block text-white font-semibold mb-1 text-lg">Pick-Up Time</label>
              <input
                type="time"
                name="pickupTime"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={addFood.pickupTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-white font-semibold mb-1 text-lg">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter pickup location"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={addFood.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-1 text-lg">
                Food Image (optional)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="block w-full bg-gray-200 rounded-lg py-2 px-4"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition duration-300 cursor-pointer"
            >
              ADD FOOD
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddFood;