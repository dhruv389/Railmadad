/* eslint-disable react/prop-types */
import { 
  FaIdCard, 
  FaTrain, 
  FaMapMarkerAlt, 
  FaInfoCircle, 
  FaCalendarAlt, 
  FaFileAlt, 
  FaImage,
  FaTimes
} from 'react-icons/fa';

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
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header with yellow accent */}
        <div className="bg-black p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Delay in Train Departure</h1>
          <button 
            onClick={onClose}
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            <FaTimes />
          </button>
        </div>

        {/* Main content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side (Images) */}
            <div className="lg:w-2/5 space-y-6">
              {/* Status Badge */}
              <div className="bg-green-300 text-black py-2 px-4 rounded-full inline-block font-semibold mb-4">
                {complaint.status}
              </div>
              
              <div className="text-xl font-semibold mb-4">
                Department : <span className="text-white bg-black px-2 py-1 rounded">{complaint.category}</span>
              </div>
              
              {/* Image Section */}
              <div className="space-y-6">
                {/* Before Image */}
                <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
                  <h2 className="flex items-center gap-2 font-semibold mb-3 text-black">
                    <FaImage className="text-yellow-300" /> Before
                  </h2>
                  <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                    <img
                      className="w-full h-full object-cover"
                      src={complaint.media[0]}
                      alt="Before"
                    />
                  </div>
                </div>

                {/* After Image */}
                <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
                  <h2 className="flex items-center gap-2 font-semibold mb-3 text-black">
                    <FaImage className="text-yellow-300" /> After
                  </h2>
                  <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                    <img
                      className="w-full h-full object-cover"
                      src={complaint.AfterImage}
                      alt="After"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side (Details) */}
            <div className="lg:w-3/5 space-y-4">
              {/* Info fields */}
              <div className="space-y-4">
                {/* Complaint ID */}
                <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-yellow-300 transition-all duration-200">
                  <label className="flex items-center gap-2 text-sm font-bold text-black mb-1">
                    <FaIdCard className="text-yellow-300" /> Complaint ID
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-700 font-mono">
                    {complaint._id}
                  </div>
                </div>

                {/* Station Name */}
                <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-yellow-300 transition-all duration-200">
                  <label className="flex items-center gap-2 text-sm font-bold text-black mb-1">
                    <FaMapMarkerAlt className="text-yellow-300" /> Station Name
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
                    {complaint.stationName}
                  </div>
                </div>

                {/* Category */}
                <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-yellow-300 transition-all duration-200">
                  <label className="flex items-center gap-2 text-sm font-bold text-black mb-1">
                    <FaTrain className="text-yellow-300" /> Category
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
                    {complaint.category}
                  </div>
                </div>

                {/* PNR Number */}
                <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-yellow-300 transition-all duration-200">
                  <label className="flex items-center gap-2 text-sm font-bold text-black mb-1">
                    <FaIdCard className="text-yellow-300" /> PNR Number
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
                    {complaint.pnrNumber || "Not Available"}
                  </div>
                </div>

                {/* Date of Incident */}
                <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-yellow-300 transition-all duration-200">
                  <label className="flex items-center gap-2 text-sm font-bold text-black mb-1">
                    <FaCalendarAlt className="text-yellow-300" /> Date of Incident
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
                    {calculateDaysSince(complaint.createdAt)} Days ago
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-xl p-3 border border-gray-200 hover:border-yellow-300 transition-all duration-200">
                  <label className="flex items-center gap-2 text-sm font-bold text-black mb-1">
                    <FaFileAlt className="text-yellow-300" /> Description
                  </label>
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-700 min-h-24">
                    {complaint.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="bg-gray-50 p-4 flex justify-end items-center gap-4 border-t border-gray-200">
          <button 
            className="bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="bg-yellow-300 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors duration-200 font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCard3;