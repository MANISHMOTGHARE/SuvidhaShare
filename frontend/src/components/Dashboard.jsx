import { useState, useEffect } from 'react';
import { Search, User, LogOut, Settings, Truck, ClipboardList, Gift } from 'lucide-react';
import Sidebar from './sidebar';
import { useAuth } from '../context/AuthContext';
import AddFood from './AddFoodList';
import AllFoodLists from '../pages/AllFoodLists';
import { Link } from 'react-router-dom'
import Logo from '../assets/suvidhasharelogo.png';

function Dashboard() {

  
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <User size={24} />
            <span>Sanju@gmail.com</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {[
            { title: "Total Donations", icon: Gift },
            { title: "Total Deliver", icon: Truck },
            { title: "Total Pending", icon: ClipboardList },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-green-700 text-white p-6 rounded-lg flex items-center gap-4"
            >
              <item.icon size={24} />
              <div>
                <h3 className="text-lg">{item.title}</h3>
                <p className="text-3xl font-bold">{index === 2 ? 9 : 89}</p>
                <p>Today: 36 Yesterday: 43</p>
              </div>
            </div>
          ))}
        </div>

        {/*Add food button */}
        <div>
          <Link to="/addfood">
            <button className="bg-yellow-500 text-black font-bold my-5 py-5 px-8 rounded-full text-lg hover:bg-yellow-400 text-white transition duration-300 cursor-pointer">
              Add Food Donations
            </button>
          </Link>
        </div>
        {/* Food Dashboard */}
        <div>
          <AllFoodLists />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/5 bg-green-900 text-white p-4 flex flex-col items-center">
        <User size={48} className="mb-4" />
        <p className="text-lg font-bold">Sanju@gmail.com</p>
        <div className="flex flex-col items-center mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Gift size={20} /> Total Donations
          </div>
          <div className="flex items-center gap-2">
            <Truck size={20} /> Total Deliver
          </div>
          <div className="flex items-center gap-2">
            <ClipboardList size={20} /> Pending Order
          </div>
        </div>
        <img
          src="/placeholder-image.png"
          alt="User Profile"
          className="mt-4 w-24 h-24 rounded-full border-2 border-white"
        />
      </div>
    </div>
  );
}

export default Dashboard;