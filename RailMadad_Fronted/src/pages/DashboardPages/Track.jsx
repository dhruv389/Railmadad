import { useState, useEffect } from 'react';
import { useFirebase } from '../../firebase/firebase';
import Tooltip from '../../components/Tooltip';
import { API_BASE_URL } from '../../config';


const Track = () => {
  const { useruid } = useFirebase();  // Get the user ID from Firebase

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints from your API using the useruid
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/User/${useruid}`); // Replace with your API endpoint

        const data = await response.json();
        setComplaints(Array.isArray(data) ? data : (Array.isArray(data?.complaints) ? data.complaints : []));
        console.log(data); // Updated to log the fetched data
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    if (useruid) {  // Ensure useruid is available before fetching data
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

  return (
    <table className="w-full overflow-y-scroll text-xs bg-white shadow-md h-auto rounded-lg">
      <thead>
        <tr className="text-left rounded-t-lg    bg-yellow-200">
          <th className="p-3 rounded-tl-lg">No.</th>
          <th className="p-3">Complaint</th>
          <th className="p-3">Category</th>
          
          <th className="p-3">Date</th>
          <th className="p-3">Status</th>
          <th className="rounded-tr-lg">Description</th>
        </tr>
      </thead>
      <tbody>
        {(Array.isArray(complaints) ? complaints : []).map((complaint, index) => (
          <tr key={complaint._id} className="border-b ">
            <td className="p-3">{index + 1}</td>
            <td className="p-3 flex items-center">
              <img
                src={Array.isArray(complaint.media) && complaint.media[0] ? complaint.media[0] : 'default-image-url.jpg'} // Handle missing media
                alt="Media"
                className="w-14 h-14 mr-3 rounded-full"
              />
              {complaint.complaint}
            </td>
            <td className="p-3">{complaint.category}</td>
            <td className="p-3">{calculateDaysSince(complaint.createdAt)} days ago</td>
            <td className="p-3 font-semibold text-green-600">{complaint.status}</td>
            <td className="p-3 flex items-center gap-2 max-w-[15rem]">
              <p className="truncate overflow-hidden text-ellipsis whitespace-nowrap">{complaint.description}</p>
              <Tooltip text={complaint.description} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Track;
