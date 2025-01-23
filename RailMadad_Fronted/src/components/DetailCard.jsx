import React from "react";

const DetailCard = ({ isOpen, onClose, complaint }) => {
  if (!isOpen) return null;
console.log(complaint);
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
      <div className="relative max-w-[70vw] w-full max-h-[85vh] sm:mx-0 text-center mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between h-full items-start">
          {/* Left side (Text Details) */}
          <div className="w-[60%] ">
            <h1 className="text-2xl font-bold">{complaint.category}</h1>
           
            <p className="text-sm font-semibold text-green-500 mt-1">{complaint.status}</p>

            <div className="mt-6 flex gap-7 justify-start items-start">
              <p className="text-sm font-bold text-gray-600">Complaint ID</p>
              <p className="text-sm">{complaint._id}</p>
            </div>

            <div className="mt-4 flex gap-7 justify-start items-start">
              <p className="text-sm font-bold text-gray-600">Type of Compalint</p>
              <p className="text-sm">{complaint.typeOfComplaint}</p>
            </div>

            <div className="mt-4 flex gap-7 justify-start items-start">
              <p className="text-sm font-bold text-gray-600">Status</p>
              <p className="text-green-500">{complaint.status}</p>
            </div>

            <div className="mt-4 flex gap-7 justify-start items-start">
              <p className="text-sm font-bold text-gray-600">Category</p>
              <p className="text-sm">{complaint.category}</p>
            </div>

            <div className="mt-4 flex gap-7 justify-start items-start">
              <p className="text-sm font-bold text-gray-600">Description</p>
              <p className="text-start text-sm">{complaint.description}</p>
            </div>

          

            <div className="mt-4 flex gap-7 justify-start items-start">
              <p className="text-sm font-bold text-gray-600">User</p>
              <p className="text-sm">{complaint.user}</p>
            </div>

            <div className="mt-4 flex gap-7 justify-start items-start">
              <p className="text-sm font-bold text-gray-600">Station</p>
              <p className="text-sm">{complaint.stationName}</p>
            </div>

            

            <div className="mt-4 flex gap-7 justify-start items-start">
              <p className="text-sm font-bold text-gray-600">Days</p>
              <p className="text-sm">{calculateDaysSince(complaint.createdAt)} days ago</p>
            </div>

           
          </div>

          {/* Right side (Image Upload and Actions) */}
          <div className="w-[40%] flex flex-col h-full items-center">
            <div className="bg-gray-200 p-4 w-full flex justify-center flex-col items-center rounded-lg mb-2">
              <img className="w-[90%] h-[60%] object-cover min-h-[20rem] max-h-[21rem] rounded-lg" src={complaint.media[0]} alt="Product" />
              <div className="flex mt-4 space-x-2">
                {complaint.media.map((img, index) => (
                  <img key={index} className="w-12 h-12 object-cover rounded-lg" src={img} alt="Product Thumbnail" />
                ))}
                
              </div>
            </div>


          <div className="flex mt-4 w-full space-x-2 flex-col">
           <input type="text" name="" id="" className="rounded-2xl px-7 py-2 hover:border-blue-300 hover:border-2 bg-gray-200" placeholder="Add comment" />
           <div className="w-full mt-6 flex gap-3">
           <button className="flex-1 bg-red-500 text-white py-2 text-sm rounded-lg">Delete Complaint</button>
           <button className="flex-1 bg-green-500 text-white py-2  text-sm  rounded-lg">Send Complaint  </button>
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
  export default DetailCard;