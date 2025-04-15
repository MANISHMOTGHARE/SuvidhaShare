import React from 'react';
import Background from '../assets/foodpic2.png';
import { GiForkKnifeSpoon } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import { IoEarthSharp } from "react-icons/io5";
import { GiShop } from "react-icons/gi";

const WhyUseSuvidhaShare = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-4 py-8"
      style={{
        backgroundImage: `url("${Background}")`,
      }}
    >
      <div className="bg-[#f9f3f0] rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-red-500 mb-2 text-center font-fredoka">
          Why Use
        </h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-6 text-center font-fredoka">
          Suvidha Share
        </h1>
        <div className="border-t-2 border-orange-400 w-full mx-auto mb-8"></div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex-1 flex flex-col items-center gap-2 text-center">
              <span className="text-5xl text-green-800">
                <MdFastfood />
              </span>
              <p className="text-green-700 text-base font-medium">
                Receive Nutritious Meals at No Cost
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2 text-center">
              <span className="text-5xl text-green-800">
                <GiForkKnifeSpoon />
              </span>
              <p className="text-green-700 text-base font-medium">
                Rescue Food Near You
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex-1 flex flex-col items-center gap-2 text-center">
              <span className="text-5xl text-green-800">
                <IoEarthSharp />
              </span>
              <p className="text-green-700 text-base font-medium">
                Help The Environment By Reducing Food Waste
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center gap-2 text-center">
              <span className="text-5xl text-green-800">
                <GiShop />
              </span>
              <p className="text-green-700 text-base font-medium">
                Experience Care from Local Cafes, Bakeries, and Restaurants
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUseSuvidhaShare;
