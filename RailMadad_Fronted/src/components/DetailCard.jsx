/* eslint-disable react/prop-types */

import axios from 'axios';


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



  

  const handleDelete = async (complaintId) => {
    if (!complaintId) {
      alert('Complaint ID is required');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:5000/api/deleteComplaint', {
        data: { complaintId } // Axios sends the data in the request body for DELETE requests
      });

      if (response.status === 200) {
        alert('Complaint deleted successfully');
        // Optionally, you can clear the input field or update the UI
       
      }
    } catch (error) {
      console.error('Error deleting complaint:', error);
      alert('Error deleting complaint: ' + error.message);
    }
  };

  const handleSendtoStaff = async (complaintId) => {
    if (!complaintId) {
      alert('Complaint ID is required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/sendcomplainttostaffbyadmin', { complaintId });
  
      if (response.status === 200) {
        alert('Complaint sent to staff successfully');
        // Optionally, you can clear the input field or update the UI
      }
    } catch (error) {
      console.error('Error sending complaint to staff:', error);
      alert('Error sending complaint to staff: ' + (error.response?.data?.message || error.message));
    }
  };

  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative max-w-[70vw] w-full max-h-[85vh] sm:mx-0 text-center mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between h-full items-start">
          {/* Left side (Text Details) */}
          <div className="w-[60%]  rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800">{complaint.category}</h1>
      <p className="mt-2 px-3 py-1 inline-block text-sm font-semibold rounded-lg bg-red-100 text-red-600">{complaint.status}</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          { label: "Complaint ID", value: complaint._id },
          { label: "Type of Complaint", value: complaint.typeOfComplaint },
          { label: "Status", value: complaint.status, color: "text-green-500" },
          { label: "Category", value: complaint.category },
          { label: "Description", value: complaint.description },
          { label: "User", value: complaint.user },
          { label: "Station", value: complaint.stationName },
          { label: "Days", value: `${calculateDaysSince(complaint.createdAt)} days ago` },
        ].map((item, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm text-start font-bold text-gray-600">{item.label} :</label>
            <input
              type="text"
              value={item.value}
              readOnly
              className={`mt-1 px-3 py-2 shadow-sm  border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none cursor-not-allowed ${
                item.color || ""
              }`}
            />
          </div>
        ))}
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
          
           <div className="w-full mt-6 flex gap-3">
           <button className="flex-1 bg-red-500 text-white py-2 text-sm rounded-lg" onClick={()=>handleDelete(complaint._id)}>Delete Complaint</button>
           <button className="flex-1 bg-green-500 text-white py-2  text-sm  rounded-lg" onClick={()=>handleSendtoStaff(complaint._id)}>Send Complaint  </button>
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