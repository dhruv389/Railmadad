import React, { useState } from "react";



const  DetailCard3 = ({ isOpen, onClose,complaint }) => {
    if (!isOpen) return null;
    const calculateDaysSince = (date) => {
      const createdAtDate = new Date(date);
      const currentDate = new Date();
      const differenceInTime = currentDate - createdAtDate;
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convert time difference from milliseconds to days
      return differenceInDays;
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative max-w-[70vw] overflow-y-scroll   w-full max-h-[85vh] sm:mx-0 text-center  mx-auto p-6 bg-white shadow-lg rounded-lg">
      
      <div className="flex justify-between h-full flex-col-reverse  items-start ">
        {/* Left side (Text Details) */}
        <div className="w-[90%]">
  <h1 className="text-2xl font-bold">Delay in Train Departure</h1>
  <p className="text-xl font-semibold text-gray-600 mt-2">Train No. <span className="text-black">{complaint.category
  }</span></p>
  <p className="text-sm font-semibold text-red-500 mt-1">{complaint.status}</p>

  <div className="mt-6 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Complaint ID</p>
    <p className="text-sm">{complaint._id}</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Station Name</p>
    <p className="text-sm">{complaint.stationName}</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Status</p>
    <p className="text-red-500">{complaint.status}</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Category</p>
    <p className="text-sm">{complaint.category}</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Description</p>
    <p className="text-start text-sm">
    {complaint.description}
    </p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">PNR Number</p>
    <p className="text-sm">{complaint.pnrNumber?complaint.pnrNumber:"null"}</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Date of Incident</p>
    <p className="text-sm">{calculateDaysSince(complaint.createdAt)} Days ago</p>
  </div>

  
</div>

        {/* Right side (Image Upload and Actions) */}
        <div className="w-[95%] flex flex-col h-full  items-center">
        <div className="flex justify-center h-full gap-6 w-full items-center">
          <div className="bg-gray-200 p-4 w-[40%] h-[50%]  flex justify-center flex-col items-center  rounded-lg mb-2">
          <h1>Before</h1>
            <img className="w-[90%] h-full object-cover rounded-lg" src={complaint.media[0]} alt="Puffer Jacket" />
            
          </div>

          <div className="bg-gray-200 p-4 w-[40%] h-[50%]   flex justify-center flex-col items-center  rounded-lg mb-2">
          <h1>After</h1>
            <img className="w-[90%] h-full object-cover rounded-lg" src={complaint.AfterImage} alt="Puffer Jacket" />
            
          </div>
         </div>
          <div className="flex mt-4 w-full space-x-2 flex-col">
          
           <div className="w-full mt-6 flex justify-center items-center gap-3">
           
           <button className="flex-1 bg-green-500 max-w-[40%] mb-7 text-white py-2  text-sm  rounded-lg">Done  </button>
           </div>
         
          </div>
        </div>
      </div>
    

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            OK
          </button>
        </div>





     
      </div>
    );
  };
  export default DetailCard3;