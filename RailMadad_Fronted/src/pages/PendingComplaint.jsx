import React, { useState, useEffect, useCallback , useContext } from "react";
import DetailCard from "../components/DetailCard";
import { Link } from "react-router-dom";

import {AuthContext } from '../Context/userContext'

const PendingComplaint = ({activeTab2}) => {
  
  const [complaintd, setComplaintd] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
const {adminData} = useContext(AuthContext);
 

const openDialog = useCallback((complaint) => {
  setComplaintd(complaint); // Set the selected complaint
  setIsDialogOpen(true); // Open the dialog
}, []);

  const closeDialog = () => setIsDialogOpen(false);

const [loading1, setLoading1] = useState(true); // Loading state

useEffect(() => {
  const fetchComplaints = async () => {
    // Wait until adminData and adminData.station are available
    if (!adminData?.data.station) {
      setLoading1(false); // Set loading to false if adminData or station is not available
      return;
    }

    try {
      console.log(activeTab2)
      const response = await fetch(
        `http://localhost:5000/api/getadmincomplaints?a=Admin&b=${adminData.data.station}&s=Pending&c=${activeTab2}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
       console.log(data);
    
      setComplaints(data.complaints);
      console.log( data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading1(false); // Always set loading to false after fetch
    }
  };

  fetchComplaints();
}, [activeTab2]); // Dependency on adminData.station instead of adminData

if (loading1) {
  return <div>Loading...</div>; // Show a loading indicator while fetching data
}







  // Calculate days since the complaint was created
  const calculateDaysSince = (date) => {
    const createdAtDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime = currentDate - createdAtDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convert time difference from milliseconds to days
    return differenceInDays;
  };



  return (
    <table className="w-full mt-6 rounded-lg text-xs  shadow-md h-auto ">
      <thead className="rounded-3xl">
        <tr className="text-left   bg-black text-white">
          <th className="p-3 rounded-l-xl">No.</th>
          <th className="p-3 ">Complaint</th>
          <th className="p-3 ">Category</th>
          <th className="p-3 ">User</th>
          <th className="p-3 ">Date</th>
          <th className="p-3 ">Status</th>
          <th className="p-3 rounded-r-xl">Actions</th>
        </tr>
      </thead>
      <tbody>
        {complaints ? complaints.map((complaint, index) => (
          <tr
            key={complaint._id}
            className="border-b"
            onClick={() => openDialog(complaint)}
          >
            <td className="p-3">{index + 1}</td>
            <td className="p-3 flex items-center">
              <img
                src={complaint.media[0] || "default-image-url.jpg"} // Handle missing media
                alt="Media"
                className="w-14 h-14 mr-3 rounded-full"
              />
            </td>
            <td className="p-3">{complaint.category}</td>
            <td className="p-3">{complaint.user}</td>
            <td className="p-3">
              {calculateDaysSince(complaint.createdAt)} days ago
            </td>
            <td className="p-3">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  complaint.status === "Available" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {complaint.status}
              </span>
            </td>
            <td className="p-3 flex items-center justify-start gap-2">
              <Link
                to="#"
                className="px-2 py-1 mb-6 rounded-full text-white text-sm bg-red-500"
              >
                Delete
              </Link>
              <Link
                to="#"
                className="bg-purple-700 mb-6 text-sm px-2 py-1 rounded-full text-white"
              >
                Send
              </Link>
            </td>
          </tr>
        )) : <tr>
          <td colSpan="6" className="p-3 py-[6rem] text-center font-medium text-base">No complaints found in {activeTab2}</td>
        </tr>
        }
      </tbody>

      {/* Detail Card Modal */}
      {isDialogOpen && (
        <DetailCard
          isOpen={isDialogOpen}
          onClose={closeDialog}
          complaint={complaintd}
        />
      )}
    </table>
  );
};

export default PendingComplaint;
