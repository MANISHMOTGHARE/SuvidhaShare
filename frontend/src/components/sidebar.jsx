import { Search, User, LogOut, Settings, LayoutDashboard, FileQuestion,  Truck, ClipboardList, Gift } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/suvidhasharelogo.png';



const Sidebar = () => {
  const { userRole, userName } = useAuth();
  console.log(userRole)

  return (
    <div>
      {/* Sidebar */}
      <div className="h-full bg-green-900 text-white p-4">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
        <img src={Logo} alt="User Profile" className="mt-4 w-58 h-25 bg-white" />
        </h1>
        <ul className="space-y-4">
        <li className="flex cursor-pointer gap-4"> <LayoutDashboard /> Dashboard</li>
        <li className="flex cursor-pointer gap-4"> <User /> User Profile</li>
        <li className="flex cursor-pointer gap-4"> <Truck /> Food History</li>
        <li className="flex cursor-pointer gap-4"><FileQuestion /> Help & Center</li>
        <li className="cursor-pointer flex gap-2 mt-[300px]"><Settings /> Settings</li>
        <li className="cursor-pointer flex gap-2 mt-2"><LogOut /> Logout</li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;