import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RiUserSmileFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const genAI = new GoogleGenerativeAI("AIzaSyCZpCZCeOHtMk2s2T3_ZUuVoifq_b4dIKQ"); 
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const predefinedPrompt = `
Hey there! 😎 I'm Noaii, your AI assistant for RailMadad 🚆. I'm here to help you with anything related to railway complaints and our platform. Ask away!  

🔹 **What is RailMadad?**  
RailMadad is your go-to platform for solving railway-related issues! 🚄💨 You can track your complaints 📍, and our AI will guide you while filling out the complaint form to ensure accuracy ✅.  

🔹 **How to file a complaint?**  
Super easy! Follow these steps:  
👉 **Sign Up** with your email 📧  
👉 **Login** to your account 🔐  
👉 You'll be redirected to your **User Dashboard** 🎛️  
👉 Fill in all necessary details and **Submit** your complaint 📄✉️  



🔹 **What types of complaints can I file?**  
You can report issues under these categories:  
🛠️ **Engineering Department**  
⚡ **Electrical Department**  
🚦 **Traffic Department**  
🏥 **Medical Department**  
🛡️ **Security Department**  
🧹 **Sanitation Department**  
🍽️ **Food Department**  

🔹 **Need Help?**  
You can contact our helpline at **📧 drcoder389@gmail.com**  

🔹 **Who is the Founder of RailMadad?**  
This platform was built by the amazing **Dhaval Rathod** 🧑‍💻🚀  

🔹 **Indian Railway General Queries**  
Need more help related to Indian Railways? No problem! 🚉 Ask me anything about:  
📞 **Indian Railways Helpline Number** - Dial **139** for official railway assistance 📲  
📅 **Train Schedules & Live Status** - Check on the official website: [NTES](https://enquiry.indianrail.gov.in)  
💺 **Ticket Booking & Cancellations** - Visit: [IRCTC](https://www.irctc.co.in)  
🎟️ **PNR Status Check** - Use this link: [PNR Status](https://www.irctc.co.in)  
👮 **Railway Police Helpline** - Call **182** for security concerns  

I'm here to help with all your Indian Railway queries! 🚆💙  
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, I'm Noaii! 🚀 How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await model.generateContent(`${predefinedPrompt}\nUser: ${input}\nBot:`);
      const response = await result.response;
      const botReply = response.text().trim() || "I'm not sure how to respond to that.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error fetching response. Try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className="z-50">
      {/* Floating Chat Button */}
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

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed border border-gray-300 bottom-16 h-[70vh]  right-5 w-[25rem] z-50 bg-white shadow-xl rounded-lg flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 bg-yellow-400 text-white rounded-t-lg">
            <h2 className="text-lg font-semibold">Hello, I'm Noaii 🚀</h2>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <RxCross2 className="text-2xl font-extrabold" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-full overflow-y-auto p-3 space-y-2">
          <div className="w-full flex justify-center items-center flex-col">
            <img src="https://avatars.githubusercontent.com/u/117587892?v=4"  alt="" className="h-[3rem] w-[3rem] rounded-full" />
            <p className="font-bold text-md text-gray-700 " > Dhaval Rathod</p>
          </div>

            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 border border-gray-300 text-start rounded-lg text-sm ${
                    msg.sender === "user" ? "bg-black text-white" : "bg-white text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-gray-500 text-sm">Typing...</div>}
            <div ref={chatEndRef}></div>
          </div>

          {/* Chat Input */}
          <div className="flex  p-2 border-t">
            <input
              type="text"
              className="flex-grow border border-gray-500 p-2  rounded-l-lg outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="bg-black p-3 rounded-r-lg text-white" onClick={sendMessage}>
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
