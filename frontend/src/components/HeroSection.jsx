import React from "react";

const HeroSection = () => {
  return (
    <header className="relative bg-green-900 text-white text-center py-24 px-4">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('src/assets/back.png')" }}
      ></div>
      <div className="relative z-10 text-center p-4 sm:p-6 md:p-8 lg:p-10">
        <h2 className="text-xl sm:text-xl font-bold">Reduce Food Waste with Suvidha Share</h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold my-6 ">Suvidha Share</h1>
        <p className="lg:text-xs sm:text-xl font-bold max-w-2xl mx-auto ">
          Connecting Restaurants And Customers To Reduce Food Waste By Offering Leftover Meals At Great Discounts.
        </p>
      </div>
    </header>
  );
};

export default HeroSection;
