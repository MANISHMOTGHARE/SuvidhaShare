import React, { useState } from "react";
import Logo from "../assets/Suvidha_logo_transparent.png";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for mobile menu toggle

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      {/* Navbar Container */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-36 h-auto" />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-green-900 text-3xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Navbar Links (Desktop) */}
        <div className="hidden lg:flex gap-4">
          <NavButton to="/">HOME</NavButton>
          <NavButton to="/aboutus">ABOUT US</NavButton>
          <a
            href="https://suvidhafoundationedutech.org/SuvidhaEvents.php"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-900 text-white px-6 py-2 rounded-full font-bold flex items-center"
          >
            PROGRAMS
          </a>
          <NavButton to="/contactus">CONTACT US</NavButton>
          <NavButton to="/signup">SIGNUP</NavButton>
        </div>
      </div>

      {/* Mobile Menu (when open) */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-center gap-4 pb-4">
          <NavButton to="/" onClick={() => setIsOpen(false)}>HOME</NavButton>
          <NavButton to="/aboutus" onClick={() => setIsOpen(false)}>ABOUT US</NavButton>
          <a
            href="https://suvidhafoundationedutech.org/SuvidhaEvents.php"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-900 text-white px-6 py-2 rounded-full font-bold flex items-center"
          >
            PROGRAMS
          </a>
          <NavButton to="/contactus" onClick={() => setIsOpen(false)}>CONTACT US</NavButton>
          <NavButton to="/signup" onClick={() => setIsOpen(false)}>SIGNUP</NavButton>
        </div>
      )}
    </nav>
  );
};

// Reusable Button Component
const NavButton = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="bg-green-900 text-white px-6 py-2 rounded-full font-bold flex items-center"
  >
    {children}
  </Link>
);

export default Navbar;
