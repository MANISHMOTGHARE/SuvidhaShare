import React from "react";
import businessDiscussion from "../assets/businessDiscussion.webp";
import { GiHotMeal } from "react-icons/gi";

const ContactUs = () => {
  return (
    <div className="w-full">
      {/* First Section */}
      <div className="flex flex-col lg:flex-row bg-[#2d6a4f] p-4 lg:p-8 gap-4">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            className="w-full max-w-sm h-48 object-cover rounded-lg"
            src={businessDiscussion}
            alt="Business Discussion"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-center bg-[#DED6C3] p-4 text-center rounded-lg w-full lg:w-1/2">
          <GiHotMeal className="text-5xl text-[#2d6a4f]" />
          <h2 className="text-[#2d6a4f] text-base font-bold mt-2">
            JOIN OVER 175,000 BUSINESSES FIGHTING
          </h2>
          <h2 className="text-[#2d6a4f] text-base font-bold">
            FOOD WASTE WITH US
          </h2>
          <button className="bg-[#2d6a4f] text-white px-5 py-1 mt-3 rounded-full font-bold text-sm">
            CONTACT US
          </button>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col lg:flex-row bg-[#ddd4c1] p-4 lg:p-8 gap-4">
        {/* About */}
        <div className="w-full lg:w-1/4">
          <h3 className="text-[#2d6a4f] font-bold text-lg">
            Eat nutritious food because
          </h3>
          <h3 className="text-[#2d6a4f] font-bold text-lg">
            it makes your health so good.
          </h3>
          <img
            src="src/assets/Suvidha_logo_transparent.png"
            alt="Suvidha Share"
            className="mt-3 w-20"
          />
          <p className="text-[#837a68] text-sm mt-3">
            &copy; 2025 Suvidha Foundation • All Rights Reserved
          </p>
        </div>

        {/* Contact Info */}
        <div className="w-full lg:w-1/4">
          <h3 className="text-[#2d6a4f] font-bold text-lg">Get in touch</h3>
          <p className="text-[#837a68] text-sm mt-1">SuvidhaShare@gmail.com</p>

          <h3 className="text-[#2d6a4f] font-bold text-lg mt-4">
            Headquarters
          </h3>
          <p className="text-[#837a68] text-sm mt-1">
            Suvidha Foundation, Motghare Bhavan, Saoner, Nagpur, Maharashtra,
            India Pincode - 441102
          </p>
        </div>

        {/* Useful Links */}
        <div className="w-full lg:w-1/4">
          <h3 className="text-[#2d6a4f] font-bold text-lg">Useful</h3>
          <ul className="text-[#837a68] text-sm space-y-1 mt-1">
            <li><a href="#">Certificates</a></li>
            <li><a href="#">Platforms</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Legal and Privacy</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="w-full lg:w-1/4">
          <h3 className="text-[#2d6a4f] font-bold text-lg">Newsletter</h3>
          <p className="text-[#837a68] text-sm mt-1">
            Sign up to receive the latest news, updates, and special offers.
          </p>
          <input
            className="w-full mt-2 p-1 border-b border-[#837a68] bg-transparent focus:outline-none text-sm"
            type="email"
            placeholder="Enter your email"
          />
          <button className="mt-3 bg-[#2d6a4f] text-white px-4 py-1 rounded text-sm">
            Submit →
          </button>

          {/* Social Media Icons */}
          <div className="flex mt-4 space-x-3">
            <a href="#" className="text-[#2d6a4f] hover:text-blue-800">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H7v-3h3.5V9.1c0-3.4 2-5.3 5.1-5.3 1.5 0 3 .3 3 .3v3.2h-1.7c-1.7 0-2.3 1-2.3 2.1V12h4l-.6 3H14v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a href="#" className="text-[#2d6a4f] hover:text-pink-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.5 2A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2h-9Zm0 2h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4Zm9.75 2.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
