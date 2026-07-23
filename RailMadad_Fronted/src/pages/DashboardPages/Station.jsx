import { useState, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { BsTrainFront, BsBuilding } from "react-icons/bs";
import { MdOutlineUploadFile, MdDescription } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";

import jsonData from "../Stations.json";
import { useFirebase } from '../../firebase/firebase.jsx';
import { Cloudinary } from "cloudinary-core";
import Swal from 'sweetalert2';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Loader from "../../components/Loader.jsx";
import Loader2 from "../../components/Loader2.jsx";
import { API_BASE_URL, GEMINI_API_KEY } from '../../config';

function Station() {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [category, setCategory] = useState("");
  const [trainClass, setTrainClass] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrls, setMediaUrls] = useState([]);
  const [typeOfComplaint, setTypeOfComplaint] = useState("Train");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [image, setImage] = useState(null);
  const firebase = useFirebase();

  // Convert image to base64 for AI processing
  const convertImageToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setImage(files[0]);
    
    try {
      setLoading2(true);
      
      // Initialize Google Generative AI
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      // Analyze image with AI
      const result = await model.generateContent([
        "Identify the most relevant category for the image from: Engineering, Electrical, Traffic, Medical, Security, Sanitation, or Food Department. Respond with the category name or 'false' if no match.",
        {
          inlineData: {
            data: await convertImageToBase64(files[0]),
            mimeType: 'image/jpeg',
          },
        },
      ]);

      const isValid = result.response.text().trim();
      setCategory(isValid === "false" ? "No Match" : isValid);
      
      if (isValid === "false") {
        setImage(null);
        Swal.fire({
          icon: "error",
          title: "Invalid Image",
          text: "Please choose a clear and relevant image related to your train or station issue.🖼️",
          confirmButtonColor: "#3085d6",
        });
      } else {
        // Upload to Cloudinary
        const cloudinaryCore = new Cloudinary({
          cloud_name: "dyugrhvaq",
          api_key: "464611998742645",
        });

        const uploadedUrls = [];
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "Dhavalfirst_image-folder");

          try {
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudinaryCore.config().cloud_name}/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
            const data = await response.json();
            uploadedUrls.push(data.secure_url);
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }

        setMediaUrls(uploadedUrls);
      }
    } catch (error) {
      console.error('Error analyzing image:', error.message);
      setCategory("Error");
      Swal.fire({
        icon: "error",
        title: "Processing Error",
        text: "There was an error analyzing your image. Please try again.",
        confirmButtonColor: "#3085d6",
      });
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    if (firebase.user) {
      console.log(firebase.useruid);
    }
  }, [firebase.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Initialize Google Generative AI for complaint validation
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
        Validate the following complaint description: '${description}'. Focus on understanding the issue rather than spelling errors. Check if it relates to trains, stations, railways, personal issues, health, harassment, cleanliness, or damages. Respond with 'true' if valid; if invalid, reply with a helpful explanation of why the complaint is not valid.
      `;

      // Send the prompt to the Gemini API
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();

      const isValid = text === "true";
      
      if (isValid) {
        if (!firebase.useruid) setLoading(true);
        
        const complaintData = {
          userId: firebase.useruid,
          category: category + " Department",
          description,
          media: mediaUrls,
          typeOfComplaint,
          stationName: inputValue.toLowerCase(),
          pnrNumber: trainNo,
          TrainClass: trainClass,
        };

        try {
          const response = await fetch(`${API_BASE_URL}/api/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(complaintData),
          });

          const result = await response.json();
          console.log("Complaint submitted successfully:", result);
          
          Swal.fire({
            icon: "success",
            title: "Thank You!",
            text: "Your complaint has been submitted successfully!",
            confirmButtonColor: "#3085d6",
          });
          
          // Reset form
          setInputValue("");
          setTrainNo("");
          setTrainClass("");
          setDescription("");
          setImage(null);
          setMediaUrls([]);
          setCategory("");
          
        } catch (error) {
          console.error("Error submitting complaint:", error);
          Swal.fire({
            icon: "error",
            title: "Submission Error",
            text: "There was an error submitting your complaint. Please try again.",
            confirmButtonColor: "#3085d6",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Complaint",
          text: text,
          confirmButtonColor: "#3085d6",
        });
        setDescription("");
      }
    } catch (error) {
      console.error("Error validating complaint:", error);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "There was an error validating your complaint. Please try again.",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  if (loading) return <Loader />;

  const handleInputChange = (e) => {
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

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 py-6 px-8 text-white">
          <h1 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <BsStars className="text-yellow-300" size={28} />
            Railway Complaint Portal
          </h1>
          <p className="text-center text-blue-100 mt-1">We value your feedback to improve our services</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8">
          {/* Complaint Type Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-3">Type of Complaint</label>
            <div className="flex gap-4">
              <label 
                className={`flex-1 flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  typeOfComplaint === "Train" 
                    ? "border-blue-500 bg-blue-50" 
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <input
                  type="radio"
                  name="typeOfComplaint"
                  value="Train"
                  checked={typeOfComplaint === "Train"}
                  onChange={() => setTypeOfComplaint("Train")}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  typeOfComplaint === "Train" ? "bg-blue-500" : "bg-gray-200"
                }`}>
                  {typeOfComplaint === "Train" && <IoMdCheckmarkCircle className="text-white" size={14} />}
                </div>
                <div className="flex items-center gap-2">
                  <BsTrainFront className="text-gray-700" size={20} />
                  <span className="font-medium">Train</span>
                </div>
              </label>
              
              <label 
                className={`flex-1 flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  typeOfComplaint === "Station" 
                    ? "border-green-500 bg-green-50" 
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <input
                  type="radio"
                  name="typeOfComplaint"
                  value="Station"
                  checked={typeOfComplaint === "Station"}
                  onChange={() => setTypeOfComplaint("Station")}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  typeOfComplaint === "Station" ? "bg-green-500" : "bg-gray-200"
                }`}>
                  {typeOfComplaint === "Station" && <IoMdCheckmarkCircle className="text-white" size={14} />}
                </div>
                <div className="flex items-center gap-2">
                  <BsBuilding className="text-gray-700" size={20} />
                  <span className="font-medium">Station</span>
                </div>
              </label>
            </div>
          </div>
          
          {/* Station Name Field - Common for both options */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Station Name</label>
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for station..."
                required
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {suggestions.length > 0 && (
                <ul className="absolute max-h-64 overflow-y-auto z-10 w-full bg-white border border-gray-300 rounded-xl shadow-lg mt-1">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-3 cursor-pointer border-b last:border-0 hover:bg-blue-50 transition-colors"
                    >
                      {suggestion.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Train-specific fields */}
          {typeOfComplaint === "Train" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Train Number</label>
                <input
                  type="number"
                  placeholder="e.g., 12345"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={trainNo}
                  onChange={(e) => setTrainNo(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Train Class</label>
                <input
                  type="text"
                  placeholder="e.g., 1A, 2A, 3A"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={trainClass}
                  onChange={(e) => setTrainClass(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          
          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <MdOutlineUploadFile size={20} />
              Upload Image
              {category && !loading2 && (
                <span className="ml-2 text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                  Category: {category}
                </span>
              )}
            </label>
            
            {loading2 ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 />
              </div>
            ) : image ? (
              <div className="relative">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Complaint" 
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setCategory("");
                    setMediaUrls([]);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <MdOutlineUploadFile className="text-blue-600" size={28} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Click to upload image</p>
                    <p className="text-sm text-gray-500">JPG or PNG format (max 5MB)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="dropzone-file"
                    className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                  >
                    Select Image
                  </label>
                </div>
              </div>
            )}
          </div>
          
          {/* Description Field */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <MdDescription size={20} />
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Provide details about your complaint..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-2">
              <FiAlertCircle className="inline mr-1" />
              Please provide specific details about your issue to help us resolve it quickly.
            </p>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>Submit Complaint</span>
            <BsStars className="text-yellow-300" size={20} />
          </button>
        </form>
        
        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t">
          <p>Your feedback helps us improve our services. Thank you for your cooperation.</p>
        </div>
      </div>
    </div>
  );
}

export default Enquiry;