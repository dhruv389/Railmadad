import React  , {useState,useContext, useEffect} from "react";

import CompletedStaff from "./CompletedStaff";
import { AuthContext } from "../Context/userContext";
import PendingStaff from "./PendingStaff";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";




const StaffDashboard = () => {

  const options = [
    'Engineering Department',
    'Electrical Department',
    'Traffic Department',
    'Medical Department',
    'Security Department',
    'Sanitation Department',
    'Food Department',
];
const {staffData, logoutStaff }=useContext(AuthContext);
const navigate = new useNavigate();
  useEffect(()=>{
   if(!staffData)  navigate("/stafflogin")
  },[staffData])

      const [activeTab2, setActiveTab2] = useState(options[0]);
  
  const [activeTab, setActiveTab] = useState('Pending');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
     
      <aside className="w-64 border-2 border-gray-200 shadow-xl bg-white rounded-r-[2rem] flex items-center  flex-col justify-between h-[89vh] mt-[1rem] p-5 ">
            {/* Logo & Admin Section */}
            
            <div className="flex flex-col mt-[2rem] items-center gap-3">
             
              <h2 className="text-lg font-bold text-black">Rail Madad</h2>
              <span className="text-sm font-semibold bg-black text-white px-3 py-1 rounded-full">
              📌  Staff Dashboard
              </span>
              <h2 className="text-sm font-semibold bg-black text-white px-3 py-1 rounded-full">
  🗺️  {staffData.data.station}

              </h2>
            </div>
      
            {/* Navigation Menu */}
            <div className=" h-[60%] pr-3 ">
            <img src="https://t3.ftcdn.net/jpg/03/09/43/52/360_F_309435268_05EROz79YXY7pIQWAXYTtSKlrUXPHKI7.jpg" className="h-full object-cover rounded-[1rem] ml-5" alt="" />
            </div>
      
            {/* User Profile */}
            <button onClick={()=>logoutStaff()} className="flex items-center bg-black text-white p-3 rounded-xl shadow-md hover:bg-yellow-300">
              <img
                src="https://m.media-amazon.com/images/M/MV5BYzI1MTM4Y2MtZmMzNC00MWY1LTk3MWEtOGU2NGEwY2QwYjJjXkEyXkFqcGc@._V1_.jpg"
                alt="Dhaval Rathod"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="text-sm font-medium">Dhaval Rathod</p>
                <p className="text-xs text-gray-500">Staff</p>
              </div>
              <HiOutlineLogout size={22} className="ml-auto text-gray-600 cursor-pointer hover:text-red-500" />
            </button>
          </aside>

      {/* Main Content */}
  


      <div className="flex-grow w-[80vw]   bg-gray-50 p-6">
    <div className="flex justify-between items-center">
    {
  activeTab === 'Pending'? <h1 className="text-2xl font-semibold">Pending Comlpaints List</h1>  : <h1 className="text-2xl font-bold">Completed Comlpaints List</h1>

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

      <h1 className="mt-10 ml-8 font-bold text-lg">Cetegories :</h1>
      <div className="flex flex-wrap space-x-2 gap-2  rounded-full p-2">
    
      {options.map((option) => (
          <div
            key={option}
            className={`px-4 py-2 shadow-sm bg-white rounded-full text-sm cursor-pointer whitespace-nowrap ${
              activeTab2 === option ? 'bg-gray-900 text-black' : 'text-gray-700'
            }`}
            onClick={() => setActiveTab2(option)}
          >
            {option}
          </div>
        ))}
      </div>
    

    


    { activeTab === 'Pending' && <PendingStaff activeTab2={activeTab2} /> }
      { activeTab === 'Completed' && <CompletedStaff activeTab2={activeTab2} /> }

    
  </div>







      {/* Right Sidebar */}
      {/* <aside className="w-1/6 bg-gray-100 p-4">
        Add content like profile pic, notifications, etc.
      </aside> */}
    </div>
  );
};

export default StaffDashboard;
