import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import {AuthContext } from '../Context/userContext'
import Loader from '../components/Loader';
import { GrUserAdmin } from "react-icons/gr";
import admin from  "../Images/admini.jpeg"


const AdminLogin = () => {
 const {loginAdmin,Toast} = useContext(AuthContext);
  const [Loading , setLoading]= useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        // Collect form data
         setLoading(true);
      
        try {
          // Post data to the backend
          const response = await axios.post('http://localhost:5000/api/getadmin', {
            email,
            password,
          });
      
          // Handle the response
          console.log('Login successful:', response.data);
          loginAdmin(response.data);
          // Navigate to a dashboard or perform further actions
          setLoading(false);
          navigate('/admindashboard', { replace: true });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully as Admin",
          });

          }
          catch (error) {
            setLoading(false);
            Toast.fire({
              icon: "error",
              title: "please add correct email and password",
            });
    if (error.response) {
      // The request was made, and the server responded with a status code
      setLoading(false);
      console.error('Login failed:', error.response.data);
      alert(error.response.data.message || 'Login failed, please try again.');
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      alert('No response from the server, please try again.');
    } else {
      // Something happened in setting up the request
      setLoading(false);
      console.error('Error:', error.message);
      alert('An error occurred, please try again.');
    }
      };}

      if(Loading) return <Loader/>

  return (
    <div className="flex justify-center custom:pb-20 custom:pt-10 custom:h-auto flex-col items-center h-screen bg-gray-200">
   <div className="font-semibold mb-3 px-4 py-2 relative top-8 bg-black rounded-xl text-white text-[1.4rem] flex justify-center items-center"><GrUserAdmin className='mr-4'/> Admin Login</div>
  
              
  
  
              <div className="w-[75%] custom:py-5 custom:gap-6 h-[80%] custom:w-[95%] custom:flex-col rounded-tl-[35px] rounded-br-[35px] px-10 bg-white flex justify-between items-center">
                  <div className=" w-[40%] custom:max-h-[10rem] custom:w-full flex justify-between items-center  h-full rounded-tl-[35px] rounded-br-[35px]">
   <img src={admin} alt="" className='h-[94%] w-full object-cover rounded-tl-[35px] custom:max-h-[10rem] rounded-br-[35px]' />
                  </div> 
                  <div className="w-[55%] custom:w-full  flex justify-center items-center flex-col h-[95%]">
                  <form ref={formRef} onSubmit={handleSubmit} className='w-[97%]'>
                      <div className="mb-5  ">
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
                      </div>
                      <div className="mb-5">
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
                      </div>
                      <button type="submit" className="w-full bg-yellow-400 py-3 rounded-lg text-white shadow-xl hover:bg-black">Login</button>
                  </form>
                  </div>
              </div>
  
          </div>
  )
}

export default AdminLogin