import React from 'react';
import Background from '../assets/food.png';
import { GiHotMeal } from "react-icons/gi";
import { FaPeopleCarry } from "react-icons/fa";
import { GiFoodTruck } from "react-icons/gi";

const Nutrition = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-6 py-12"
      style={{ backgroundImage: `url("${Background}")` }}
    >
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-12 text-center">
        Nourishing Communities, One Meal at a Time
      </h1>

      {/* Responsive Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white font-bold w-full max-w-6xl">
        
        {/* Rescued Meals */}
        <div className="flex flex-col items-center text-center">
          <span className="text-7xl md:text-8xl mb-6">
            <GiHotMeal />
          </span>
          <h2 className="text-3xl md:text-4xl mb-4">Rescued Meals</h2>
          <div className="border-t-2 border-orange-400 my-2 w-3/4"></div>
          <p className="text-lg md:text-2xl">Fresh, surplus food shared with those in need</p>
        </div>

        {/* Community Dining */}
        <div className="flex flex-col items-center text-center">
          <span className="text-7xl md:text-8xl mb-6">
            <FaPeopleCarry />
          </span>
          <h2 className="text-3xl md:text-4xl mb-4">Community Dining</h2>
          <div className="border-t-2 border-orange-400 my-2 w-3/4"></div>
          <p className="text-lg md:text-2xl">Everyone deserves a warm meal. Join us in sharing.</p>
        </div>

        {/* Save Surplus */}
        <div className="flex flex-col items-center text-center">
          <span className="text-7xl md:text-8xl mb-6">
            <GiFoodTruck />
          </span>
          <h2 className="text-3xl md:text-4xl mb-4">Save Surplus</h2>
          <div className="border-t-2 border-orange-400 my-2 w-3/4"></div>
          <p className="text-lg md:text-2xl">Partnering with food businesses to reduce waste</p>
        </div>

      </div>
    </div>
  );
};

export default Nutrition;
