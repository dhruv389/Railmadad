import React from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import icon1 from "../Images/download (2).png"
import Sidebar from './Sidebar'
import { useFirebase  } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2'
import { TiUser } from "react-icons/ti";
import Dropdown from './Dropdown';
import { IoLogOut } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { PiUserCirclePlusFill } from "react-icons/pi";


const Header = () => {
const firebase = useFirebase();
//  console.log(firebase.isLoggedin);
 const navigate=useNavigate();
 const handleLogout = async () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log out!",
    cancelButtonText: "Cancel"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await signOut(firebase.auth);
        Swal.fire({
          title: "Logged out!",
          text: "You have been signed out.",
          icon: "success"
        }).then(() => {
          // Reload the page after the success alert is closed
          navigate('/');
          window.location.reload();
        });
        console.log('User signed out!');
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: `Error signing out: ${error.message}`,
          icon: "error"
        });
        console.error('Error signing out:', error);
      }
    }
  });
};
 
  return (
    <div className="navbar  ">
    <div className="h-[3rem] gap-4 custom:gap-1 custom:w-full  flex w-[40%]">
    <div className="hidden custom:flex custom:pt-4"> <Sidebar/></div>
   
    <Link to="/" className="smj-icon bg-yellow-300 rounded-full  h-[3rem]   w-[5rem]" >
    <img className="h-full  w-full object-contain " src="https://img.freepik.com/free-vector/front-diesel-locomotive-cartoon-style_1308-89378.jpg?t=st=1738393636~exp=1738397236~hmac=8f78d5d66a17eb5919217bf6f1994d04f00deaf7327d8e872cda1d58ab563373&w=360" alt=""/>
    </Link>
          
            <div className="  flex justify-start items-center custom:ml-2 custom:flex custom:justify-center custom:items-center w-full">
                <h1 className=" text-black font-semibold text-[2.5rem] custom:text-[2rem]">RailMadad</h1>
               
            </div>
            </div>
            {/* <div className="security w-[30%]">
                <button className="login-btn">
                    <i className="fa-solid fa-phone-volume">139</i>
                </button>
                <p>For Security/Medical Assistance</p>
            </div> */}

 
            <div className="w-[35%] mr-7 flex justify-center items-center ">

            {
              !firebase.isLoggedin  && ( <div className="btns h-full  custom:hidden  flex gap-10 justify-end ">
               
               <Link to="/login"><button className="bg-black py-2 text-sm gap-2 hover:bg-yellow-400  rounded-lg text-white flex justify-between items-center px-3 " type="submit"><IoIosLogIn fontSize={"20px"}/> Login</button></Link>
               <Link to="/signup"> <button className="bg-black py-2 text-sm gap-2 hover:bg-yellow-400 px-3 rounded-lg text-white flex justify-between items-center " type="submit"><PiUserCirclePlusFill fontSize={"20px"}/>Sign Up</button>  </Link>  
            </div>)
            }
            {
              firebase.isLoggedin  && <div className="btns h-full custom:hidden flex gap-10 justify-end ">
               <Link to="/dashboard/enquiry" className='bg-black hover:bg-yellow-400 w-[60%]  text-sm gap-2 px-3 rounded-lg text-white flex justify-between items-center'> <TiUser fontSize={"25px"}/> User Dashboard </Link>
              <button className="bg-black text-sm gap-2 hover:bg-yellow-400 px-3 rounded-lg text-white flex justify-between items-center py-2 " type="submit" onClick={handleLogout}> <IoLogOut fontSize={"25px"}/> Logout </button>
              </div> 
            }
            <Dropdown/>
            </div>
        </div>
  )
}

export default Header