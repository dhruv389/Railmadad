import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/userContext";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; // Added for animations

// Importing icons from react-icons instead of lucide
import { IoShieldCheckmark } from "react-icons/io5";
import { MdEmail, MdLock, MdArrowForward, MdArrowBack } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const Stepper = () => {
  const navigate = useNavigate();
  const { saveSuperAdminToken } = useContext(AuthContext);

  const [otp, setOtp] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); // Added email field
  const [countdown, setCountdown] = useState(0); // Added countdown for OTP resend

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

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Added email to request body
      });
      console.log(response.status);

      if (response.status === 400) {
        navigate("/superadmin", { replace: true })
      return  (Toast.fire({
          icon: "error",
          title: " Email Is Not Registered",
        }));
      }

      const data = await response.json();
      setCountdown(60); // Set 60 seconds countdown for OTP resend
      Toast.fire({
        icon: "success",
        title: "OTP sent successfully",
      });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Failed to send OTP",
      });
      console.error("Failed to send OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/validateotp`, {
        otp,
        email, // Added email to validation request
      });


      saveSuperAdminToken(response.data.token);
      Toast.fire({
        icon: "success",
        title: "Welcome SuperAdmin ‼️",
      });
      navigate("/superadmin", { replace: true });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Please enter correct OTP",
      });
      console.error("Failed to validate OTP:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className=" w-[35rem] p-8">
        {/* Logo and title */}
        <div className="flex flex-col items-center mb-8">
          <IoShieldCheckmark className="w-16 h-16 text-yellow-400 mb-4" />
          <h1 className="text-2xl font-bold text-black">SuperAdmin Authentication</h1>
          <div className="h-1 w-24 bg-yellow-400 mt-2 rounded-full"></div>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: currentStep >= 1 ? 1 : 0.8 }}
                className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
                  currentStep >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </motion.div>
              <div className="ml-2">
                <p className="text-sm font-medium">Verification</p>
                <p className={`text-xs ${currentStep === 1 ? "text-yellow-400" : "text-gray-500"}`}>
                  Step 1
                </p>
              </div>
            </div>
            
            <div className="relative flex-grow mx-4 h-1 bg-gray-200">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: currentStep >= 2 ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 h-full bg-black"
              ></motion.div>
            </div>
            
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: currentStep >= 2 ? 1 : 0.8 }}
                className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
                  currentStep >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </motion.div>
              <div className="ml-2">
                <p className="text-sm font-medium">OTP</p>
                <p className={`text-xs ${currentStep === 2 ? "text-yellow-400" : "text-gray-500"}`}>
                  Step 2
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl p-8 border border-gray-100"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black">Email Verification</h2>
              
              <div className="flex items-center justify-center py-6">
                <MdEmail className="w-20 h-20 text-yellow-400" />
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Please enter your SuperAdmin email address to receive a verification code.
                </p>
                
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all pl-12"
                    placeholder="Enter your email"
                  />
                  <MdEmail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={!email || loading}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-yellow-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <MdArrowForward className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-black">OTP Verification</h2>
              
              <div className="flex items-center justify-center py-6">
                <MdLock className="w-20 h-20 text-yellow-400" />
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 text-center">
                  Please enter the verification code sent to <br />
                  <span className="font-semibold text-black">{email}</span>
                </p>
                
                <div className="flex justify-center">
                  <div className="relative">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="px-4 py-3 text-center text-xl tracking-widest border-2 border-gray-200 rounded-lg w-full max-w-xs focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      placeholder="Enter OTP"
                      maxLength={6}
                    />
                  </div>
                </div>
                
                <p className="text-center text-sm text-gray-500">
                  {countdown > 0 ? (
                    `Resend OTP in ${countdown}s`
                  ) : (
                    <button 
                      onClick={sendOtp} 
                      className="text-yellow-400 hover:text-black transition-colors"
                      disabled={loading}
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleBack}
                    className="w-1/2 bg-gray-100 text-black py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-200 transition-all duration-300"
                  >
                    <MdArrowBack className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                  
                  <button
                    onClick={validateOtp}
                    disabled={!otp || loading}
                    className="w-1/2 bg-black text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-yellow-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span>Verifying...</span>
                    ) : (
                      <>
                        <span>Verify</span>
                        <FaCheckCircle className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Stepper;