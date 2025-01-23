
import React, { useState, useEffect } from 'react';
import { useFirebase } from '../firebase/firebase.jsx';

const UserComplaints = () => {
    const firebase = useFirebase();
    const [useruid, setuseruid] = useState("");
    // if(firebase.user) setuseruid(firebase.user.uid);
    const [complaints, setComplaints] = useState([]);
//   console.log(firebase.user.uid);
    useEffect(() => {
      // Fetch complaints from your API
      const fetchComplaints = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/User/1UyyQ7Wb4SRbd1xIHkxl4JblCYD3`); // Replace with your API endpoint
          const data = await response.json();
          setComplaints(data);
          console.log(complaints);
        } catch (error) {
          console.error('Error fetching complaints:', error);
        }
      };
  
      fetchComplaints();
    }, []);


  return (
    <div>
      <h1>Complaints</h1>
      {complaints.length > 0 ? (
        <ul className='flex flex-col gap-4'>
          {complaints.map((complaint) => (
            <li key={complaint._id} className='w-full flex flex-col bg-yellow-200'>
              <h2>Category: {complaint.category}</h2>
              <p>Description: {complaint.description}</p>
              <p>Status: {complaint.status}</p>
              <p>Submitted by: {complaint.user}</p>
              {complaint.media && complaint.media.length > 0 && (
                <div>
                  <h3>Media:</h3>
                  {complaint.media.map((file, index) => (
                    <div key={index}>
                      <p>Type: {file.fileType}</p>
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        View {file.fileType}
                      </a>
                    </div>
                  ))}
                </div>
              )}
              <p>Created At: {new Date(complaint.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(complaint.updatedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaints found.</p>
      )}
    </div>
  )
}

export default UserComplaints