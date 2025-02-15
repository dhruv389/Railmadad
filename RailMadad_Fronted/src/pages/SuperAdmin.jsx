// Import React and necessary hooks
import  { useEffect, useState ,useContext} from 'react';
import jsonData from "./Stations.json";
import {AuthContext } from '../Context/userContext'
import axios from 'axios';

import { MdAdd } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";

// Sample data for the table


const SuperAdmin = () => {
  

   const {superAdminData , logoutSuperAdmin , Toast} = useContext(AuthContext);

// -------------------   Get Accounts--------------------------------------------
  const[accounts,setAccounts] = useState([]);

  useEffect(() => {
    
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/getcreatedaccounts", {
          headers: {
            Authorization: `Bearer ${superAdminData}`, // Ensure superAdminData is valid
          },
        });
        // Log the full data for debugging
        setAccounts(response.data.data); // Assuming response.data contains the accounts
      } catch (error) {
        console.log(error.response);
        if(error.response.status === 403) {
          logoutSuperAdmin();
        }
        console.log('Failed to fetch accounts:', error.response.data.message); // Log error message
      }
    };
  
    if (superAdminData) {
      fetchAccounts(); // Only fetch accounts if superAdminData exists
    } else {
    
      console.warn("No superAdminData available for authorization");
    }
  },[superAdminData,logoutSuperAdmin,]);


  




    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
  
    const handleInputChange2 = (e) => {
      const value = e.target.value;
      setInputValue(value);
  
      if (value) {
        const filteredSuggestions = jsonData.data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filteredSuggestions);
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
      setInputValue(suggestion.name.toLowerCase());
      setSuggestions([]);
    };




   

    const [data, setData] = useState({
        _id:"",
        station: '',
        userType: '',
        email: '',
        password: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [editRowId, setEditRowId] = useState(null);
    const [newRow, setNewRow] = useState({ station: '', userType: '', email: '', password: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);


var filteredData=[{ _id:"",
    station: '',
    userType: '',
    email: '',
    password: ''}];
  if(accounts)
  { 
    console.log("accounts",accounts);
    
    filteredData = accounts.filter(item =>
        Object.values(item).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
}

    const handleEdit = async (id) => {
        


        const item = await accounts.find((item) => item._id === id);
        setData(item);
        setEditRowId(id);
    };

    const handleSave = async(id, updatedData) => {
     

         console.log(updatedData);

        try {
            
            const response = await axios.put(
              `http://localhost:5000/api/updatecreatedAccounts/${id}`,
              {
                updateData: { updatedData }, // Send the updated data in the request body
              },
              {
                headers: {
                  Authorization: `Bearer ${superAdminData}`, // Add the Authorization token in the header
                },
              }
            );
      
            // Handle success response
            console.log(response.data.message); // "Complaint updated successfully"
            alert("Complaint updated successfully");

            setEditRowId(null);
          } catch (error) {
            // Handle error response
            console.error(
              "Error update Account:",
              error.response?.data?.message || error.message
            );
            alert(
              "Error update Account: " +
                (error.response?.data?.message || error.message)
            );
          }
    };

    const handleDelete = async (id) => {
           console.log("----------",id);
        try {
          // Make a DELETE request to the backend
          const response = await axios.delete(`http://localhost:5000/api/deleteCreatedAccounts/${id}`, {
            headers: {
              Authorization: `Bearer ${superAdminData}`,
              
            },
          });
          // Handle success response
          console.log(response.data.message); // "Complaint deleted successfully"
          alert("Complaint deleted successfully");
        } catch (error) {
          // Handle error response
          console.error(
            "Error deleting Account:",
            error.response?.data?.message || error.message
          );
          alert(
            "Error deleting Account: " +
              (error.response?.data?.message || error.message)
          );
        }
    };

    const handleInputChange = (e, id, field) => {
        // setData(data.map(item =>
        //     item.id === id ? { ...item, [field]: e.target.value } : item
        // ));



        // const { name, value } = e.target; // Get the input's name and value
        setData((prevData) => ({
            ...prevData, // Copy the previous state
            [field]: e.target.value, // Update only the field that changed
        }));
    };


    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };



    


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewRow({ station: '', userType: '', email: '', password: '' }); // Clear form
    };

    const handleNewRowChange = (e) => {
        setNewRow({ ...newRow, [e.target.name]: e.target.value });
    };

    // const handleAddRow = () => {
    //   if (newRow.station && newRow.userType && newRow.email && newRow.password) {
    //     setData([...data, { id: Date.now(), ...newRow }]); // Use timestamp for unique ID
    //     setNewRow({ station: '', userType: '', email: '', password: '' }); // Clear form
    //   } else {
    //       alert("Please fill all the input fields");
    //   }
    // };


    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [userType, setUserType] = useState('');
    // const [station, setStation] = useState('');
    
   

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic input validation
        if (!newRow.email || !newRow.password || !selectedOption || !inputValue) {
          window.alert('All fields are required');
          return;
        }
    
        try {
          const response = await axios.post('http://localhost:5000/api/createnewaccount', {
            email: newRow.email,
            password:newRow.password,
            userType:selectedOption=== "admin" ? "Admin" : "Staff",
            station:inputValue,
          },
          {
            headers: {
              Authorization: `Bearer ${superAdminData}`, // Add the Authorization token in the header
            }
           },
        );
    
          console.log(response.data.message);
          setInputValue("");
        
            setSelectedOption("");
            setNewRow({ station: '', userType: '', email: '', password: '' }); // Clear form fields after successful submission
            Toast.fire({  // Use Toast instead of alert
              icon: 'success',
              title: response.data.message,

            });

         // Clear form fields after successful submission
        } catch (error) {
        //   if (error.response && error.response.data) {
        //     window.alert(error.response.data.message);
        //   } else {
        //     window.alert('An error occurred. Please try again later.');
        //   }

       window.alert(error);
        }
      };










    return (
        <div className="p-4 w-screen flex min-h-screen justify-start items-center flex-col gap-4">
        <div className="w-full flex justify-between px-[4rem] items-center">
        <button className="bg-green-500 flex  justify-center items-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={openModal}>
            <MdAdd fontSize={"25px"} fontWeight={"600"}/>    Add New
            </button>

            <button className='bg-red-500 flex  gap-4 justify-center items-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4' onClick={()=>logoutSuperAdmin()}>
            <IoLogOutOutline fontSize={"25px"} fontWeight={"600"}/>
            Logout</button>
        </div>
      
            <input
                type="text"
                placeholder="Search..."
                className=" w-[50%] px-3 py-2 mb-4  border-2 border-black rounded-2xl"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className=" w-[70%] text-sm rounded-md border border-collapse border-gray-300 shadow-md">
                <thead>
                    <tr className="bg-black text-white rounded-md">
                        <th className="py-2 px-4 border">Station</th>
                        <th className="py-2 px-4 border">User Type</th>
                        <th className="py-2 px-4 border">Email</th>
                       
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData && filteredData.map(item => (
                        <tr key={item._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">
                                {editRowId === item._id ? (
                                    <input type="text" value={data.station} onChange={(e) => handleInputChange(e, item.id, 'station')} className="border rounded p-1 w-full" />
                                ) : (item.station)}
                            </td>
                            <td className="py-2 px-4 border">
                                {editRowId === item._id ? (
                                    <input type="text" value={data.userType} onChange={(e) => handleInputChange(e, item._id, 'userType')} className="border rounded p-1 w-full" />
                                ) : (item.userType)}
                            </td>
                            <td className="py-2 px-4 border">
                                {editRowId === item._id ? (
                                    <input type="email" value={data.email} onChange={(e) => handleInputChange(e, item._id, 'email')} className="border rounded p-1 w-full" />
                                ) : (item.email)}
                            </td>
                          
                            <td className="py-2 px-4 border font-light flex space-x-3">
                                {editRowId === item._id ? (
                                    <button className="bg-green-500 hover:bg-green-700 text-white  py-2 px-3 rounded" onClick={() => handleSave(item._id, data)}>Save</button>
                                ) : (
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-3 rounded" onClick={() => handleEdit(item._id)}>Edit</button>
                                )}
                                <button className="bg-red-500 hover:bg-red-700 text-white  py-2 px-3 rounded" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>




            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> {/* Modal Overlay */}
                    <form className="bg-white p-8 rounded flex flex-col gap-6 shadow-lg w-1/2"> {/* Modal Content */}
                        <h2 className="text-lg font-bold mb-4">Add New Row</h2>

                      




                        <div className="w-full  mt-6 text-sm  font-semibold flex justify-start flex-col gap-1">
            <p>Station Name:</p>
           
           

          <div className="relative w-full  mx-auto ">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange2}
        placeholder="Search station..."
        className="w-full p-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute max-h-[40vh]  font-normal text-black overflow-scroll z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 text-black cursor-pointer hover:bg-blue-500 "
            >
              {suggestion.name} 
            </li>
          ))}
        </ul>
      )}
    </div>





          </div>







          <div className="relative inline-block text-left">
      <div>
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" // Tailwind classes
        >
          <option value="">Select User Type</option> {/* Default option */}
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>
      {selectedOption && (
          <p className="mt-2 text-gray-700">Selected: {selectedOption}</p>
      )}
    </div>







                       
                        <input type="email" name="email" placeholder="Email"  value={newRow.email} onChange={handleNewRowChange} className="border rounded-md px-4 py-2 p-1 mb-2 w-full"  autoComplete="off" />
                        <input type="password" name="password"   placeholder="Password" value={newRow.password} onChange={handleNewRowChange} className="border px-4 py-2 rounded-md p-1 mb-4 w-full" autoComplete="off" />
                        <div className="flex justify-end font-light">
                            <button className="bg-gray-600 px-3 hover:bg-gray-900 text-white py-2  rounded mr-2" onClick={closeModal}>Cancel</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={handleSubmit}>Add Row</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
  );
};

export default SuperAdmin;
