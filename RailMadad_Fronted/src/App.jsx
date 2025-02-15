import "./App.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from "./components/Layout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserComplaints from "./pages/UserComplaints";
import AdiminDashboard from "./pages/AdiminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import SuperAdmin from "./pages/SuperAdmin";
import PrivateRoute from "./pages/PrivateRoute";
import Stepper from "./pages/Stepper";
import AdminLogin from "./pages/AdminLogin";
import StaffLogin from "./pages/StaffLogin";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp/> },
        // { path: "dashboard/*", element: <Dashboard /> },
       
        { path: "getowncomplaints", element: <UserComplaints/> },
        { path: "superadminauth", element: <Stepper/> },
        // { path: "admindashboard", element: <AdiminDashboard/> },
        // { path: "staffdashboard", element: <StaffDashboard/> },

        {
          path: 'admindashboard',
          element: (
            <PrivateRoute>
             <AdiminDashboard/>
            </PrivateRoute>
          ),
        },


        {
          path: 'staffdashboard',
          element: (
            <PrivateRoute>
             <StaffDashboard/>
            </PrivateRoute>
          ),
        },

        
        {
          path: 'dashboard/*',
          element: (
            <PrivateRoute>
            <Dashboard />
            </PrivateRoute>
          ),
        },

        {
          path: 'superadmin',
          element: (
            <PrivateRoute>
            <SuperAdmin/> 
            </PrivateRoute>
          ),
        },

        


     
        { path: "adminlogin", element: <AdminLogin/> },
        { path: "stafflogin", element: <StaffLogin/> }

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
