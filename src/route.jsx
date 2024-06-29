import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtpVerify from "./pages/VerifyPage"
import Login from './pages/login';
import Home from "./layouts/homePage";
import SignUp from './pages/SignUp';
const Routess = () => {
  return (
    <BrowserRouter>
    <Routes>
      
    <Route  path="/" element={<Login /> } />
          <Route path="Verification" element={<OtpVerify />} />
          <Route path="home" element={<Home />} />
          <Route path="signup" element={<SignUp />} />


    </Routes>
    </BrowserRouter>
  )
}

export default Routess