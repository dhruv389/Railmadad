import React  , {useState} from "react";
import { Link } from "react-router-dom";
import DetailCard from "../components/DetailCard";
import CompletedStaff from "./CompletedStaff";

import PendingStaff from "./PendingStaff";
import { HiOutlineLogout } from "react-icons/hi";
import { LuHome } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { HiBell } from "react-icons/hi";




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


      const [activeTab2, setActiveTab2] = useState(options[0]);
  
  const [activeTab, setActiveTab] = useState('Pending');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
     
      <aside className="w-1/6 bg-gray-100 flex  flex-col justify-between items-center h-full p-4">
       <div className="flex h-[80%] w-full gap-6 flex-col">
        <div className="h-[20%] flex flex-col justify-center items-center bg-white rounded-3xl t gap-1">
        <div className=" flex justify-center gap-4 items-center w-full  ">
            <img src="https://qph.cf2.quoracdn.net/main-qimg-d3a37d54d57b63a39d3a29f8cc3ab80f" alt=""  className="rounded-full w-[30%] h-[80%] object-contain "/>
            <p className="font-bold">Rail Madad</p>
        </div>
        <div className="border rounded-full  p-1 mb-1">  <p className="font-bold ">Staff Dashboard</p> </div>
        </div>

        <div className="flex bg-white rounded-3xl h-[70%] flex-col  pl-3 pt-14 gap-3 justify-start items-start">
            <div className="flex gap-3 items-center justify-center"> <LuHome/>  <p>Home</p> </div>
            <div className="flex gap-3 items-center justify-center"><BiCategoryAlt/>  <p>Anlalytics</p> </div>
            <div className="flex gap-3 items-center justify-center"><CiSettings/>  <p>Setting</p> </div>
            <div className="flex gap-3 items-center justify-center"> <HiBell/> <p>Notifications</p> </div>
        </div>
       </div>
       <div className="flex justify-around w-full px-2 h-[5rem] bg-white rounded-3xl items-center">
  <img src="https://m.media-amazon.com/images/M/MV5BYzI1MTM4Y2MtZmMzNC00MWY1LTk3MWEtOGU2NGEwY2QwYjJjXkEyXkFqcGc@._V1_.jpg" alt="" className="w-[20%] h-[60%] rounded-full mr-4" />
  <div className="flex flex-col w-[70%] gap-1 text-sm">
   
    <p>Dhaval  Rathod</p>
    <p className="text-gray-300">Staff</p>
  </div>
  <div ><HiOutlineLogout size={"25px"}/></div>
       </div>

      </aside>

      {/* Main Content */}
  


      <div className="flex-grow w-[80vw]   bg-gray-50 p-6">
    <div className="flex justify-between items-center">
    {
  activeTab === 'Pending'? <h1 className="text-2xl font-bold">Pending Comlpaints List</h1>  : <h1 className="text-2xl font-bold">Completed Comlpaints List</h1>

    }
      

   
  <div className="flex space-x-2 bg-white shadow-md rounded-full p-1">
    <div
      className={`px-4 py-2 rounded-full cursor-pointer ${activeTab === 'Pending' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
      onClick={() => setActiveTab('Pending')}
    >
      Pending <span className="ml-1 bg-gray-200 text-gray-600 text-xs rounded-full px-2 py-1">202</span>
    </div>
    <div
      className={`px-4 py-2 rounded-full cursor-pointer ${activeTab === 'Completed' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
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
            className={`px-4 py-2 bg-white rounded-full text-sm cursor-pointer whitespace-nowrap ${
              activeTab2 === option ? 'bg-blue-100 text-blue-600' : 'text-gray-700'
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
