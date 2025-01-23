import { useRef, useState } from "react"
import { auth } from "../firebase/firebase"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirebase } from '../firebase/firebase';
import { Navigate, redirect, useNavigate } from "react-router-dom";
const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const formRef = useRef(null);
    const navigate = useNavigate();

    const firebase = useFirebase();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);

        try {

            const user = await createUserWithEmailAndPassword(firebase.auth, email, password);
            // Handle successful sign-up (e.g., redirect to dashboard)
            console.log('Sign-up successful!');
            console.log(user)
            navigate('/login')
        } catch (error) {
            // setError(error.message);
            console.log(error);

        }

    };
    return (



        <div className="flex justify-center custom:pb-20 custom:pt-10 custom:h-auto flex-col items-center h-screen bg-gray-200">
            <div className="font-bold text-[2rem]">Sign Up</div>

            <div className="w-[75%] custom:py-5 custom:gap-6 h-[80%] custom:w-[95%] custom:flex-col rounded-tl-[35px] rounded-br-[35px] px-10 bg-white flex justify-between items-center">
                <div className=" w-[40%] custom:max-h-[10rem] custom:w-full flex justify-between items-center  h-full rounded-tl-[35px] rounded-br-[35px]">
                    <img src="https://i.pinimg.com/736x/19/a6/e1/19a6e107e5781a993303f586ec931f24.jpg" alt="" className='h-[94%] w-full object-cover rounded-tl-[35px] custom:max-h-[10rem] rounded-br-[35px]' />
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
                        <button type="submit" className="w-full bg-blue-500 py-3 rounded-lg text-white shadow-xl hover:bg-blue-700">Signup</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SignUp