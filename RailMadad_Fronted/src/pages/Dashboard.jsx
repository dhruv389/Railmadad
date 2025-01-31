import React from "react";
import { FaTrainSubway } from "react-icons/fa6";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { RiFileList3Fill } from "react-icons/ri";
import { FaBuildingUser } from "react-icons/fa6";
import Train from "./DashboardPages/Train";
import Station from "./DashboardPages/Station";
import Apprecian from "./DashboardPages/Apprecian";
import Enquiry from "./DashboardPages/Enquiry";
import Track from "./DashboardPages/Track";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";



// import imports from '../../utils/homeImage.ts'
import { Route, Routes, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="w-screen bg-[#f6f8f9]  min-h-screen flex  justify-center items-center" style={{ backgroundImage: `url(#)` ,backgroundRepeat:"no-repeat", objectFit:"cover" ,backgroundSize:"100%" }}>
    
      <div className="w-screen  gap-6 min-h-screen  flex justify-center items-center   ">
      <div className="w-[8rem]      rounded-3xl p-6 flex flex-col gap-8 items-center transition-all duration-300 hover:shadow-xl">
      {/* Complaint Button */}
      <button
        className="flex flex-col items-center text-gray-800 font-semibold gap-2 hover:scale-110 transition duration-300"
        onClick={() => handleTabClick("enquiry")}
      >
        <div className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300">
          <FaBuildingUser className="text-2xl" />
        </div>
        <p className="text-sm tracking-wide">Complaint</p>
      </button>

      {/* Track Concern Button */}
      <button
        className="flex flex-col items-center text-gray-800 font-semibold gap-2 hover:scale-110 transition duration-300"
        onClick={() => handleTabClick("track")}
      >
        <div className="bg-green-500 text-white p-3 rounded-full shadow-md hover:bg-green-600 transition duration-300">
          <HiOutlineClipboardDocumentList className="text-2xl" />
        </div>
        <p className="text-sm tracking-wide text-center">Track Concern</p>
      </button>
    </div>

        <div
          className="w-[65%] custom:w-[97%] bg-white rounded-3xl  h-[85vh]"
          style={{ boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <Routes>
            <Route path="/train" element={<Train/>} />
            <Route path="/station" element={<Station/>} />
            <Route path="/apprician" element={<Apprecian/>} />
            <Route path="/enquiry" element={<Enquiry/>} />
            <Route path="/track" element={<Track/>}/>
       
           
            {/* <Route path="/" element={<h1>hhd</h1>} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
