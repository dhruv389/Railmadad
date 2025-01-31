import React from "react";
import CustomizedDialogs from "./DialogBox";
import { FaHome, FaUserShield, FaChartLine } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-100 py-6">
      <div className="mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Copyright Section */}
        <div className="text-sm text-center md:text-left">
          <p>© 2019 RAILMADAD. All Rights Reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4 mt-3 md:mt-0">
          <a href="#" className="flex items-center gap-1 hover:text-blue-400 transition">
            <FaHome /> Home
          </a>
          {/* <a href="#" className="hover:text-blue-400 transition">FAQs</a> */}
          <CustomizedDialogs />
          <a href="#" className="flex items-center gap-1 hover:text-blue-400 transition">
            <FaUserShield /> Railway Admin Login
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-blue-400 transition">
            <FaChartLine /> MIS Report Login
          </a>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="border-t border-gray-700 mt-4"></div>
    </footer>
  );
};

export default Footer;
