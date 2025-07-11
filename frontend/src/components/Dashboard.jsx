import { useState, useEffect } from 'react';
import { Search, User, LogOut, Settings, Truck, ClipboardList, Gift } from 'lucide-react';
import Sidebar from './sidebar';
import { useAuth } from '../context/AuthContext';
import AllFoodLists from '../pages/AllFoodLists';

import { Link } from 'react-router-dom';
import axios from 'axios';
function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDelivered: 0,
    totalPending: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/v1/food/my-foods', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      
      const foods = response.data.data.foods;
      setStats({
        totalDonations: foods.length,
        totalDelivered: foods.filter(f => f.status === 'claimed').length,
        totalPending: foods.filter(f => f.status === 'available').length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <User size={24} />
            <span>{user?.email || 'Guest'}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-green-700 text-white p-6 rounded-lg flex items-center gap-4">
            <Gift size={24} />
            <div>
              <h3 className="text-lg">Total Donations</h3>
              <p className="text-3xl font-bold">{stats.totalDonations}</p>
            </div>
          </div>
          
          <div className="bg-green-700 text-white p-6 rounded-lg flex items-center gap-4">
            <Truck size={24} />
            <div>
              <h3 className="text-lg">Total Delivered</h3>
              <p className="text-3xl font-bold">{stats.totalDelivered}</p>
            </div>
          </div>
          
          <div className="bg-green-700 text-white p-6 rounded-lg flex items-center gap-4">
            <ClipboardList size={24} />
            <div>
              <h3 className="text-lg">Total Pending</h3>
              <p className="text-3xl font-bold">{stats.totalPending}</p>
            </div>
          </div>
        </div>

        {/* Add food button */}
        <div className="mt-6">
          <Link to="/addfood">
            <button className="bg-yellow-500 text-black font-bold my-5 py-5 px-8 rounded-full text-lg hover:bg-yellow-400 text-white transition duration-300 cursor-pointer">
              Add Food Donations
            </button>
          </Link>
        </div>
        
        {/* Food Dashboard */}
        <div className="mt-6">
          <AllFoodLists />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/5 bg-green-900 text-white p-4 flex flex-col items-center">
        <User size={48} className="mb-4" />
        <p className="text-lg font-bold">{user?.email || 'Guest'}</p>
        <p className="text-sm">{user?.fullname || 'User'}</p>
        <p className="text-sm capitalize">{user?.role || 'individual'}</p>
        
        <div className="flex flex-col items-center mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Gift size={20} /> {stats.totalDonations} Donations
          </div>
          <div className="flex items-center gap-2">
            <Truck size={20} /> {stats.totalDelivered} Delivered
          </div>
          <div className="flex items-center gap-2">
            <ClipboardList size={20} /> {stats.totalPending} Pending
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;