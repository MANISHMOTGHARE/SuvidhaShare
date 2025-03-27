import React, { useState } from "react";


const AddFood = () => {
  const [time, setTime] = useState("");

  return (
    <>
  

      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
        <div className="bg-green-800 p-10 rounded-2xl shadow-xl w-full max-w-3xl">
          <h2 className="text-4xl font-bold text-center text-black mb-8">ADD FOOD</h2>

          <div className="space-y-4">
            {/* Food Name */}
            <div>
              <label className="block text-black font-semibold mb-1 text-lg">Food Name</label>
              <input
                type="text"
                placeholder="Enter food name"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-black font-semibold mb-1 text-lg">Description</label>
              <textarea
                rows="4"
                placeholder="Enter food description..."
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg resize-none"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-black font-semibold mb-1 text-lg">Quantity</label>
              <input 
                type="number" 
                placeholder="Enter quantity" 
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg" 
              />
            </div>

            {/* Pickup Time */}
            <div>
              <label className="block text-black font-semibold mb-1 text-lg">Pick-Up Time</label>
              <div className="flex">
                <input 
                  type="time" 
                  className="w-full p-3 rounded-l-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg" 
                  onChange={(e) => setTime(e.target.value)}
                />
                <select 
                  className="p-3 rounded-r-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg" 
                  onChange={(e) => setTime(prev => prev + " " + e.target.value)}
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
                placeholder="Enter pickup location"
                className="w-full p-3 rounded-xl bg-gray-200 border-none focus:ring-2 focus:ring-green-500 text-lg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition duration-300">
              ADD FOOD
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFood;
