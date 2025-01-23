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
        { path: "dashboard/*", element: <Dashboard /> },
       
        { path: "getowncomplaints", element: <UserComplaints/> },
        { path: "admindashboard", element: <AdiminDashboard/> },
        { path: "staffdashboard", element: <StaffDashboard/> },
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
