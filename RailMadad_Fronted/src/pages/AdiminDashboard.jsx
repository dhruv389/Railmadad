import React  , {useState} from "react";
import { Link } from "react-router-dom";
import DetailCard from "../components/DetailCard";
import CompletedComplaint from "./CompletedComplaint";
import PendingComplaint from "./PendingComplaint";
import { HiOutlineLogout } from "react-icons/hi";
import { LuHome } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { HiBell } from "react-icons/hi";


const NavItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-900 hover:text-white rounded-lg transition cursor-pointer">
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const AdminDashboard = () => {

     const options = [
      'Engineering Department',
      'Electrical Department',
      'Traffic Department',
      'Medical Department',
      'Security Department',
      'Sanitation Department',
      'Food Department',
    ];


      const [activeTab2, setActiveTab2] = useState(options[0]);
  
  const [activeTab, setActiveTab] = useState('Pending');

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
     
      <aside className="w-64 shadow-xl bg-white rounded-r-[2rem] flex  flex-col justify-between h-[76vh] mt-[4rem] p-5 ">
      {/* Logo & Admin Section */}
      <div className="flex flex-col mt-[2rem] items-center gap-3">
       
        <h2 className="text-lg font-bold text-black">Rail Madad</h2>
        <span className="text-sm font-semibold bg-black text-white px-3 py-1 rounded-full">
          Admin Dashboard
        </span>
      </div>

      {/* Navigation Menu */}
      <div className=" h-[60%] ">
      <img src="https://thumbs.dreamstime.com/b/d-illustration-happy-smiling-businessman-suit-laptop-sitting-armchair-showing-ok-gesture-cartoon-bearded-man-202447055.jpg" className="h-full object-cover" alt="" />
      </div>

      {/* User Profile */}
      <div className="flex items-center bg-white p-3 rounded-xl shadow-md">
        <img
          src="https://m.media-amazon.com/images/M/MV5BYzI1MTM4Y2MtZmMzNC00MWY1LTk3MWEtOGU2NGEwY2QwYjJjXkEyXkFqcGc@._V1_.jpg"
          alt="Dhaval Rathod"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-3">
          <p className="text-sm font-medium">Dhaval Rathod</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
        <HiOutlineLogout size={22} className="ml-auto text-gray-600 cursor-pointer hover:text-red-500" />
      </div>
    </aside>

      {/* Main Content */}
  


      <div className="flex-grow w-[80vw]   bg-gray-50 p-6">
    <div className="flex justify-between items-center">
    {
  activeTab === 'Pending'? <h1 className="text-2xl font-mormal">Pending Comlpaints List</h1>  : <h1 className="text-2xl font-bold">Completed Comlpaints List</h1>

    }
      

   
  <div className="flex space-x-2 bg-white shadow-md rounded-full p-1">
    <div
      className={`px-4 py-2 rounded-full cursor-pointer ${activeTab === 'Pending' ? 'bg-black text-white' : 'text-gray-700'}`}
      onClick={() => setActiveTab('Pending')}
    >
      Pending <span className="ml-1 bg-gray-200 text-gray-600 text-xs rounded-full px-2 py-1">202</span>
    </div>
    <div
      className={`px-4 py-2 rounded-full cursor-pointer ${activeTab === 'Completed' ? 'bg-black text-white' : 'text-gray-700'}`}
      onClick={() => setActiveTab('Completed')}
    >
     Completed
    </div>
   
  </div>










      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 rounded p-2"
      />
    </div>

      <h1 className="mt-10 ml-8 font-mormal text-lg">Cetegories :</h1>
      <div className="flex flex-wrap space-x-2 gap-2  rounded-full p-2">
    
        {options.map((option) => (
          <div
            key={option}
            className={`px-4 py-2 shadow-sm bg-white rounded-full text-sm cursor-pointer whitespace-nowrap ${
              activeTab2 === option ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
            }`}
            onClick={() => setActiveTab2(option)}
          >
            {option}
          </div>
        ))}
      </div>
    

    


    { activeTab === 'Pending' && <PendingComplaint activeTab2={activeTab2} /> }
      { activeTab === 'Completed' && <CompletedComplaint activeTab2={activeTab2}/> }

    
  </div>







      {/* Right Sidebar */}
      {/* <aside className="w-1/6 bg-gray-100 p-4">
        Add content like profile pic, notifications, etc.
      </aside> */}
    </div>
  );
};

export default AdminDashboard;
