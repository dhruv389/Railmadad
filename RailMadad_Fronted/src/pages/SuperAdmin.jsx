import { useEffect, useState, useContext } from 'react';
import jsonData from "./Stations.json";
import { AuthContext } from '../Context/userContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Icons
import { MdAdd, MdEdit, MdDelete, MdSave } from "react-icons/md";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { FaUserCircle, FaLock, FaBuilding, FaUserTag } from "react-icons/fa";

const SuperAdmin = () => {
  const { superAdminData, logoutSuperAdmin, Toast } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch accounts data
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/getcreatedaccounts`, {
          headers: {
            Authorization: `Bearer ${superAdminData}`,
          },
        });

        setAccounts(response.data.data);
      } catch (error) {
        console.log(error.response);
        if (error.response?.status === 403) {
          logoutSuperAdmin();
        }
        Toast.fire({
          icon: 'error',
          title: error.response?.data?.message || 'Failed to fetch accounts'
        });
      } finally {
        setLoading(false);
      }
    };
  
    if (superAdminData) {
      fetchAccounts();
    } else {
      console.warn("No superAdminData available for authorization");
      setLoading(false);
    }
  }, [superAdminData, logoutSuperAdmin, Toast]);

  // Station search and suggestions
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filteredSuggestions = jsonData.data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    setSuggestions([]);
  };

  // Form and table management
  const [data, setData] = useState({
    _id: "",
    station: '',
    userType: '',
    email: '',
    password: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [newRow, setNewRow] = useState({ station: '', userType: '', email: '', password: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  // Filter data based on search term
  const filteredData = accounts ? accounts.filter(item =>
    Object.values(item).some(val =>
      typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) : [];

  // Handle edit, save, and delete actions
  const handleEdit = async (id) => {
    const item = accounts.find((item) => item._id === id);
    setData(item);
    setEditRowId(id);
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/updatecreatedAccounts/${id}`,
        {
          updateData: { updatedData },
        },
        {
          headers: {
            Authorization: `Bearer ${superAdminData}`,
          },
        }
      );
      
      Toast.fire({
        icon: 'success',
        title: response.data.message || 'Account updated successfully'
      });
      
      // Update local data
      setAccounts(accounts.map(account => 
        account._id === id ? { ...account, ...updatedData } : account
      ));
      
      setEditRowId(null);
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Error updating account'
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this account?')) return;
    
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/deleteCreatedAccounts/${id}`, {
        headers: {
          Authorization: `Bearer ${superAdminData}`,
        },
      });
      
      Toast.fire({
        icon: 'success',
        title: response.data.message || 'Account deleted successfully'
      });
      
      // Update local data
      setAccounts(accounts.filter(account => account._id !== id));
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Error deleting account'
      });
    }
  };


  const handleInputChange = (e, id, field) => {
    setData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Modal management
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewRow({ station: '', userType: '', email: '', password: '' });
    setInputValue("");
    setSelectedOption("");
  };

  const handleNewRowChange = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newRow.email || !newRow.password || !selectedOption || !inputValue) {
      Toast.fire({
        icon: 'warning',
        title: 'All fields are required'
      });
      return;
    }
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/createnewaccount`, {
        email: newRow.email,
        password: newRow.password,
        userType: selectedOption === "admin" ? "Admin" : "Staff",
        station: inputValue,
      },

      {
        headers: {
          Authorization: `Bearer ${superAdminData}`,
        }
      });
      
      // Add new account to local state
      const newAccount = {
        _id: Date.now(), // Temporary ID until refresh
        email: newRow.email,
        userType: selectedOption === "admin" ? "Admin" : "Staff",
        station: inputValue,
      };
      
      setAccounts([...accounts, newAccount]);
      
      Toast.fire({
        icon: 'success',
        title: response.data.message || 'Account created successfully'
      });
      
      closeModal();
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Error creating account'
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Management Dashboard</h1>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            onClick={logoutSuperAdmin}
          >
            <IoLogOutOutline size={20} />
            Logout
          </button>
        </div>
        
        {/* Control panel */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button 
              className="bg-black text-white font-medium px-6 py-3 rounded-lg transition-all flex items-center gap-2 w-full md:w-auto justify-center shadow-md hover:shadow-lg"
              onClick={openModal}
            >
              <MdAdd size={22} />
              Add New Account
            </button>
            
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoSearch className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search accounts..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="py-4 px-6 text-left">Station</th>
                    <th className="py-4 px-6 text-left">User Type</th>
                    <th className="py-4 px-6 text-left">Email</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} transition-colors`}>
                        <td className="py-4 px-6 border-b border-gray-100">
                          {editRowId === item._id ? (
                            <input 
                              type="text" 
                              value={data.station} 
                              onChange={(e) => handleInputChange(e, item._id, 'station')} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <FaBuilding className="text-blue-500" />
                              {item.station}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-100">
                          {editRowId === item._id ? (
                            <select
                              value={data.userType}
                              onChange={(e) => handleInputChange(e, item._id, 'userType')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Staff">Staff</option>
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.userType === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                              {item.userType}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-100">
                          {editRowId === item._id ? (
                            <input 
                              type="email" 
                              value={data.email} 
                              onChange={(e) => handleInputChange(e, item._id, 'email')} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <div className="flex items-center gap-2">
                              <FaUserCircle className="text-gray-500" />
                              {item.email}
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-100">
                          <div className="flex justify-center gap-2">
                            {editRowId === item._id ? (
                              <button 
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-1"
                                onClick={() => handleSave(item._id, data)}
                              >
                                <MdSave size={18} />
                                Save
                              </button>
                            ) : (
                              <button 
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-1"
                                onClick={() => handleEdit(item._id)}
                              >
                                <MdEdit size={18} />
                                Edit
                              </button>
                            )}
                            <button 
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-1"
                              onClick={() => handleDelete(item._id)}
                            >
                              <MdDelete size={18} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        {accounts.length === 0 ? 'No accounts found' : 'No matching accounts found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl  w-[45rem] transform transition-all animate-fade-in-up">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Add New Account</h2>
            </div>
            
            <form className="p-6">
              <div className="space-y-6">
                {/* Station Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Station Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBuilding className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange2}
                      placeholder="Search stations..."
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-[90%] bg-white max-h-60 rounded-md shadow-lg overflow-auto border border-gray-200">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="cursor-pointer px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                        >
                          <FaBuilding className="text-blue-500" />
                          {suggestion.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                {/* User Type Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserTag className="text-gray-400" />
                    </div>
                    <select
                      value={selectedOption}
                      onChange={handleOptionChange}
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select User Type</option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserCircle className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="user@example.com"
                      value={newRow.email}
                      onChange={handleNewRowChange}
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      autoComplete="off"
                    />
                  </div>
                </div>
                
                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={newRow.password}
                      onChange={handleNewRowChange}
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-5 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  onClick={handleSubmit}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;