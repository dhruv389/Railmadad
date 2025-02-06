/* eslint-disable react/prop-types */
import { FaIdCard, FaTrain, FaMapMarkerAlt, FaInfoCircle, FaCalendarAlt, FaFileAlt, FaImage } from 'react-icons/fa';

const DetailCard3 = ({ isOpen, onClose, complaint }) => {
  if (!isOpen) return null;

  const calculateDaysSince = (date) => {
    const createdAtDate = new Date(date);
    const currentDate = new Date();
    const differenceInTime = currentDate - createdAtDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative max-w-[70vw] overflow-y-scroll w-full max-h-[85vh] sm:mx-0 text-center mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between h-full flex-col-reverse items-start">
          {/* Left side (Text Details) */}
          <div className="w-[90%]">
            <h1 className="text-2xl font-bold">Delay in Train Departure</h1>
            <p className="text-xl font-semibold text-gray-600 mt-2">
              Train No. <span className="text-black">{complaint.category}</span>
            </p>
            <p className="text-sm font-semibold text-red-500 mt-1">{complaint.status}</p>

            {/* Complaint ID */}
            <div className="mt-6 flex gap-4 items-center">
              <FaIdCard className="text-gray-600" />
              <label className="text-sm font-bold text-gray-600">Complaint ID</label>
              <input
                type="text"
                value={complaint._id}
                disabled
                className="text-sm border-none bg-gray-100 p-2 rounded-lg w-full"
              />
            </div>

            {/* Station Name */}
            <div className="mt-4 flex gap-4 items-center">
              <FaMapMarkerAlt className="text-gray-600" />
              <label className="text-sm font-bold text-gray-600">Station Name</label>
              <input
                type="text"
                value={complaint.stationName}
                disabled
                className="text-sm border-none bg-gray-100 p-2 rounded-lg w-full"
              />
            </div>

            {/* Status */}
            <div className="mt-4 flex gap-4 items-center">
              <FaInfoCircle className="text-gray-600" />
              <label className="text-sm font-bold text-gray-600">Status</label>
              <input
                type="text"
                value={complaint.status}
                disabled
                className="text-sm border-none bg-gray-100 p-2 rounded-lg w-full text-red-500"
              />
            </div>

            {/* Category */}
            <div className="mt-4 flex gap-4 items-center">
              <FaTrain className="text-gray-600" />
              <label className="text-sm font-bold text-gray-600">Category</label>
              <input
                type="text"
                value={complaint.category}
                disabled
                className="text-sm border-none bg-gray-100 p-2 rounded-lg w-full"
              />
            </div>

            {/* Description */}
            <div className="mt-4 flex gap-4 items-center">
              <FaFileAlt className="text-gray-600" />
              <label className="text-sm font-bold text-gray-600">Description</label>
              <textarea
                value={complaint.description}
                disabled
                className="text-sm border-none bg-gray-100 p-2 rounded-lg w-full resize-none"
              />
            </div>

            {/* PNR Number */}
            <div className="mt-4 flex gap-4 items-center">
              <FaIdCard className="text-gray-600" />
              <label className="text-sm font-bold text-gray-600">PNR Number</label>
              <input
                type="text"
                value={complaint.pnrNumber || "null"}
                disabled
                className="text-sm border-none bg-gray-100 p-2 rounded-lg w-full"
              />
            </div>

            {/* Date of Incident */}
            <div className="mt-4 flex gap-4 items-center">
              <FaCalendarAlt className="text-gray-600" />
              <label className="text-sm font-bold text-gray-600">Date of Incident</label>
              <input
                type="text"
                value={`${calculateDaysSince(complaint.createdAt)} Days ago`}
                disabled
                className="text-sm border-none bg-gray-100 p-2 rounded-lg w-full"
              />
            </div>
          </div>

          {/* Right side (Image Upload and Actions) */}
          <div className="w-[95%] flex flex-col h-full items-center">
            <div className="flex justify-center h-full gap-6 w-full items-center">
              {/* Before Image */}
              <div className="bg-gray-200 p-4 w-[40%] h-[50%] flex justify-center flex-col items-center rounded-lg mb-2">
                <h1 className="flex items-center gap-2">
                  <FaImage className="text-gray-600" /> Before
                </h1>
                <img
                  className="w-[90%] h-full object-contain rounded-lg"
                  src={complaint.media[0]}
                  alt="Before"
                />
              </div>

              {/* After Image */}
              <div className="bg-gray-200 p-4 w-[40%] h-[50%] flex justify-center flex-col items-center rounded-lg mb-2">
                <h1 className="flex items-center gap-2">
                  <FaImage className="text-gray-600" /> After
                </h1>
                <img
                  className="w-[90%] h-full object-contain rounded-lg"
                  src={complaint.AfterImage}
                  alt="After"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex mt-4 w-full space-x-2 flex-col">
              <div className="w-full mt-6 flex justify-center items-center gap-3">
                <button className="flex-1 bg-green-500 max-w-[40%] mb-7 text-white py-2 text-sm rounded-lg">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default DetailCard3;