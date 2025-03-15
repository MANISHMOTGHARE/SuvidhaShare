import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, User, LogOut, Settings, Truck, ClipboardList, Gift } from 'lucide-react';

const data = [
  { name: '04 Mar 2025', order: 10, deliver: 20, pending: 5 },
  { name: '05 Mar 2025', order: 30, deliver: 25, pending: 10 },
  { name: '06 Mar 2025', order: 50, deliver: 40, pending: 15 },
  { name: '07 Mar 2025', order: 70, deliver: 60, pending: 20 },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-900 text-white p-4">
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Gift size={24} /> SUVIDHA SHARE
        </h1>
        <ul className="space-y-4">
          <li className="cursor-pointer">Dashboard</li>
          <li className="cursor-pointer">User Profile</li>
          <li className="cursor-pointer">Food Track</li>
          <li className="cursor-pointer">Restaurant</li>
          <li className="cursor-pointer">Pick up</li>
          <li className="cursor-pointer">Comments</li>
          <li className="cursor-pointer">Help & Center</li>
          <li className="cursor-pointer flex items-center gap-2 mt-4"><Settings size={16} /> Settings</li>
          <li className="cursor-pointer flex items-center gap-2 mt-2"><LogOut size={16} /> Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search" className="pl-8 pr-4 py-1 border rounded-md" />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" size={16} />
            </div>
            <User size={24} />
            <span>Sanju@gmail.com</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {[{ title: 'Total Donations', icon: Gift }, { title: 'Total Deliver', icon: Truck }, { title: 'Total Pending', icon: ClipboardList }].map((item, index) => (
            <div key={index} className="bg-green-700 text-white p-6 rounded-lg flex items-center gap-4">
              <item.icon size={24} />
              <div>
                <h3 className="text-lg">{item.title}</h3>
                <p className="text-3xl font-bold">{index === 2 ? 9 : 89}</p>
                <p>Today: 36 Yesterday: 43</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white p-6 mt-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Record</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="order" stroke="#8884d8" />
              <Line type="monotone" dataKey="deliver" stroke="#82ca9d" />
              <Line type="monotone" dataKey="pending" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/5 bg-green-900 text-white p-4 flex flex-col items-center">
        <User size={48} className="mb-4" />
        <p className="text-lg font-bold">Sanju@gmail.com</p>
        <div className="flex flex-col items-center mt-4 space-y-2">
          <div className="flex items-center gap-2"><Gift size={20} /> Total Donations</div>
          <div className="flex items-center gap-2"><Truck size={20} /> Total Deliver</div>
          <div className="flex items-center gap-2"><ClipboardList size={20} /> Pending Order</div>
        </div>
        <img src="/placeholder-image.png" alt="User Profile" className="mt-4 w-24 h-24 rounded-full border-2 border-white" />
      </div>
    </div>
  );
}
