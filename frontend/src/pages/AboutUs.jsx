import React from "react";
import Navbar from "../components/navbar";
import ContactUs from "../components/contactUs";
import Aboutpic from "../assets/aboutuspic1.png";
import Aboutpic2 from "../assets/aboutuspic2.png";
import Aboutpic3 from "../assets/aboutuspic3.png";
import Aboutpic4 from "../assets/aboutuspic4.png";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <Aboutusfirstsection
        aboutuspic={Aboutpic}
        aboutushead={"ABOUT US"}
        aboutuspara={
          "Suvidha Share is an initiative dedicated to providing food to those in need. It aims to alleviate hunger by ensuring that surplus food from various sources is collected and distributed to underprivileged communities. The organization focuses on creating a sustainable food-sharing model that encourages community participation and reduces food waste."
        }
        aboutusbutton={"Contact Us"}
      />
      <AboutussecSection
        aboutuspic={Aboutpic2}
        aboutushead={"MISSION"}
        aboutuspara={
          "Our mission is to combat hunger and reduce food waste by creating a sustainable food-sharing network. We are dedicated to collecting surplus food from various sources and distributing it to underserved communities, ensuring that no one goes hungry. We empower individuals and businesses to join us in fostering a culture of sharing, compassion, and social responsibility."
        }
        aboutusbutton={"Contact Us"}
      />
      <Aboutusfirstsection
        aboutuspic={Aboutpic3}
        aboutushead={"VISION"}
        aboutuspara={
          "Our vision is a world where everyone has access to nutritious food and food waste is minimized. We aspire to create a community-driven movement that inspires collaboration and innovation in addressing hunger. By promoting awareness and encouraging active participation, we aim to build a society where sharing food becomes a norm, transforming lives and strengthening our communities."
        }
        aboutusbutton={"Contact Us"}
      />
      <AboutusthridSection 
        aboutuspic={Aboutpic4}
        aboutushead={'By partnering with local restaurants, grocery stores, and volunteers, Suvidha Share seeks to create a compassionate network that addresses hunger while promoting social responsibility and awareness around food distribution issues. Their mission is not just to feed the hungry but also to foster a culture of sharing and caring within communities.'}
      />
      <ContactUs />
    </>
  );
};

export default AboutUs;

const Aboutusfirstsection = (props) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-200 p-6 md:p-8">
      <div className="w-full md:w-1/2 p-4">
        <img className="mix-blend-multiply w-full max-w-sm mx-auto" src={props.aboutuspic} alt="aboutuspic" />
      </div>
      <div className="w-full md:w-1/2 p-4 text-center md:text-left">
        <h2 className="mb-4 text-[#2d6a4f] text-3xl md:text-5xl font-bold">
          {props.aboutushead}
        </h2>
        <p className="text-[#2d6a4f] text-lg md:text-xl text-justify">
          {props.aboutuspara}
        </p>
        <button className="bg-[#2d6a4f] text-lg text-white px-4 py-2 mt-4 rounded-md">
          {props.aboutusbutton}
        </button>
      </div>
    </div>
  );
};

const AboutussecSection = (props) => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center bg-gray-200 p-6 md:p-8">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="mb-4 text-[#2d6a4f] text-3xl md:text-5xl font-bold">
          {props.aboutushead}
        </h2>
        <p className="text-[#2d6a4f] text-lg md:text-xl text-justify">
          {props.aboutuspara}
        </p>
        <button className="bg-[#2d6a4f] text-lg text-white px-4 py-2 mt-4 rounded-md">
          {props.aboutusbutton}
        </button>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <img className="mix-blend-multiply w-full max-w-sm mx-auto" src={props.aboutuspic} alt="aboutuspic" />
      </div>
    </div>
  );
};

const AboutusthridSection = (props) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-[#2d6a4f] p-6 md:p-12">
      <div className="w-full md:w-1/2 text-center md:text-left text-white">
        <h5 className="mb-4 text-2xl md:text-3xl font-bold">
          {props.aboutushead}
        </h5>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <img className="w-full max-w-sm mx-auto" src={props.aboutuspic} alt="aboutuspic" />
      </div>
    </div>
  );
};
