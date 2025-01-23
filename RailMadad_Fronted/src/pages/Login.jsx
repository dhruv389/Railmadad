import React, { useRef, useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import { useFirebase } from '../firebase/firebase';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Login = () => {
    // const MySwal = withReactContent(Swal)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const formRef = useRef(null);
    const navigate = useNavigate();
const firebase = useFirebase();

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);
        try {
            
            const user=await signInWithEmailAndPassword(firebase.auth, email, password);
            
            const uid = user.user.uid;
            navigate("/dashboard/enquiry");
            // Swal.fire("You are Login!");

           
              Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });
            console.log(uid);
            console.log(user)
        } catch (error) {
            // setError(error.message);
            Toast.fire({
                icon: "error",
                title: "Please enter correct email and password"
              });
            console.log(error);     
        }
       
    };
    
    return (
        <div className="flex justify-center custom:pb-20 custom:pt-10 custom:h-auto flex-col items-center h-screen bg-gray-200">
  <div className="font-bold text-[2rem]">Login</div>

            {/* <div className="bg-white p-16 rounded-lg shadow-2xl w-2/3">
                <h2 className="text-3xl font-bold mb-10 text-center">Login</h2>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 py-3 rounded-lg text-white shadow-xl hover:bg-blue-700">Login</button>
                </form>
            </div> */}


            <div className="w-[75%] custom:py-5 custom:gap-6 h-[80%] custom:w-[95%] custom:flex-col rounded-tl-[35px] rounded-br-[35px] px-10 bg-white flex justify-between items-center">
                <div className=" w-[40%] custom:max-h-[10rem] custom:w-full flex justify-between items-center  h-full rounded-tl-[35px] rounded-br-[35px]">
 <img src="https://i.pinimg.com/736x/57/3d/2c/573d2c37c1530f3f2159f025f0626dc0.jpg" alt="" className='h-[94%] w-full object-cover rounded-tl-[35px] custom:max-h-[10rem] rounded-br-[35px]' />
                </div>
                <div className="w-[55%] custom:w-full  flex justify-center items-center flex-col h-[95%]">
                <form ref={formRef} onSubmit={handleSubmit} className='w-[97%]'>
                    <div className="mb-5  ">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full border-2 p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 py-3 rounded-lg text-white shadow-xl hover:bg-blue-700">Login</button>
                </form>
                </div>
            </div>

        </div>
    )
}

export default Login