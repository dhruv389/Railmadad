import React,{useEffect,useState} from 'react'
import StatusChart from './StatusChart'
import BarChart1 from './BarChart1'
import { useContext } from 'react'
import {AuthContext } from '../../Context/userContext'

const AdminAnalytics = () => {
  const {chartData} = useContext(AuthContext);

  
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/getcomplaintsdata');
      const data = await response.json();
      setStats(data);
      setLoading(false);
      console.log(data);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;



  
  return (
    <div className="">
      <h2 className='mt-[5rem] ml-[4rem] w-[15rem] rounded-md font-medium text-white py-3 px-3 bg-yellow-400 '>Complaints Visulization </h2>
    <div className='flex justify-center gap-4  py-[4rem]  items-start flex-grow w-[80vw] overflow-hidden max-h-[85vh]'>
   
    <div className="h-full w-[41%] rounded-md p-3 shadow-lg flex flex-col-reverse  ml-7 mt-8 items-center justify-around">
    <h2 className=' w-full font-semibold text-md text-blue-600'>Data Representation of StutusWise (Pending, In Progress , Resolved)  </h2>
    <StatusChart/>
    </div>

    <div className="h-full w-[41%] flex rounded-md flex-col-reverse items-center shadow-lg p-3 justify-around">
    <h2 className='font-semibold mt-10 text-md text-green-400'>Data Representation CategoryWise  </h2>
    <BarChart1/>
    </div>
    
   
    </div>
    </div>
  )
}

export default AdminAnalytics