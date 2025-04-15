import React from "react";
import businessDiscussion from "../assets/businessDiscussion.webp";
import { GiHotMeal } from "react-icons/gi";

const ContactUs = () => {
  return (
    <div>
      {/* First Container */}
      <div className="flex flex-col md:flex-row bg-[#2d6a4f] mx-auto p-6 md:p-10 gap-6">
        {/* Left Container */}
        <div className="flex-1">
          <img
            className="h-64 w-full md:w-96 object-cover mx-auto"
            src={businessDiscussion}
            alt="Business Discussion"
          />
        </div>
        
        {/* Right Container */}
        <div className="flex-1 flex flex-col bg-[#DED6C3] text-center font-bold justify-center items-center p-6 rounded-xl">
          <GiHotMeal className="text-6xl md:text-8xl text-[#2d6a4f]" />
          <p className="text-[#2d6a4f] mt-4 text-xl md:text-2xl">JOIN OVER 175,000 BUSINESSES FIGHTING</p>
          <p className="text-[#2d6a4f] text-xl md:text-2xl">FOOD WASTE WITH US</p>
          <button className="bg-[#2d6a4f] text-white px-6 py-2 rounded-full font-bold mt-4">CONTACT US</button>
        </div>
      </div>

      {/* Second Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-[#ddd4c1] p-6 md:p-10">
        {/* About Section */}
        <div>
          <h3 className="text-[#2d6a4f] font-bold text-2xl">Eat nutritious food</h3>
          <p className="text-[#2d6a4f]">It makes your health better.</p>
          <img src="src/assets/Suvidha_logo_transparent.png" alt="Suvidha Logo" className="w-40 mt-4" />
          <p className="text-[#837a68] mt-4">&copy; 2025 Suvidha Foundation. All Rights Reserved.</p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-[#2d6a4f] text-xl font-bold">Get in touch</h3>
          <a className="text-[#837a68] block mt-2" href="mailto:SuvdhaShare@gmail.com">SuvdhaShare@gmail.com</a>
          <h3 className="text-[#2d6a4f] text-xl font-bold mt-6">Headquarters</h3>
          <p className="text-[#837a68]">Suvidha Foundation, Motghare Bhavan, Saoner, Nagpur, Maharashtra, India - 441102</p>
        </div>

        {/* Useful Links */}
        <div>
  <h3 className="text-[#2d6a4f] text-xl font-bold">Useful</h3>
  <div className="text-[#837a68] mt-2">
    <a href="#" className="mb-2 block">Certificates</a> 
    <a href="#" className="mb-2 block">Platforms</a>
    <a href="#" className="mb-2 block">FAQ</a>
    <a href="#" className="mb-2 block">Legal and Privacy</a>
    <a href="#" className="mb-2 block">Blog</a>
  </div>
</div>





        {/* Newsletter */}
        <div>
          <h3 className="text-[#2d6a4f] text-xl font-bold">Newsletter</h3>
          <p className="text-[#837a68] mt-2">Sign up for the latest news and offers.</p>
          <input className="w-full p-2 mt-2 border border-gray-300 rounded" type="email" placeholder="Enter your email" />
          <button className="bg-[#2d6a4f] text-white px-4 py-2 rounded mt-2 w-full">Submit →</button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;