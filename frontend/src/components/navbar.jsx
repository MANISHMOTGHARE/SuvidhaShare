import React, { useState } from "react";
import Logo from "../assets/suvidhasharelogo.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For mobile menu icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  return (
    <nav className="bg-white shadow-md p-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="User Profile" className="w-32 h-auto" />
        </div>

        {/* Desktop Menu (Hidden on small screens) */}
        <div className="hidden md:flex gap-4">
          <Link to="/" className="bg-green-900 text-white px-6 py-2 rounded-full font-bold">HOME</Link>
          <Link to="/aboutus" className="bg-green-900 text-white px-6 py-2 rounded-full font-bold">ABOUT US</Link>
          <button className="bg-green-900 text-white px-6 py-2 rounded-full font-bold">PROGRAMS</button>
          <button className="bg-green-900 text-white px-6 py-2 rounded-full font-bold">CONTACT US</button>
          <Link to="/signup" className="bg-green-900 text-white px-6 py-2 rounded-full font-bold">SIGNUP</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-green-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu (Visible when isOpen is true) */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-white shadow-lg">
          <Link to="/" className="bg-green-900 text-white px-6 py-2 rounded-full font-bold w-4/5 text-center">HOME</Link>
          <Link to="/aboutus" className="bg-green-900 text-white px-6 py-2 rounded-full font-bold w-4/5 text-center">ABOUT US</Link>
          <button className="bg-green-900 text-white px-6 py-2 rounded-full font-bold w-4/5">PROGRAMS</button>
          <button className="bg-green-900 text-white px-6 py-2 rounded-full font-bold w-4/5">CONTACT US</button>
          <Link to="/signup" className="bg-green-900 text-white px-6 py-2 rounded-full font-bold w-4/5 text-center">SIGNUP</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
