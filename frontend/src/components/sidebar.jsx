import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, User, History, HelpCircle, Settings, LogOut } from 'lucide-react';
import Logo from '../assets/suvidhasharelogo.png';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="h-screen bg-green-900 text-white p-4 flex flex-col">
      <div className="mb-6">
        <img src={Logo} alt="SuvidhaShare Logo" className="w-48 bg-white p-2 rounded-md" />
      </div>
      <ul className="space-y-4 flex-grow">
        {/* ✅ FIX: Links are now functional */}
        <SidebarLink to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
        <SidebarLink to="/dashboard/profile" icon={<User />} label="User Profile" />
        <SidebarLink to="/dashboard/history" icon={<History />} label="Food History" />
        <SidebarLink to="/dashboard/help" icon={<HelpCircle />} label="Help & Center" />
      </ul>
      <div>
         {/* ✅ FIX: Logout button now works */}
        <SidebarLink to="/dashboard/settings" icon={<Settings />} label="Settings" />
        <li onClick={handleLogout} className="flex items-center gap-4 p-2 rounded-md hover:bg-green-800 cursor-pointer">
          <LogOut /> Logout
        </li>
      </div>
    </div>
  );
};

// Helper component for cleaner code
const SidebarLink = ({ to, icon, label }) => (
  <li>
    <Link to={to} className="flex items-center gap-4 p-2 rounded-md hover:bg-green-800">
      {icon} {label}
    </Link>
  </li>
);

export default Sidebar;