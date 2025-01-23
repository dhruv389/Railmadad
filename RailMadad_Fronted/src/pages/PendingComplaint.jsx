import React, { useState, useEffect, useCallback } from "react";
import DetailCard from "../components/DetailCard";
import { Link } from "react-router-dom";
import { useFirebase } from "../firebase/firebase";

const PendingComplaint = () => {
  const { useruid } = useFirebase(); // Get the user ID from Firebase
  const [complaintd, setComplaintd] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/User/${useruid}`); // Replace with your API endpoint
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    if (useruid) {
      fetchComplaints();
    }
  }, [useruid]);

  // Calculate days since the complaint was created
  const calculateDaysSince = (date) => {
    const createdAtDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime = currentDate - createdAtDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convert time difference from milliseconds to days
    return differenceInDays;
  };

  const openDialog = useCallback(
    (complaint) => {
      setComplaintd(complaint);
      setIsDialogOpen(true);
    },
    [setComplaintd, setIsDialogOpen]
  );

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <table className="w-full mt-6 text-xs bg-white shadow-md h-auto rounded-lg">
      <thead>
        <tr className="text-left bg-gray-100">
          <th className="p-3">No.</th>
          <th className="p-3">Complaint</th>
          <th className="p-3">Category</th>
          <th className="p-3">User</th>
          <th className="p-3">Date</th>
          <th className="p-3">Status</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((complaint, index) => (
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
        ))}
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
