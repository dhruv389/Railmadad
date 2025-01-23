import React from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import icon1 from "../Images/download (2).png"
import Sidebar from './Sidebar'
import { useFirebase  } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2'
import Dropdown from './Dropdown';

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
    <div className="navbar">
    <div className="h-[5rem] gap-10 custom:gap-1 custom:w-full  flex w-[40%]">
    <div className="hidden custom:flex custom:pt-4"> <Sidebar/></div>
   
    <Link to="/" className="smj-icon  h-[5rem]   w-[5rem]" >
    <img className="h-full  w-full object-contain " src={icon1} alt=""/>
    </Link>
          
            <div className="rm-icon custom:ml-2 custom:flex custom:justify-center custom:items-center w-full">
                <h1 className="i-head font-bold text-[3rem] custom:text-[2rem]">RailMadad</h1>
                <p className='custom:hidden'>For Inquiry, Assistance & Grievance Redressal</p>
            </div>
            </div>
            {/* <div className="security w-[30%]">
                <button className="login-btn">
                    <i className="fa-solid fa-phone-volume">139</i>
                </button>
                <p>For Security/Medical Assistance</p>
            </div> */}

 
            

            {
              !firebase.isLoggedin  && ( <div className="btns custom:hidden w-[30%] flex gap-10 justify-end ">
               
               <Link to="/login"><button className="login-btn" type="submit">Login</button></Link>
               <Link to="/signup"> <button className="login-btn" type="submit">Sign Up</button>  </Link>  
            </div>)
            }
            {
              firebase.isLoggedin  && <div className="btns custom:hidden w-[30%] flex gap-10 justify-end ">
              <Dropdown/>
              <button className="login-btn" type="submit" onClick={handleLogout}>Logout</button>
              </div> 
            }
           
        </div>
  )
}

export default Header