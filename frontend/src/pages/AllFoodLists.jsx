import React, { useEffect, useState } from "react";
import { Search, Truck } from "lucide-react";
import axios from "axios";

export default function AllFoodLists() {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/food/all");

        console.log("✅ API Response:", response.data);

        const foodsArray = response.data?.data?.foods || [];
        setFoodData(foodsArray);
      } catch (err) {
        console.error("❌ Error fetching food:", err);
        setError("Failed to fetch food data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const foodItems = foodData.map((item, index) => (
    <div
      className="bg-green-900 text-white p-6 rounded-lg flex items-center gap-4"
      key={index}
    >
      <Truck />
      <div>
        <h3 className="text-2xl">{item.title}</h3>
        <p className="text-lg">{item.description}</p>
        <p className="text-lg">Quantity: {item.quantity}</p>
        <p className="text-lg">Location: {item.location}</p>
        <p>Status: {item.status}</p>
      </div>
    </div>
  ));

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-5xl font-bold text-green-900">All Food Lists</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Food"
                className="pl-8 pr-4 py-1 border rounded-md"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" size={16} />
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-700 text-xl">Loading food data...</p>
        ) : error ? (
          <p className="text-red-500 text-xl">{error}</p>
        ) : (
          <div className="grid grid-cols-3 gap-6 mt-6">{foodItems}</div>
        )}
      </div>
    </div>
  );
}
