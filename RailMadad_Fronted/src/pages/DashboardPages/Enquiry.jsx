import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { BsStars } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import jsonData from "../Stations.json";
import { useFirebase } from '../../firebase/firebase.jsx';
import { Cloudinary } from "cloudinary-core";
import Swal from 'sweetalert2'
import { GoogleGenerativeAI } from '@google/generative-ai'; 


function Enquiry() {
  const [selectedStation, setSelectedStation] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [category, setCategory] = useState("");
  const [trainClass, setTrainClass] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrls, setMediaUrls] = useState([]);
  const [typeOfComplaint, setTypeOfComplaint] = useState("Train"); // Default value
  const [filteredNames, setFilteredNames] = useState([]);
  const firebase = useFirebase();
  const [uidd, setuidd] = useState("");
  const[image,setImage]=useState(null);
  //******************************************************************************* */



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
    const uploadedUrls = [];
    setImage(files[0]);


    const genAI = new GoogleGenerativeAI("AIzaSyCZpCZCeOHtMk2s2T3_ZUuVoifq_b4dIKQ"); 

   

  console.log(files[0]);

    if (files[0]) {
      console.log("*******");
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
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
        console.log(isValid+"--------------------");
        setCategory(isValid === "false" ? "No Match" : isValid); 
        if(isValid === "false") {
       window.alert("No Match Found");
        }
        else {
          const cloudinaryCore = new Cloudinary({
      cloud_name: "dyugrhvaq",
      api_key: "464611998742645",
    });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Dhavalfirst_image-folder");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            cloudinaryCore.config().cloud_name
          }/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        uploadedUrls.push(data.secure_url); // Get the URL of the uploaded file
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }


    setMediaUrls(uploadedUrls);
        }
        console.log(isValid+"--------------------");
      } catch (error) {
        console.error('Error analyzing image:', error.message);
        setCategory("Error");
      }
    }

















   

     // Update the state with the uploaded file URLs
  };

  //*********************************************************************************** */

  useEffect(() => {
    
    if(firebase.user)
 console.log(firebase.useruid);
    
 
  }, []);

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();



    try {
      const prompt = `
        Validate the following complaint description: "${description}".
        Check if it matches the category "${category}" or relates to train or station problems.
        Respond with "true" if valid, or "false" if invalid.
      `;

      const response = await genAI.generateText({
        prompt: prompt,
        maxTokens: 5, // Adjust as needed
      });
       const isvalid=response.text.trim() === 'true';
      if (isvalid) {
        const complaintData = {
      userId: firebase.useruid, // Replace with actual user ID
      category,
      description,
      media: mediaUrls,
      typeOfComplaint,
      stationName: selectedStation,
      pnrNumber: trainNo ,
      TrainClass:trainClass,
    };

    try {
      const response = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintData),
      });

      const result = await response.json();
      console.log("Complaint submitted successfully:", result);
      Swal.fire({
        icon: "sucess",
        title: "Nice...",
        text: "Your Compalint submited!",
      
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Complaint!",})
      }
      
    } catch (error) {
      console.error("Error validating complaint:", error);
      
    }




    
  };


  const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
  
    const handleInputChange2 = (e) => {
      const value = e.target.value;
      setInputValue(value);
    
      if (value) {
        const filteredSuggestions = jsonData.data.filter((item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        );
       
        setSuggestions(filteredSuggestions);
      } else {
        console.log("jdjd");
        setSuggestions([]);
      }
    };
  
    const handleSuggestionClick = (suggestion) => {
      setInputValue(suggestion.name);
      setSuggestions([]);
    };



  return (
    <div className="w-full h-full flex flex-col gap-2 justify-start overflow-y-scroll items-center py-8">
      <div className="font-bold text-lg">Complaint Form</div>
      <form onSubmit={handleSubmit} className="w-[60%]">
        

        

        <div className="mt-6 text-sm font-semibold flex justify-start flex-col gap-1">
          <p>Type Of Complaint:</p>
          <div className="flex font-semibold border py-4 px-6 rounded-xl justify-start">
            <p>Train</p>
            <input
              type="radio"
              name="typeOfComplaint"
              value="Train"
              checked={typeOfComplaint === "Train"}
              onChange={() => setTypeOfComplaint("Train")}
            />
            <p className="ml-9">Station</p>
            <input
              type="radio"
              name="typeOfComplaint"
              value="Station"
              checked={typeOfComplaint === "Station"}
              onChange={() => setTypeOfComplaint("Station")}
            />
          </div>
        </div>

        {typeOfComplaint === "Station" ? (
          <div className="w-full  mt-6 text-sm  font-semibold flex justify-start flex-col gap-1">
            <p>Station Name:</p>
           
           

          <div className="relative w-full  mx-auto ">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange2}
        placeholder="Search station..."
        className="w-full p-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute max-h-[40vh]  font-normal overflow-scroll z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
            >
              {suggestion.name} 
            </li>
          ))}
        </ul>
      )}
    </div>


          </div>

        ) :
        <div className="">

        <div className="text-sm font-semibold flex justify-start mt-4 flex-col gap-1">
          <p>Train No:</p>
          <input
            type="text"
            placeholder="e.g., 12345"
            className="h-[3rem] py-3 px-2 w-full hover:border-2 hover:border-black rounded-xl border"
            value={trainNo}
            onChange={(e) => setTrainNo(e.target.value)}
          />
        </div>




        <div className="mt-6 text-sm font-semibold flex justify-start flex-col gap-1">
          <p>Train Class:</p>
          <input
            type="text"
            placeholder="e.g., 1A, 2A , 3A"
            className="h-[3rem] py-3 px-2 w-full hover:border-2 hover:border-black rounded-xl border"
            value={trainClass}
            onChange={(e) => setTrainClass(e.target.value)}
          />
        </div>




        <div className="w-full  mt-6 text-sm  font-semibold flex justify-start flex-col gap-1">
            <p>Station Name:</p>
           
           

          <div className="relative w-full  mx-auto ">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange2}
        placeholder="Search station..."
        className="w-full p-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute max-h-[40vh]  font-normal overflow-scroll z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
            >
              {suggestion.name} 
            </li>
          ))}
        </ul>
      )}
    </div>


          </div>









        </div>

        
        }

        



   { image ? <img src={URL.createObjectURL(image)} alt="" className="w-[40%] mt-5 rounded-xl h-[15rem]" /> :
   (<div className="flex items-center justify-start w-full mt-6 flex-col"> <h1 className="w-full py-3 text-sm font-semibold">
            Choose File From Device
          </h1>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-100 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileUpload}
            />
          </label>
         
        </div>)
   }
        

        <div className="mt-6 text-sm font-semibold flex justify-start flex-col gap-1">
          <p>Description:</p>
          <textarea
            cols="30"
            rows="4"
            className="border hover:border-2 hover:border-black rounded-2xl p-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full mt-[1rem] py-3 flex justify-center items-center gap-3 rounded-2xl text-sm font-bold bg-black text-white"
        >
          Submit <BsStars className="text-white" size={"25px"} />
        </button>
      </form>
    </div>
  );
}

export default Enquiry;
