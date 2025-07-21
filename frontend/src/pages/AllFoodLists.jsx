import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// A new, simple component to display each food item
const FoodCard = ({ food }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <img 
      // We'll add the correct image source later once we create the 'get food image' endpoint
      src={`http://localhost:5000/api/v1/food/image/${food._id}`} 
      alt={food.title} 
      className="w-full h-40 object-cover rounded-md mb-4 bg-gray-200"
      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400?text=No+Image' }}
    />
    <h3 className="text-xl font-bold text-green-800">{food.title}</h3>
    <p className="text-gray-600 capitalize">Category: {food.category}</p>
    <p className="text-gray-600">Quantity: {food.quantity}</p>
    <p className="text-gray-600">Location: {food.location}</p>
    <button className="mt-4 w-full bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600">
      View Details
    </button>
  </div>
);

export default function AllFoodLists() {
  const { api } = useAuth();
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `/food/all?search=${query}`;
        const response = await api.get(url);
        const foodsArray = response.data?.data?.foods || [];
        setFoodData(foodsArray);
      } catch (err) {
        setError("Failed to fetch food data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, api]);

  const handleQueryChange = (e) => setQuery(e.target.value);
  
  // ✅ FIX: Added the .map() to render the food cards
  const foodItems = foodData.map(food => (
    <FoodCard key={food._id} food={food} />
  ));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-green-900">All Food Lists</h2>
        <div className="relative">
          {/* ✅ FIX: Connected the input to the state */}
          <input
            type="text"
            placeholder="Search Food"
            className="pl-8 pr-4 py-1 border rounded-md"
            value={query}
            onChange={handleQueryChange}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-700 text-xl">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-xl">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {foodItems.length > 0 ? foodItems : <p>No food listings found.</p>}
        </div>
      )}
    </div>
  );
}