import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddFood = () => {
    const { api } = useAuth(); // Get the central api instance from context
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        quantity: "",
        pickupTime: "",
        location: "",
        price: 0,
        category: "meal",
        foodType: "veg"
    });
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = new FormData();
        Object.entries(formData).forEach(([key, value]) => submissionData.append(key, value));

        // ✅ FIX: Changed field name from "image" to "foodImage"
        if (image) {
            submissionData.append("foodImage", image);
        }

        try {
            // ✅ FIX: Using central `api` instance. No manual headers needed.
            await api.post('/food/add', submissionData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            setSuccess("Food added successfully!");
            setError("");
            setFormData({
                title: "", description: "", quantity: "", pickupTime: "",
                location: "", price: 0, category: "meal", foodType: "veg"
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
        <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
            <div className="bg-green-800 p-10 rounded-2xl shadow-xl w-full max-w-3xl">
                <h2 className="text-4xl font-bold text-center text-white mb-8">ADD FOOD</h2>

                {success && <div className="text-green-300 text-xl font-bold mb-4 text-center">{success}</div>}
                {error && <div className="text-red-300 text-xl font-bold mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Food Name */}
                        <div className="md:col-span-2">
                            <label className="block text-white font-semibold mb-1 text-lg">Food Name</label>
                            <input
                                type="text" name="title" placeholder="Enter food name"
                                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                                value={formData.title} onChange={handleChange} required
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-white font-semibold mb-1 text-lg">Description</label>
                            <textarea
                                rows="3" name="description" placeholder="Enter food description..."
                                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg resize-none"
                                value={formData.description} onChange={handleChange} required
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-white font-semibold mb-1 text-lg">Quantity</label>
                            <input
                                type="number" name="quantity" placeholder="Enter quantity"
                                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                                value={formData.quantity} onChange={handleChange} required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-white font-semibold mb-1 text-lg">Price (₹)</label>
                            <input
                                type="number" name="price" placeholder="0 for free"
                                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                                value={formData.price} onChange={handleChange}
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-white font-semibold mb-1 text-lg">Category</label>
                            <select
                                name="category"
                                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                                value={formData.category} onChange={handleChange}
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
                                value={formData.foodType} onChange={handleChange}
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
                                type="text" name="pickupTime" placeholder="e.g., 4 PM - 6 PM"
                                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                                value={formData.pickupTime} onChange={handleChange} required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-white font-semibold mb-1 text-lg">Location</label>
                            <input
                                type="text" name="location" placeholder="Enter pickup location"
                                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-yellow-500 text-lg"
                                value={formData.location} onChange={handleChange} required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="md:col-span-2">
                            <label className="block text-white font-semibold mb-1 text-lg">Food Image (optional)</label>
                            <input
                                type="file" name="foodImage" accept="image/*"
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
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
                </form>
            </div>
        </div>
    );
};

export default AddFood;