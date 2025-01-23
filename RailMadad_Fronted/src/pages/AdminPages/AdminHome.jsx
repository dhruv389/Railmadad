import React,{useState} from 'react'
import CompletedComplaint from "../CompletedComplaint";
import PendingComplaint from "../PendingComplaint";


const AdminHome = () => {


      const options = [
        'Engineering Department',
        'Electrical Department',
        'Traffic Department',
        'Medical Department',
        'Security Department',
        'Sanitation Department',
        'Food Department',
      ];
    
      const [activeTab2, setActiveTab2] = useState(options[0]);
    
      const [activeTab, setActiveTab] = useState("Pending");
    




  return (
    <div className="flex-grow w-[80vw] max-h-screen  overflow-y-scroll   bg-gray-50 p-6">
    <div className="flex justify-between items-center">
      {activeTab === "Pending" ? (
        <h1 className="text-2xl font-light">Pending Comlpaints List</h1>
      ) : (
        <h1 className="text-2xl font-light">Completed Comlpaints List</h1>
      )}

      <div className="flex space-x-2 bg-white  shadow-md rounded-full p-1">
        <div
          className={`px-4 py-2 rounded-full cursor-pointer ${
            activeTab === "Pending"
              ? "bg-yellow-300 text-black"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Pending")}
        >
          Pending{" "}
          <span className="ml-1 bg-white text-gray-600 text-xs rounded-full px-2 py-1">
            202
          </span>
        </div>
        <div
          className={`px-4 py-2 rounded-full cursor-pointer ${
            activeTab === "Completed"
              ? "bg-yellow-300 text-black"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("Completed")}
        >
          Completed
        </div>
      </div>

      <input
        type="text"
        placeholder="Search"
        className="border border-gray-300 text-sm w-[30%] border-none shadow-md px-4 py-3 rounded-2xl p-2"
      />
    </div>

    <h1 className="mt-10 ml-8 font-normal text-lg">Cetegories :</h1>
    <div className="flex flex-wrap space-x-2 gap-2  rounded-full p-2">
      {options.map((option) => (
        <div
          key={option}
          className={`px-4 py-2 bg-white rounded-full  shadow-md text-sm cursor-pointer whitespace-nowrap ${
            activeTab2 === option
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab2(option)}
        >
          {option}
        </div>
      ))}
    </div>

    {activeTab === "Pending" && <PendingComplaint category={activeTab2} />}
    {activeTab === "Completed" && <CompletedComplaint category={activeTab2} />}
  </div>
  )
}

export default AdminHome