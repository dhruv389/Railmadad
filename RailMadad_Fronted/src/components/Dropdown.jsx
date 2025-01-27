import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownHoverButton"
        onMouseEnter={() => setIsOpen(true)}
     
        className="text-white bg-yellow-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center  "
        type="button"
      >
       Options
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownHover"
          className="absolute z-10 mt-2 right-[1ex]  divide-y divide-gray-100 rounded-lg shadow w-44 bg-black"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
          <li>
              <Link to="/" className="block px-4 py-2 hover:bg-yellow-400  dark:hover:text-white">
                Home
              </Link>
            </li>
           
            <li>
              <Link to="admindashboard" className="block px-4 py-2 hover:bg-yellow-400  dark:hover:text-white">
               Admin Dashboard
              </Link>
            </li>
            <li>
              <Link to="staffdashboard" className="block px-4 py-2 hover:bg-yellow-400  dark:hover:text-white">
               Staff Dashboard
              </Link>
            </li>

            <li>
              <Link to="superadmin" className="block px-4 py-2 hover:bg-yellow-400  dark:hover:text-white">
               Superadmin Dashboard
              </Link>
              
            </li>
           
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;