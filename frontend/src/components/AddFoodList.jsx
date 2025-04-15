import React, { useState } from "react";
import axios from "axios";
import {useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
  const [addFood, setAddfood] = useState({
    title: "",
    description: "",
    quantity: "", 
    pickupTime: "",
    timePeriod: "AM",
    location: "",
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
      setAddfood({ ...addFood, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('user');
     try {
          const response = await axios.post('http://localhost:5000/api/v1/food/add', addFood, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          setSuccess("Food added successfully!");
          setError("");
          setAddfood({ title: "",
            description: "",
            quantity: "", 
            pickupTime: "",
            location: "", });

          setTimeout(() => {
              navigate('/dashboard');
            }, 1500);

        } catch (err) {
          console.error(err);
          setError(err.response?.data?.error || "Something went wrong!");
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
    <>
  
  <form onSubmit={handleSubmit} className="space-y-4">
      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
        <div className="bg-green-800 p-10 rounded-2xl shadow-xl w-full max-w-3xl">
          <h2 className="text-4xl font-bold text-center text-black mb-8">ADD FOOD</h2>
          {success && <div className="text-green-500 text-4xl font-bold mb-4">{success}</div>}
          {error && <div className="text-red-500 text-4xl font-bold mb-4">{error}</div>}
          <div className="space-y-4">
            {/* Food Name */}
            <div>
              <label className="block text-black font-semibold mb-1 text-lg">Food Name</label>
              <input
                type="text"
                name="title"
                placeholder="Enter food name"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg"
                value={addFood.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-black font-semibold mb-1 text-lg">Description</label>
              <textarea
                rows="4"
                 name="description"
                placeholder="Enter food description..."
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg resize-none"
                value={addFood.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-black font-semibold mb-1 text-lg">Quantity</label>
              <input 
                type="number" 
                name="quantity"
                placeholder="Enter quantity" 
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg" 
                value={addFood.quantity}
                onChange={handleChange}
                required
              />
            </div>

            {/* Pickup Time */}
            <div>
              <label className="block text-black font-semibold mb-1 text-lg">Pick-Up Time</label>
              <div className="flex">
                <input 
                  type="time" 
                   name="pickupTime"
                  className="w-full p-3 rounded-l-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg" 
                  value={addFood.pickupTime}
                  onChange={handleChange}
                  required
                />
                <select 
                  className="p-3 rounded-r-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg" 
                  name="timePeriod"
                  value={addFood.timePeriod}
                  onChange={handleChange}
                  required
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-black font-semibold mb-1 text-lg">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter pickup location"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg"
                value={addFood.location}
                onChange={handleChange}
                required              
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition duration-300 cursor-pointer">
              ADD FOOD
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  );
};

export default AddFood;
