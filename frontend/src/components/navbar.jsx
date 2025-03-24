import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  //Reusable function for navigation
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <nav className="flex justify-between items-center p-2 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <img
          src="src/assets/logo.png"
          alt="Suvidha Share"
          className="w-40 max-h-12 object-contain"
        />
        <span className="text-gray-700 font-semibold text-lg"></span>
      </div>
      <div className="flex gap-4">
        <button className="bg-green-900 text-white px-6 py-2 rounded-full font-bold flex items-center gap-1">
          CONTACT US
        </button>
        <button
          className="bg-green-900 text-white px-6 py-2 rounded-full font-bold flex items-center gap-1"
          onClick={() => handleNavigation("/signup")}
        >
          SIGNUP
        </button>
        <button className="bg-green-900 text-white px-6 py-2 rounded-full font-bold flex items-center gap-1">
          ABOUT US
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
