import React, { useEffect, useState } from "react";
import { Search, Truck } from "lucide-react";
import axios from "axios";
import FoodDetails from "./FoodDetails"; // Add this import

export default function AllFoodLists() {
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = query
        ? `http://localhost:5000/api/v1/food/all?search=${query}`
        : `http://localhost:5000/api/v1/food/all`;
      const response = await axios.get(url);
      const foodsArray = response.data?.data?.foods || [];
      setFoodData(foodsArray);
    } catch (err) {
      setError("Failed to fetch food data");
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (e) => setQuery(e.target.value);

  return (
    <div className="p-6">
      {/* Search and Heading */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl font-bold text-green-900">All Food Lists</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Food"
            value={query}
            onChange={handleQueryChange}
            className="pl-8 pr-4 py-1 border rounded-md"
          />
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
           