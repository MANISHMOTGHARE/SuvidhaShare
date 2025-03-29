import { Search, FileQuestion, User, LogOut, Settings, Truck, ClipboardList, Gift, ScrollText, LayoutDashboard, Store, MapPinHouse, MessageCircleMore } from 'lucide-react';
import Logo from '../assets/suvidhasharelogo.png';

export default function AllFoodLists() {
    const [foodData, setFoodData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/user/allfoodlists');
                setFoodData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error.message}</div>; 
    }

    const foodItems = foodData.map((item, index) => (
        <div className="bg-green-900 text-white p-6 rounded-lg flex items-center gap-4"
            key={index} >
            <Truck />
            <div>
                <h3 className="text-2xl">{item.name}</h3>
                <p className="text-lg">{item.restaurant}</p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
            </div>
        </div>
    ));


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-green-900 text-white p-4" style={{position: 'static', top: 0}}>
        <h1 className="text-xl font-bold mb-6 flex items-center gap-2">
        <img src={Logo} alt="User Profile" className="mt-4 w-58 h-25 bg-white" />
        </h1>
        <ul className="space-y-4">
          <li className="flex cursor-pointer gap-4"> <LayoutDashboard /> Dashboard</li>
          <li className="flex cursor-pointer gap-4"> <User /> User Profile</li>
          <li className="flex cursor-pointer gap-4"> <Truck /> Food Track</li>
          <li className="flex cursor-pointer gap-4"><Store /> Restaurant</li>
          <li className="flex cursor-pointer gap-4"> <MapPinHouse /> Pick up</li>
          <li className="flex cursor-pointer gap-4"><MessageCircleMore /> Comments</li>
          <li className="flex cursor-pointer gap-4"><FileQuestion /> Help & Center</li>
          <li className="cursor-pointer flex gap-2 mt-[300px]"><Settings /> Settings</li>
          <li className="cursor-pointer flex gap-2 mt-2"><LogOut /> Logout</li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-5xl font-bold text-green-900">All Food Lists</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search" className="pl-8 pr-4 py-1 border rounded-md" />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" size={16} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6"> {foodItems} </div>

       </div>


      <div className="w-1/5 bg-green-900 text-white p-4 flex flex-col items-center">
        <User size={48} className="mb-4" />
        <p className="text-lg font-bold">Sanju@gmail.com</p>
        <div className="flex flex-col items-left mt-4 space-y-2">
          <div className="flex gap-4"><Gift size={20} /> Total Donations</div>
          <div className="flex gap-4"><Truck size={20} /> Total Deliver</div>
          <div className="flex gap-4"><ClipboardList size={20} /> Pending Order</div>
          <div className ="flex gap-4"> <ScrollText size={20}/> All Food Lists </div>
        </div>
        <img src="/placeholder-image.png" alt="User Profile" className="mt-4 w-24 h-24 rounded-full border-2 border-white" />
      </div>
    </div>
  );
}