import { Navigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { useFirebase  } from '../firebase/firebase';  // Import useAuth
import { AuthContext } from '../Context/userContext.jsx';  // Import useAuth
import Loader from '../components/Loader.jsx';

const PrivateRoute = ({ children }) => {
    const { adminData,staffData,superAdminData ,isLoading, setIsLoading} = useContext(AuthContext);
    const location = useLocation(); 
  const { user} = useFirebase();

const User=user;

  const isAdminRoute = location.pathname.startsWith('/admindashboard');
  const isAdminLoginRoute = location.pathname === '/adminlogin';
  const isStaffRoute = location.pathname.startsWith('/staffdashboard');
  const isStaffLoginRoute = location.pathname === '/stafflogin';
  const isUserLoginRoute = location.pathname.startsWith('/dashboard');
  const uii= location.pathname.startsWith('/login');
  const superAdminROute= location.pathname.startsWith('/superadmin');

  if (isAdminRoute) {
    return adminData ? children : <Navigate to="/adminlogin" replace />;
  }

  // Handle Admin Login
  if (isAdminLoginRoute) {
    return adminData ? <Navigate to="/admindashboard" replace /> : children;
  }

  // Handle Staff Routes
  if (isStaffRoute) {
    return staffData ? children : <Navigate to="/stafflogin" replace />;
  }

  // Handle Staff Login
  if (isStaffLoginRoute) {
    return staffData ? <Navigate to="/staffdashboard" replace /> : children;
  }
   
  if(uii) {
   
    if(isLoading) return <Loader/>;

    if(User) { 
      setIsLoading(false);
      return  children;}
  }



  if(isUserLoginRoute) {
  
    
  if(isLoading) return <Loader/>;
  console.log(user);
     if(user) {
     
      return  children;}
     else return  <Navigate to="/login" replace />;
    
  }


  if(superAdminROute) {
    
    return superAdminData ? children : <Navigate to="/superadminauth" replace />;
  }

  // Handle General User Routes
 // return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;