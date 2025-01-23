import React, { useState , useContext } from "react";
import mobile from "../images/mobile.png";
import otp from "../images/otp.png";
import axios from 'axios';
import {AuthContext } from '../Context/userContext'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Stepper = () => {
    const navigate = useNavigate();
    const {saveSuperAdminToken} = useContext(AuthContext);

    const [otp2, setOtp] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
       sendOtp();
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  

  const sendOtp = async () => {
  
    try {
      const response = await fetch('http://localhost:5000/api/sendotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      const data = await response.json();
      console.log(data);
    } catch (err) {
     console.error('Failed to send OTP:', err);
    } 
  };


  const ValidateOtp = async () => {
     
    try {
      const response = await axios.post('http://localhost:5000/api/validateotp', {
        otp: otp2, // sending OTP value in the body
      });

      // Handle success response
      saveSuperAdminToken(response.data.token);
      console.log(response.data);
    Toast.fire({
        icon: "success",
        title: "Welcome SuperAdmin ‼️‼️",
      });
    navigate('/superadmin', { replace: true });

    } catch (err) {
        Toast.fire({
            icon: "error",
            title: "Please enter correct OTP",
          });
        console.error('Failed to send OTP:', err); // Handle error if request fails
    } 
  };



  return (
    <div className="flex flex-col items-center justify-start pt-[5rem] min-h-screen bg-gray-100">
      {/* Stepper */}
      <div className="w-full max-w-xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              1
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Step 1</p>
              <p className={`text-xs ${currentStep === 1 ? "text-blue-500" : "text-gray-500"}`}>
               Instruction
              </p>
            </div>
          </div>
          <div className={`flex-grow ${currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"} h-1  mx-2`}></div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
              2
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">Step 2</p>
              <p className={`text-xs ${currentStep === 2 ? "text-blue-500" : "text-gray-500"}`}>
               Otp Verification
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-white h-[50vh] p-5 rounded-lg shadow-md w-full max-w-xl">
        {currentStep === 1 && (
          <div className="flex flex-col  justify-around h-full w-full ">
            <h2 className="text-xl font-bold ">Supper Admin Authentication</h2>
          
          <div className="w-full flex justify-around items-start">
            <img src={mobile} className="h-[6rem] w-[6rem]" alt="" />
            <div className=" w-[50%]">
            <p className="mb-4 text-lg font-semibold text-yellow-400">Instructions :</p>
            <ul className="list-disc gap-2  text-sm font-medium text-gray-700">
                <li>
                Check your Verified SuperAdmin email for a message from us with the OTP.
                </li>
                <li>
                Enter the OTP in the next field.
                </li>
                <li>Tap "Verify" to proceed.</li>
            </ul>
            

            </div>
          </div>
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Tap to Get Otp
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex flex-col  justify-around h-full w-full">
            <h2 className="text-xl font-bold ">OTP verification</h2>
            <p className="mb-1">Check your Verified SuperAdmin email.</p>

            <div className="flex flex-col gap-3 items-center justify-start">
         <img src={otp} alt="" className="h-[5rem] w-[5rem]" />

         <input type="password" required name="" id="" placeholder="Enter Otp"  value={otp2}
        onChange={(e)=>setOtp(e.target.value)} className="h-[3rem] border-2 px-3 border-black rounded-2xl"  />
            </div>
            <div className="w-full flex justify-around items-center  ">
            <button
              onClick={handleBack}
              className="w-[30%] bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 "
            >
              Back
            </button>
            <button
              onClick={ValidateOtp}
              className="w-[30%] bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Confirm
            </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Stepper;
