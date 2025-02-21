import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { IoSend } from "react-icons/io5";
import { RiUserSmileFill } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useFirebase } from '../firebase/firebase';
import { BsWechat } from "react-icons/bs";
import jsonData from "../pages/Stations.json";
function UserChatbot() {
  const { useruid } = useFirebase();
  const userId = "12345"; // Initialize userId with useruid
  const [department, setDepartment] = useState('Engineering Department');
  const [station, setStation] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomJoined, setRoomJoined] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [image , setImage] = useState('');
const messagesEndRef = useRef(null);
const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Use a ref to store the socket instance
  const socketRef = useRef(null);

  // Initialize socket connection when the component mounts
  useEffect(() => {
    // Create the socket connection
socketRef.current = io('http://localhost:5000');

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Join a room based on department, station, and userId
  const joinRoom = () => {
    
    if (department && station && userId) {
      const temp= station.toLowerCase().trim();
      console.log(temp);
      console.log(department)
      socketRef.current.emit('join_room', { department,station:temp, userId });
      setRoomJoined(true);
      fetchMessages();
    }
    else {
      window.alert("please select department, station, userId")
    }
  };
  useEffect(() => {
    fetchMessages();
  },[department])

  // Fetch messages for the selected department, station, and userId
  const fetchMessages = async () => {
    const tmp= station.toLowerCase().trim();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getchatmessage?department=${department}&station=${tmp}&userId=${userId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  // Send a message
  const sendMessage = () => {
    if (message.trim() && department && station && userId) {
      socketRef.current.emit('send_message', { department, station, userId, message });
      setMessage('');
    }
  };

  // Listen for incoming messages and status updates
  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    // Add event listeners
    socket.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('status_updated', (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('receive_message');
      socket.off('status_updated');
    };
  }, [department, station, userId]); // Re-run effect if these values change





  const users = [
    { department: "Engineering Department", image: "https://img.freepik.com/free-photo/portrait-mechanic-cartoon-style_23-2151134223.jpg?t=st=1740030171~exp=1740033771~hmac=9bd46c5a5367e557f007d4ff54eac6a7454df79323909f2c0dd1cf80192232f6&w=1380" },
    { department: "Electrical Department", image: "https://img.freepik.com/free-vector/cute-shiba-inu-dog-holding-hammer-lightning-cartoon-vector-icon-illustration-animal-holiday-icon_138676-6310.jpg?t=st=1740030247~exp=1740033847~hmac=21ac69aaa7b642b29edd36212825795c1755eaab3c1edcddaf3d7c18b2c3c08b&w=740" },
    { department: "Traffic Department", image: "https://img.freepik.com/free-photo/portrait-police-officer-cartoon-style_23-2151134059.jpg?t=st=1740030310~exp=1740033910~hmac=203073134335cbb9c214f7ef3730a58218230b3d9129bbed28338a0e1d74b73a&w=1380" },
    { department: "Medical Department", image: "https://img.freepik.com/free-photo/rendering-anime-doctor-job_23-2151151780.jpg?t=st=1740030338~exp=1740033938~hmac=53181c0030da5f4e965b3f673e36d225a6778078c69318c05addefabe77da4c7&w=1060" },
    { department: "Security Department", image: "https://img.freepik.com/free-vector/security-control-room-flat-illustration-guard-character-with-portable-radio-watching-screen_1284-58948.jpg?t=st=1740030392~exp=1740033992~hmac=0db775840afa83b9b68870d7e090770a79c7d5ab99150c7fd125cdca5d0de46e&w=1060" },
    { department: "Food Department", image: "https://img.freepik.com/free-vector/japanese-lunchbox-filled-with-food-kawaii-design_52683-56057.jpg?t=st=1740030422~exp=1740034022~hmac=6c5ebd71bfc011fa3ed649561cfa2e698f2fe603bbb41a9e5d003e4771eae57d&w=740" },
    { department: "Sanitation Department", image: "https://img.freepik.com/free-vector/hand-drawn-power-washing-cartoon-illustration_23-2151088033.jpg?t=st=1740031425~exp=1740035025~hmac=8111d6d81c51f449a79fa49c035ea7880557c98ebb33502b38a63567a4933e3c&w=740" },
  ];

useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleInputChange2 = (e) => {
    const value = e.target.value;
    setStation(value.toLowerCase());
  
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
    setStation(suggestion.name.toLowerCase().trim());
   setSuggestions([]);
  
 };

  return (
    <div className='h-screen w-screen z-25 fixed'>
      




<div className="fixed bottom-[3rem] left-8 group">
      <div className="fixed bottom-[3rem] left-8 flex flex-col items-end">
  {/* Tooltip as a chat bubble */}
 

  {/* Button */}
  <button
    className="bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:bg-black transition"
    onClick={() => setIsOpen(!isOpen)}
  >
    <BsWechat className="w-6 h-6" />
    
  </button>
</div>
</div>




{isOpen && (
  
 <div className='h-screen w-screen  bg-black bg-opacity-10 backdrop-blur-sm p-6  fixed z-50  bottom-[0.2rem]  text-white flex gap-10 justify-center items-center'>


 




<div className="h-[90%] w-[70vw] rounded-[1rem] flex pl-5 justify-center gap-5 pr-10 items-center bg-[#151718]">

      <div className="h-full w-[25%] rounded-[1rem]    shadow-lg flex flex-col justify-center items-center">
       
          <div className='h-full overflow-y-auto w-full text-white  rounded-[2rem]  shadow-lg flex flex-col justify-start pt-5 items-center gap-3 '>
            {users.map((user) => (
              <button 
                onClick={() => {setDepartment(user.department); setImage(user.image);}} 
                key={user.department} 
                className={`h-[3.5rem] w-[95%] text-sm rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg flex justify-between items-center p-2 shadow-md ${department === user.department ? "bg-white/20" : ""}`}
              >
              <div className="h-[30px] w-[30px] mr-4"> <img src={user.image} className='h-[30px] w-[30px] rounded-md' alt="" />   </div>

              
                <div className="w-[90%] h-full flex flex-col justify-start items-start  ">
                  <p >{user.department}</p>
                  
                </div>
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white text-center flex items-center justify-center shadow-md">
                  0
                </div>
              </button>
            ))}
          </div>
      


        <div className=""></div>
      </div>
      

{!roomJoined ? ( <div className="h-[95%] flex justify-start items-center flex-col gap-5 w-[75%] text-sm text-black rounded-2xl bg-[#FEFEFE] ">
 
   {/* <input
            type="text"
            placeholder="Enter Station Name"
            value={station}
            onChange={(e) => setStation(e.target.value)}
          />  */}
         








         
            <p className='mt-10 font-bold text-gray-300 text-[4rem]'>Select Your  Station</p>
           
           

          <div className="relative mt-12 w-[70%]  mx-auto ">
      <input
        type="text"
        required
        value={station}
        onChange={handleInputChange2}
        placeholder="Search station..."
        className="w-full p-3 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
      />
      {suggestions.length > 0 && (
        <ul className="absolute max-h-[40vh] overflow-x-hidden font-normal overflow-scroll z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
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


    <button className='w-[70%] mt-10 bg-black text-white py-3 rounded-lg hover:bg-gray-800' onClick={joinRoom}>Chat with {department}</button>









</div>
) : (

  <div className="h-[95%] w-[75%] text-sm rounded-2xl bg-[#FEFEFE] flex flex-col">
        <div className="px-4 py-2 shadow-md  text-black rounded-t-2xl  flex  justify-between items-center gap-1">
          <p className=" font-semibold">Chat with {department|| "Select a User"}</p>

           <button onClick={() => setIsOpen(false)} className="text-black">
                        <RxCross2 className="text-2xl font-extrabold" />
                      </button>
        </div>
        <div className="flex-1 flex-col p-4 w-full overflow-y-auto space-y-3">
          {messages.map((msg, index) => (
          



            <div key={index} className={`flex w-full ${msg.sender === "department" ? "justify-start" : "justify-end"} my-2`}>
  {msg.sender === "department" && (
    <img src={image} className="h-8 w-8 rounded-full mr-2 self-end" alt="Department" />
  )}

  <div className={`max-w-[75%] px-4 py-2 rounded-lg text-white text-sm relative shadow-md ${msg.sender === "department" ? "bg-blue-500" : "bg-black "}`}>
    {msg.message}
    <p className="text-[10px] text-gray-200 mt-1">
      {msg.sender === "department" ? `${department} - now` : "You - now"}
    </p>
  </div>

  {msg.sender !== "department" && (
    <img src="https://cdn.pixabay.com/photo/2024/08/01/18/20/anime-8937913_1280.png" className="h-8 w-8 rounded-full ml-2 self-end" alt="You" />
  )}
</div>

          ))}

          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t flex items-center gap-2">
          <input
            type="text"
            className="flex-1 p-2 border-gray-300  rounded-lg bg-transparent text-black border outline-none"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="p-2 bg-blue-600 rounded-full text-white">
            <IoSend size={24} />
          </button>
        </div>
      </div>


) }
      


</div>





    </div>


)}
























    </div>
  );
}

export default UserChatbot;