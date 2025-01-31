import React, { useState } from "react";
import axios from 'axios';
import { Cloudinary } from "cloudinary-core";

const  DetailCard2 = ({ isOpen, onClose,complaint }) => {

  const [image, setImage] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    setImage(files[0]);
    const uploadedUrls = [];


     const cloudinaryCore = new Cloudinary({
          cloud_name: "dyugrhvaq",
          api_key: "464611998742645",
        });
    
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "Dhavalfirst_image-folder");
    
          try {
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${
                cloudinaryCore.config().cloud_name
              }/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
            const data = await response.json();
            uploadedUrls.push(data.secure_url); // Get the URL of the uploaded file
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
        setMediaUrl(uploadedUrls[0]);

  }






  const handleSendtoAdminByStaff = async (complaintId) => {
    if (!complaintId) {
      alert('Complaint ID is required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/send_complaint_to_admin_bystaff',{ complaintId,AfterImage:mediaUrl });
  
      if (response.status === 200) {
        alert('Complaint sent to staff successfully');
        // Optionally, you can clear the input field or update the UI
      }
    } catch (error) {
      console.error('Error sending complaint to staff:', error);
      alert('Error sending complaint to staff: ' + (error.response?.data?.message || error.message));
    }
  };







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
  <p className="text-xl font-semibold text-gray-600 mt-2">Train No. <span className="text-black">{complaint.category}</span></p>
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
          <div className="bg-gray-200 p-4 w-[40%]   flex justify-center flex-col items-center  rounded-lg mb-2">
          <h1>Before</h1>
            <img className="w-[90%] h-[60%] object-cover rounded-lg" src={complaint.media[0]} alt="Puffer Jacket" />
            
          </div>

          <div className="bg-gray-200 p-4 w-[40%]   flex justify-center flex-col items-center  rounded-lg mb-2">
          <h1>Upload You Work Proof</h1>


          { image ? <img src={URL.createObjectURL(image)} alt="" className="w-[40%] mt-5 rounded-xl h-[15rem]" /> :
   (<div className="flex items-center justify-start w-full mt-6 flex-col"> <h1 className="w-full py-3 text-sm font-semibold">
            Choose File From Device
          </h1>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-100 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileUpload}
            />
          </label>
         
        </div>)
   }
          </div>
         </div>
          <div className="flex mt-4 w-full space-x-2 flex-col">
          
           <div className="w-full mt-6 flex justify-center items-center gap-3">
           
           <button className="flex-1 bg-green-500 max-w-[40%] mb-7 text-white py-2  text-sm  rounded-lg"  onClick={()=>{handleSendtoAdminByStaff(complaint._id)}}>Submit Work To Admin </button>
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
  export default DetailCard2;