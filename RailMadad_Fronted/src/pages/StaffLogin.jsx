import  {  useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUsersGear } from "react-icons/fa6";
import {AuthContext } from '../Context/userContext'
import staff from "../Images/staffi.jpeg"

const StaffLogin = () => {
  const {loginStaff,Toast} = useContext(AuthContext);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formRef = useRef(null);
  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
      event.preventDefault();
    
      // Collect form data
     
    
      try {
        // Post data to the backend
        const response = await axios.post('http://localhost:5000/api/getstaff', {
          email,
          password,
        });
    
        // Handle the response
        console.log('Login successful:', response.data);
        loginStaff(response.data);
        // Navigate to a dashboard or perform further actions

        Toast.fire({
          icon: "success",
          title:  "Welcome to the Staffdashboard.",
        });
        navigate('/staffdashboard', { replace: true });

        }
        catch (error) {
  if (error.response) {
    // The request was made, and the server responded with a status code
    console.error('Login failed:', error.response.data);
    Toast.fire({
      icon: "error",
      title:  error.response.data.message|| "Login failed, please try again.",
    });
   
  } else if (error.request) {
    // The request was made, but no response was received
    console.error('No response received:', error.request);

    Toast.fire({
      icon: "error",
      title:  error.request|| "No response from the server, please try again.",
    });
  } else {
    // Something happened in setting up the request
    console.error('Error:', error.message);

    Toast.fire({
      icon: "error",
      title:  "An error occurred, please try again.",
    });
  }
    };}


return (
  <div className="flex justify-center custom:pb-20 custom:pt-10 custom:h-auto flex-col items-center h-screen bg-gray-200">
   <div className="font-semibold mb-3 px-4 py-2 relative top-8 bg-black rounded-xl text-white text-[1.4rem] flex justify-center items-center"><FaUsersGear className='mr-4'/> Staff Login</div>

            


            <div className="w-[75%] custom:py-5 custom:gap-6 h-[80%] custom:w-[95%] custom:flex-col rounded-tl-[35px] rounded-br-[35px] px-10 bg-white flex justify-between items-center">
                <div className=" w-[40%] custom:max-h-[10rem] custom:w-full flex justify-between items-center  h-full rounded-tl-[35px] rounded-br-[35px]">
 <img src={staff} alt="" className='h-[94%] w-full object-cover rounded-tl-[35px] custom:max-h-[10rem] rounded-br-[35px]' />
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
                    <button type="submit" className="w-full bg-black py-3 rounded-lg text-white shadow-xl hover:bg-yellow-300">Login</button>
                </form>
                </div>
            </div>

        </div>
)
}
export default StaffLogin