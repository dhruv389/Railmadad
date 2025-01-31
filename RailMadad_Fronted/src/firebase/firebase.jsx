

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { AuthContext } from '../Context/userContext.jsx';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvPL0E9y5OQD5xsun212IqPO38PoDFNs0",
  authDomain: "complaint-management-sys-87685.firebaseapp.com",
  projectId: "complaint-management-sys-87685",
  storageBucket: "complaint-management-sys-87685.appspot.com",
  messagingSenderId: "524004505175",
  appId: "1:524004505175:web:32be91e3b5e768891dd512",
  measurementId: "G-K0W7P2VWNW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create context for Firebase
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// Firebase Provider component
export const FirebaseProvider = ({ children }) => {
  const { isLoading, setIsLoading} = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [useruid, setuseruid] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user.uid);
      if (user) {
        setUser(user);
        setuseruid(user.uid);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const isLoggedin = !!user;
  if(user) setIsLoading(false);

  return (
    <FirebaseContext.Provider value={{ isLoggedin,app,auth, user, useruid }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { app, auth };

