/* eslint-disable react/prop-types */

import DetailCard3 from "../components/DetailCard3";
import { Link } from "react-router-dom";
import { useState ,useEffect,useContext,useCallback} from 'react';
import {AuthContext} from '../Context/userContext';
import Loader from "../components/Loader";

const PendingComplaint = ({activeTab2}) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
const [complaints, setComplaints] = useState([]);
  const {staffData} = useContext(AuthContext);
  const [complaintd, setComplaintd] = useState(null);
  
    
    const openDialog = useCallback((complaint) => {
      setComplaintd(complaint); // Set the selected complaint
      setIsDialogOpen(true); // Open the dialog
    }, []);
    const closeDialog = () => setIsDialogOpen(false);




    const [loading1, setLoading1] = useState(true); // Loading state
    
    useEffect(() => {
      const fetchComplaints = async () => {
        // Wait until staffData and adminData.station are available
        if (!staffData?.data.station) {
          setLoading1(false); // Set loading to false if staffData or station is not available
          return;
        }
    
        try {
          console.log(activeTab2)
          const response = await fetch(
            `http://localhost:5000/api/getadmincomplaints?a=Admin&b=${staffData.data.station}&s=Resolved&c=${activeTab2}`
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
    }, [activeTab2]); // Dependency on staffData.station instead of staffData
    
    if (loading1) {
      return <Loader/>; // Show a loading indicator while fetching data
    }




    const calculateDaysSince = (date) => {
      const createdAtDate = new Date(date);
      const currentDate = new Date();
      const differenceInTime = currentDate - createdAtDate;
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convert time difference from milliseconds to days
      return differenceInDays;
    };
  


  return (
    <table className="w-full mt-6 text-xs bg-white shadow-md rounded-lg">
     <DetailCard3
        isOpen={isDialogOpen}
        onClose={closeDialog}
        complaint={complaintd}
      />
   <thead>
         <tr className="text-left bg-gray-100">
           <th className="p-3">No.</th>
           <th className="p-3">Complaint</th>
           <th className="p-3">Category</th>
           <th className="p-3">User</th>
           <th className="p-3">Date</th>
           {/* <th className="p-3">Pending</th> */}
           <th className="p-3">Status</th>
           {/* <th className="p-3">Price</th> */}
           <th className="p-3">Actions</th>
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
                        "bg-green-500" 
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="p-3 flex items-center justify-start gap-2">
                     
                      <Link
                        to="#"
                        className="bg-purple-700 mb-6 text-sm px-2 py-1 rounded-full text-white"
                      >
                        Done
                      </Link>
                    </td>
                  </tr>
                )):  <tr>
          <td colSpan="6" className="p-3 py-[6rem] text-center font-medium text-base">No complaints found in {activeTab2}</td>
        </tr>}
   
   
   
   
   
   
   
   
         
       </tbody>
  </table>
  )
}

export default PendingComplaint