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
        <div
          className="w-[9rem] custom:hidden rounded-[2rem] text-sm justify-center items-center  bg-white py-10 px-10 flex flex-col gap-7"
          // style={{ boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >

<button
            className="h-[3.5rem] flex-col text-center font-medium flex justify-start pl-4 items-center "
            onClick={() =>
              handleTabClick("enquiry")
            }
          >
            <FaBuildingUser className="text-[25px]" />
            <p>Complaint</p>
          </button>

          {/* <button
            className="h-[3.5rem] flex-col text-center font-medium flex justify-start pl-4 items-center "
            onClick={() =>
              handleTabClick("train")
            }
          >
            <FaTrainSubway className="text-[25px]" />
            <p>Train Complaint</p>
          </button>

          <button
            className="h-[3.5rem] flex-col text-center font-medium flex justify-start pl-4 items-center "
            onClick={() =>
              handleTabClick("station")
            }
          >
         
            <HiMiniBuildingLibrary className="text-[25px]" />
            <p>Station</p>
          </button>


          <button
            className="h-[3.5rem] flex-col text-center font-medium flex justify-start pl-4 items-center "
            onClick={() =>
              handleTabClick("apprecian")
            }
          >
         
         <RiFileList3Fill className="text-[25px]" />
         <p>Apprecian</p>
          </button> */}

          

          

          <button
            className="h-auto flex-col text-center font-medium flex justify-start pl-4 items-center "
            onClick={() =>
              handleTabClick("track")
            }
          >
            <HiOutlineClipboardDocumentList  className="text-[25px]" size={"25px"} />
            <p>Track Your concern</p>
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
