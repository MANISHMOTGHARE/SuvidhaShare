import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import { AuthProvider } from "./context/AuthContext.jsx";

// axios configuration
import "./axiosConfig.js";

// Import your components
import Dashboard from "./components/Dashboard";
import Navbar from "./components/navbar";
import HeroSection from "./components/HeroSection";
import Solutions from "./components/Solutions";
import Nutrition from "./components/nutrition";
import WhyUseSuvidhaShare from "./components/whyUseSuvidhaShare";
import Gallery from "./components/gallery";
import ClientTestimonials from "./components/clientTestmonials";
import ContactUs from "./components/contactUs";
import AboutUs from "./pages/AboutUs";
import SignIn from "./components/signin";
import SignUp from "./components/SignUp";
import AddFood from "./components/AddFoodList";
import AllFoodLists from "./pages/AllFoodLists.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {" "}
        {/* Wrapping the app with Router to enable routing */}
        {/* Navbar will be available on all pages */}
        <Routes>
          {" "}
          {/* Only one Route will be rendered at a time */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/allfoodlists" element={<AllFoodLists />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/addfood" element={<AddFood/>}></Route>
          {/* Default Route (Home page) */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HeroSection />
                <Solutions />
                <Nutrition />
                <WhyUseSuvidhaShare />
                <Gallery />
                <ClientTestimonials />
                <ContactUs />
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
