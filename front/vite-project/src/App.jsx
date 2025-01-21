import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from "./views/Home/Home";
import Login from './views/Login/Login';
import MisTurnos from "./views/MisTurnos/MisTurnos";
import AboutUs from './views/AboutUs/AboutUs';
import ContactUs from './views/ContactUs/ContactUs';
import Register from './views/Register/Register';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const location = useLocation();
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && location.pathname !== '/register') {
        navigate("/login");
    }
}, [user, navigate, location.pathname]);

  return (
    <>
    {location.pathname === "/login" || location.pathname === "/register" ? null: <NavBar/>}
    <div>
      <Routes>
        <Route path="/appointments" element={<MisTurnos/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
      </Routes>
    </div>
    {location.pathname === "/login" || location.pathname === "/register" ? null: <Footer/>}
    <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
      />
    </>
  )
}

export default App
