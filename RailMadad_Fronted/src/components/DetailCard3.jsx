import React, { useState } from "react";



const  DetailCard3 = ({ isOpen, onClose, title, text, icon }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative max-w-[70vw] overflow-y-scroll   w-full max-h-[85vh] sm:mx-0 text-center  mx-auto p-6 bg-white shadow-lg rounded-lg">
      
      <div className="flex justify-between h-full flex-col-reverse  items-start ">
        {/* Left side (Text Details) */}
        <div className="w-[90%]">
  <h1 className="text-2xl font-bold">Delay in Train Departure</h1>
  <p className="text-xl font-semibold text-gray-600 mt-2">Train No. <span className="text-black">67890</span></p>
  <p className="text-sm font-semibold text-red-500 mt-1">Pending</p>

  <div className="mt-6 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Complaint ID</p>
    <p className="text-sm">CMP-20240904-002</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Station Name</p>
    <p className="text-sm">Mumbai Central</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Status</p>
    <p className="text-red-500">Pending</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Category</p>
    <p className="text-sm">Punctuality and Delays</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Description</p>
    <p className="text-start text-sm">
      The train was scheduled to depart at 9:00 AM but was delayed by 3 hours without any announcement. Passengers were left waiting without information.
    </p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">PNR Number</p>
    <p className="text-sm">PNR0987654321</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Date of Incident</p>
    <p className="text-sm">2024-09-02</p>
  </div>

  <div className="mt-4 flex gap-7 justify-start items-start">
    <p className="text-sm font-bold text-gray-600">Time of Incident</p>
    <p className="text-sm">09:00 AM</p>
  </div>
</div>

        {/* Right side (Image Upload and Actions) */}
        <div className="w-[95%] flex flex-col h-full  items-center">
        <div className="flex justify-center h-full gap-6 w-full items-center">
          <div className="bg-gray-200 p-4 w-[40%]   flex justify-center flex-col items-center  rounded-lg mb-2">
          <h1>Before</h1>
            <img className="w-[90%] h-[60%] object-cover rounded-lg" src="https://via.placeholder.com/150" alt="Puffer Jacket" />
            <div className="flex mt-4 space-x-2">
              <img className="w-12 h-12 object-cover rounded-lg" src="https://via.placeholder.com/50" alt="Puffer Jacket" />
              <img className="w-12 h-12 object-cover rounded-lg" src="https://via.placeholder.com/50" alt="Puffer Jacket" />
              <img className="w-12 h-12 object-cover rounded-lg" src="https://via.placeholder.com/50" alt="Puffer Jacket" />
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-500 text-lg">+</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 p-4 w-[40%]   flex justify-center flex-col items-center  rounded-lg mb-2">
          <h1>Upload You Work Proof</h1>
            <img className="w-[90%] h-[60%] object-cover rounded-lg" src="https://via.placeholder.com/150" alt="Puffer Jacket" />
            <div className="flex mt-4 space-x-2">
              <img className="w-12 h-12 object-cover rounded-lg" src="https://via.placeholder.com/50" alt="Puffer Jacket" />
              <img className="w-12 h-12 object-cover rounded-lg" src="https://via.placeholder.com/50" alt="Puffer Jacket" />
              <img className="w-12 h-12 object-cover rounded-lg" src="https://via.placeholder.com/50" alt="Puffer Jacket" />
              <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-500 text-lg">+</span>
              </div>
            </div>
          </div>
         </div>
          <div className="flex mt-4 w-full space-x-2 flex-col">
          
           <div className="w-full mt-6 flex justify-center items-center gap-3">
           
           <button className="flex-1 bg-green-500 max-w-[40%] mb-7 text-white py-2  text-sm  rounded-lg">Submit Work To Admin  </button>
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