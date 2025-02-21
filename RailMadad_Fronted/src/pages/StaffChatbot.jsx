import React, { useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useFirebase } from '../firebase/firebase';
import { IoSend } from "react-icons/io5";
import { RiUserSmileFill } from "react-icons/ri";
import { RiMessage3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const socket = io('http://localhost:5000');

function StaffChatbot({ department = "En", station = "ahmedabad" }) {

  console.log(department, station);
  const { useruid } = useFirebase();
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (useruid) setUserId(useruid);
  }, [useruid]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/api/getchatusers`, {
          params: { department, station },
        });
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [department, station]);

  const fetchMessages = async (userId) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/getchatmessage`, {
        params: { department: department.trim(), station, userId },
      });
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    if (activeUser) {
      fetchMessages(activeUser);
      socket.emit("join_room", { department, station, userId: activeUser });
    }
  }, [activeUser]);

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("status_updated", (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
      );
    });

    return () => {
      socket.off("receive_message");
      socket.off("status_updated");
    };
  }, []);

  const handleUserSelect = (userId) => {
    setActiveUser(userId);
  };

  const sendReply = () => {
    if (message.trim() && activeUser) {
      const newMessage = { department, station, userId: activeUser, message };
      socket.emit("send_reply", newMessage);
      // setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };
 useEffect(() => {
    if(!isOpen) {setActiveUser(null); setMessages([])}
  },[isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (

    <div className="">

<div className="fixed bottom-[3rem] right-8 group">
      <div className="fixed bottom-[3rem] right-8 flex flex-col items-end">
  {/* Tooltip as a chat bubble */}
  <div className=" mr-5 bg-gray-800 text-white text-sm px-4 py-2 rounded-t-full  rounded-bl-full shadow-md w-max animate-bounce">
    🤖 Ask AI your doubts! 💡
  </div>

  {/* Button */}
  <button
    className="bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:bg-black transition"
    onClick={() => setIsOpen(!isOpen)}
  >
    <RiUserSmileFill className="w-6 h-6" />
  </button>
</div>
</div>


{isOpen && (
  <div className='h-screen w-screen  bg-black bg-opacity-10 backdrop-blur-sm p-6  fixed z-50  bottom-[0.2rem]  text-white flex gap-10 justify-center items-center'>


 




<div className="h-[90%] w-[70vw] rounded-[1rem] flex pl-5 justify-center gap-5 pr-10 items-center bg-[#151718]">

      <div className="h-full w-[25%] rounded-[1rem]    shadow-lg flex flex-col justify-center items-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='h-full overflow-y-auto w-full text-white  rounded-[2rem]  shadow-lg flex flex-col justify-start pt-5 items-center gap-3 '>
            {users.map(user => (
              <button 
                onClick={() => handleUserSelect(user.userId)} 
                key={user.userId} 
                className="h-[3.5rem] w-[95%] text-sm rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg flex justify-between items-center p-2 shadow-md"
              >
              <div className="h-[25px] w-[25px] mr-4"><RiMessage3Fill fontSize={"25px"}/></div>

              
                <div className="w-[90%] h-full flex flex-col justify-start items-start  ">
                  <p>{user.userId}</p>
                  <p className="text-sm opacity-80">{user.latestMessage}</p>
                </div>
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white text-center flex items-center justify-center shadow-md">
                  {user.unshownCount}
                </div>
              </button>
            ))}
          </div>
        )}


        <div className=""></div>
      </div>
      


      <div className="h-[95%] w-[75%] text-sm rounded-2xl bg-[#FEFEFE] flex flex-col">
        <div className="px-4 py-2 shadow-md  text-black rounded-t-2xl  flex  justify-between items-center gap-1">
          <p className=" font-semibold">Chat with {activeUser || "Select a User"}</p>

           <button onClick={() => setIsOpen(false)} className="text-black">
                        <RxCross2 className="text-2xl font-extrabold" />
                      </button>
        </div>
        <div className="flex-1 flex-col p-4 w-full overflow-y-auto space-y-3">
          {messages.map((msg, index) => (
          



            <div key={index} className="flex text-black rounded-md  flex-col  h-[5rem] w-[94%]">
              <div className={`h-[80%] border-2 rounded-md  border-gray-200 w-full pt-2 pl-3    ${msg.sender === "department" ?" ":"bg-gray-200"} `}>{msg.message}</div>
              
{msg.sender === "department" ?(<div className= {`h-[20%]  flex w-full ${msg.sender === "department" ?"justify-end pr-4":"justify-start pl-4 "}`}> <img src="https://cdn.pixabay.com/photo/2024/08/01/18/20/anime-8937913_1280.png" className='h-[2rem] w-[2rem] rounded-md relative bottom-4' alt="" />
             
             <p className="text-[12px] ml-4 text-gray-400">now - {department}   </p>
             
             </div>
             
             )

:(
  <div className= {`h-[20%]  flex w-full ${msg.sender === "department" ?"justify-end pr-4":"justify-start pl-4 "}`}> <img src="https://cdn.pixabay.com/photo/2024/08/01/18/20/anime-8937913_1280.png" className='h-[2rem] w-[2rem] rounded-md relative bottom-4' alt="" />
             
             <p className="text-[12px] ml-4 text-gray-400">now - {activeUser}   </p>
             
             </div>

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
            onKeyDown={(e) => e.key === "Enter" && sendReply()}
          />
          <button onClick={sendReply} className="p-2 bg-blue-600 rounded-full text-white">
            <IoSend size={24} />
          </button>
        </div>
      </div>


</div>





    </div>
)}



    </div>
    
  );
}

export default StaffChatbot;
