import React, { createContext, useState, useEffect } from 'react';

import Swal from "sweetalert2";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState(() => {
    try {
      const savedData = localStorage.getItem('adminData');
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error("Error parsing adminData from localStorage:", error);
      localStorage.removeItem('adminData'); // Clear corrupted data
      return null;
    }
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getcomplaintsdata'); // Replace with your API endpoint
        const result = await response.json();
     
       setChartData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

    const [staffData, setStaffData] = useState(() => {
        try {
          const savedData = localStorage.getItem('staffData');
          return savedData ? JSON.parse(savedData) : null;
        } catch (error) {
          console.error("Error parsing staffData from localStorage:", error);
          localStorage.removeItem('staffData'); // Clear corrupted data
          return null;
        }
      });

      const [superAdminData, setSuperAdminData] = useState(() => {
        try {
          const savedData = localStorage.getItem('superAdminData');
          return savedData ? JSON.parse(savedData) : null;
        } catch (error) {
          console.error("Error parsing superAdminData from localStorage:", error);
          localStorage.removeItem('superAdminData'); // Clear corrupted data
          return null;
        }
      });


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

  const loginAdmin = (data) => {
    try {
      localStorage.setItem('adminData', JSON.stringify(data));
      setAdminData(data);
    } catch (error) {
      console.error("Error saving adminData to localStorage:", error);
    }
  };

  const loginStaff = (data) => {
    try {
      localStorage.setItem('staffData', JSON.stringify(data));
      setStaffData(data);
      Toast.fire({
        icon: "success",
        title: "login successfully as Staff",
      });
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error,
      });
      console.error("Error saving staffData to localStorage:", error);
    }
  };
  
  const saveSuperAdminToken = (data) => {

    try {
      localStorage.setItem('superAdminData', JSON.stringify(data));
      setSuperAdminData(data);
    } catch (error) {
      console.error("Error saving superAdminData to localStorage:", error);
    }
  }

  const logoutAdmin = () => {
    setAdminData(null);
    localStorage.removeItem('adminData');
    Toast.fire({
      icon: "success",
      title: "logout successfully",
    });
  };

  const logoutStaff = () => {
    setStaffData(null);
    localStorage.removeItem('staffData');
  };

  const logoutSuperAdmin = () => {
    setSuperAdminData(null);
    localStorage.removeItem('superAdminData');
    Toast.fire({
      icon: "success",
      title: "logout successfully from superadmin",
    });
  };

   

  useEffect(() => {
    // Optional: Log changes for debugging
    console.log("adminData updated:", adminData);
  }, [adminData]);

  useEffect(() => {
    // Optional: Log changes for debugging
    console.log("staffData updated:", staffData);
  }, [staffData]);

  return (
    <AuthContext.Provider value={{chartData,loginStaff,Toast, loginAdmin, adminData, staffData, logoutAdmin, logoutStaff , superAdminData, saveSuperAdminToken , logoutSuperAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};