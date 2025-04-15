import React, { useState, useEffect } from "react";
import { Search, FileQuestion, User, LogOut, Settings, Truck, ClipboardList, Gift, ScrollText, LayoutDashboard, Store, MapPinHouse, MessageCircleMore } from 'lucide-react';
import axios from "axios";

export default function AllFoodLists() {
    const [foodData, setFoodData] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/food/my-foods');
                console.log("API Response:", response.data); 

                if (response.data && response.data.data && response.data.data.foods && Array.isArray(response.data.data.foods)) {
                    setFoodData(response.data.data.foods); 
                } else {
                    console.error("Unexpected API response:", response.data);  
                    setError(new Error("Failed to load food data. Unexpected API response.")); 
                    setFoodData([]); 
                }

                setLoading(false);

            } catch (err) {
                console.error("Error fetching food data:", err); 
                setError(new Error("Failed to load food data. Please try again later.")); 
                setLoading(false);
                setFoodData([]); 
            }
        };

        fetchData();
    }, []);


    let foodItems;  
    if (loading) {
        foodItems = <div>Loading...</div>;
    } else if (error) {
        foodItems = <div>Error: {error.message}</div>;
    } else if (foodData && Array.isArray(foodData)) { 
        foodItems = foodData.map((item, index) => (
            <div className="bg-green-900 text-white p-6 rounded-lg flex items-center gap-4"
                 key={index}>
                <Truck/>
                <div>
                    <h3 className="text-xl">{item.title}</h3>
                    <p className="text-xs">{item.description}</p>
                    <span className="text-sm">Quantity: {item.quantity}</span>
                    <p className="text-sm">Location: {item.location}</p>
                </div>
            </div>
        ));
    } else {
        foodItems = <div>No food data available.</div>; 
    }


    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-5xl font-bold text-green-900">All Food Lists</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input type="text" placeholder="Search Food"
                                   className="pl-8 pr-4 py-1 border rounded-md"/>
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" size={16}/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-6"> {foodItems} </div>

            </div>


        </div>
    );
}