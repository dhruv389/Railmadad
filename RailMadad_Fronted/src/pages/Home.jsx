import React from 'react'

import train from "../Images/train4.png"
import i1 from "../Images/download.png"
import i2 from "../Images/download (1).png"
import i3 from "../Images/download (2).png"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Tilt } from '@jdion/tilt-react'

import rob1 from "../Images/rob2.gif"


const Home = () => {

	// const [data, setData] = useState(null);
	// const [error, setError] = useState(null);

	// useEffect(() => {
	//   const fetchData = async () => {
	// 	const url = 'https://irctc1.p.rapidapi.com/api/v1/searchStation?query=Ahmedabad';
	// 	const options = {
	// 	  method: 'GET',
	// 	  headers: {
	// 		'x-rapidapi-key': 'f4f6a8093cmshc157890d7656493p1ee5c0jsnbb103a292bd4',
	// 		'x-rapidapi-host': 'irctc1.p.rapidapi.com'
	// 	  }
	// 	};

	// 	try {
	// 	  const response = await fetch(url, options);
	// 	  const result = await response.json(); // Parsing the result as JSON
	// 	  setData(result);
	// 	  console.log(result);
	// 	} catch (error) {
	// 	  setError(error);
	// 	  console.error(error);
	// 	}
	//   };

	//   fetchData();
	// }, []);
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;
			console.log(uid)
			// ...
		} else {
			console.log("no user")
		}
	});
	// Swal.fire("SweetAlert2 is working!")
	return (

		<div className={`flex min-h-[80vh] flex-col w-screen justify-center items-center `}>

			<div className="flex min-h-[80vh]   flex-col w-screen justify-center items-center ">
				<div className="w-[95%] custom:pb-2 gap-3 custom:w-[100%] custom:text-center custom:items-center mt-10 custom:mt-0  h-[100%]  flex items-center justify-center flex-col">
					<Tilt>
						<h1 className='text-[3rem] custom:text-[1.7rem] font-bold text-center  cursor-pointer '>Welcome to <span className='text-red-800'>Rail Madad</span> : Your <span className='text-red-800'>Trusted</span>  Platform for Resolving <span className='text-red-800'>Railway</span>  Concerns</h1> </Tilt>
					<p className='text-center custom:text-sm w-[80%] font-medium'>Whether it's issues with tickets, food, cleanliness, or any other railway-related problems, we&apos;re here to help you find swift solutions and ensure a better travel experience.</p>

					{/* <Link to="/dashboard" className='w-[70%] bg-black rounded-xl flex justify-center items-center mt-8 text-white h-[3rem]'>
				<Tilt > Get started
 </Tilt>
			 </Link> */}

				</div>


				<div className="w-[80%]  custom:mt-[0rem] custom:w-[100%] flex mt-[1rem] justify-center items-center  h-[25rem]">
				<img src="https://images.pexels.com/photos/1170187/pexels-photo-1170187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='h-full rounded-3xl  object-cover w-full ' />
			</div>


			</div>




			<div className="mt-2">
				<h1 className='text-[2rem] md:text-center md:text-[1.2rem] font-bold text-red-900 '> Services</h1>
			</div>

			<div className="flex  text-xs w-[80%] mt-1  pt-7 rounded-[2rem]  justify-center custom:w-[90%] custom:px-10  custom:overflow-x-scroll  gap-12 items-start">
				<a href="https://www.irctc.co.in/nget/train-search" target='blank'>

					<div className="flex flex-col justify-center text-center items-center  shadow-lg rounded-lg py-2 w-[6rem] h-[2re] gap-2">
						<img src={i1} className="h-[3rem] w-[3rem]" alt="" />
						<p>Ticket Booking</p>
					</div>
				</a>
				<a href="https://enquiry.indianrail.gov.in/mntes/" target='blank'>

					<div className="flex flex-col justify-center items-center  text-center shadow-lg rounded-lg py-2 w-[6rem] h-[2re] gap-2">
						<img src={i2} className="h-[3rem] w-[3rem]" alt="" />
						<p>Train Enquiry</p>
					</div>
				</a>
				<a href="https://www.indianrail.gov.in/enquiry/StaticPages/StaticEnquiry.jsp?StaticPage=index.html" target='blank'>

					<div className="flex flex-col justify-center items-center text-center shadow-lg rounded-lg py-2 w-[6rem] h-[2re] gap-2">
						<img src={i3} className="h-[3rem] w-[3rem]" alt="" />
						<p>Reservation Enquiry</p>
					</div>
				</a>
				<a href="https://indianrailways.gov.in/" target='blank'>

					<div className="flex flex-col justify-center items-center text-center shadow-lg rounded-lg py-2 w-[6rem] h-[2re] gap-2">
						<img src={i2} className="h-[3rem] w-[3rem]" alt="" />
						<p>Indian Railways</p>
					</div>
				</a>
				<a href="https://play.google.com/store/apps/details?id=com.cris.utsmobile&hl=en_IN&pli=1" target='blank'>

					<div className="flex flex-col justify-center items-center text-center shadow-lg rounded-lg py-2 w-[6rem] h-[2re] gap-2">
						<img src={i1} className="h-[3rem] w-[3rem]" alt="" />
						<p>UTS Ticketing</p>
					</div>
				</a>
				<a href="https://enquiry.indianrail.gov.in/" target='blank'>

					<div className="flex flex-col justify-center items-center text-center shadow-lg rounded-lg py-2 w-[6rem] h-[2re] gap-2">
						<img src={i3} className="h-[3rem] w-[3rem]" alt="" />
						<p>Enqiry</p>
					</div>
				</a>
				<a href="https://parcel.indianrail.gov.in/" target='blank'>
					<div className="flex flex-col justify-center items-center text-center shadow-lg rounded-lg py-2 w-[6rem] h-[2re] gap-2">
						<img src={i2} className="h-[3rem] w-[3rem]" alt="" />
						<p>Railway Parcel Website</p>
					</div>
				</a>
				<a href="https://www.fois.indianrail.gov.in/RailSAHAY/index.jsp" target='blank'>
					<div className="flex rounded-lg shadow-lg py-2 flex-col justify-center items-center text-center w-[6rem]  gap-2">
						<img src={i1} className="h-[3rem] w-[3rem]" alt="" />
						<p>Freight Business</p>
					</div>
				</a>
			</div>

			
		
	
			

			<div className="h-[27rem]  md:flex-col md:gap-0 custom:h-auto  w-[80%] flex  justify-between items-center  ">




				<div className="h-full w-[52%] md:w-[98%] "   ><img src={rob1} alt="" className='h-full w-full object-cover' /></div>


				<div className="h-[50%] w-[48%] md:mt-0 mt-20 gap-4 md:w-full  justify-center items-center flex flex-col ">
					<h1 className=' custom:text-[1.2rem] text-[1.9rem] font-bold'>Meet <span className='text-[#8FDBCF]'>Robo</span> : Your AI Model for Smart Complaint Categorization</h1>
					<p className='text-lg text-gray-500 custom:text-sm'>Upload your photos or videos, and let Robo's AI efficiently sort and direct your railway complaints to the right place</p>
				</div>


			</div>




















			<div className="mt-20">
				<h1 className='text-[2rem] md:text-center md:text-[1.2rem] font-bold'> <span className='text-red-900'>Explore Categories</span>: Support for All Railway Concerns</h1>
			</div>
			<div className=" bg-slate-50 py-10  md:h-auto items-center md:flex-col w-full flex justify-center gap-10 h-[27rem] mt-8 ">
				<div className="rounded-[20px] md:w-[90%] w-[35%] h-[95%] ">
					<img src="https://images.alphacoders.com/130/thumb-1920-1309691.jpg" className='object-cover rounded-[20px] w-full h-full ' />
				</div>
				<div className=" md:w-[90%] text-sm font-medium items-center justify-center flex flex-wrap gap-8 h-full w-[40%]">
					<div className="h-[6rem]  w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-photo/view-delicious-appetizing-street-food_23-2151516962.jpg?t=st=1724734042~exp=1724737642~hmac=788118895c7590867adadad083724a6c419ee5b5af370eddc8db0556c6e96b94&w=996" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Food Quality</p>
					</div>

					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-vector/public-toilet-minimalistic-interior_1441-3053.jpg?t=st=1724734290~exp=1724737890~hmac=a0b535e8af1d233c81cedbd7ef79374ae9d69e3f7ec218f8897bae65e52baf96&w=1380" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Toilet Hygiene</p>
					</div>


					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-photo/man-white-protection-suit-disinfecting-sanitizing-subway-train-interior-stop-spreading-highly-contagious-corona-virus_342744-484.jpg?t=st=1724734367~exp=1724737967~hmac=b543cbeac877bea232c11f7cbd1b204f812c6d3ef2cbbdcdbc148a7d69df651f&w=996" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Coach Cleanliness</p>
					</div>

					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-vector/hand-drawn-train-ticket-template_23-2150443442.jpg?t=st=1724734420~exp=1724738020~hmac=be66a177a1d87b81137aea99208eb190ecccf8dcc5007621a5e6d7348b8070d6&w=740" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Ticketing Issues</p>
					</div>

					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-photo/japanese-officer-train-station_1150-10894.jpg?t=st=1724734518~exp=1724738118~hmac=45da3f71336c68700c43a3516713d7b2e09d1a120917c507d3fdff076ee915e2&w=996" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Staff Behavior</p>
					</div>

					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-psd/3d-rendering-hotel-icon_23-2150102380.jpg?t=st=1724734641~exp=1724738241~hmac=db2526b7d6e5bbd2e5d5634e7acfdefb69c2ba6ad32309cc1ee1632fe736fdc1&w=740" className='object-cover rounded-[20px] w-full h-full ' />
						<p>AC/Non-AC Issues</p>
					</div>

					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-photo/travel-bags-ready-trip_23-2148232365.jpg?t=st=1724734771~exp=1724738371~hmac=f9b86e358fec71dfbde16a16ff6c98cfa5a18b4f352bffafaa57dadd6ef2c89a&w=360" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Luggage Issues</p>
					</div>
					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-photo/little-girl-checked-shirt-jacket-plugging-ears-with-fingers-looking-annoyed-front-view_176474-90168.jpg?t=st=1724735004~exp=1724738604~hmac=6819879a5b4fefe934c848546fb7ec702a06d7fd1434a53e812189c2329099e0&w=996" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Noise Disturbances</p>
					</div>

					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-vector/flat-design-blackout-background_23-2149245138.jpg?t=st=1724735356~exp=1724738956~hmac=723fd3c3d3abf7dad57d56ec8d6d7e915419ed6a153a544d771c166e5116d9b7&w=996" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Electrical Issues</p>
					</div>

					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-vector/man-doing-appointment-her-app_23-2148573623.jpg?t=st=1724735200~exp=1724738800~hmac=d3763564bbaa2873c98737f1dab910fb678d3a5ddde4c0e0e2c86b47cf494c39&w=740" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Reservation Problems</p>
					</div>



					<div className="h-[6rem] w-[5rem] flex flex-col gap-2 justify-center items-center">
						<img src="https://img.freepik.com/free-photo/close-up-portrait-traveling-woman_23-2151030965.jpg?t=st=1724735256~exp=1724738856~hmac=349ec6b5a7d5401e6dab4e5c124d9d9365c024faea7c5e9f176af98d2da234fb&w=996" className='object-cover rounded-[20px] w-full h-full ' />
						<p>Punctuality and Delays</p>
					</div>



				</div>
			</div>
			
		</div>

	)
}

export default Home