import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/HomePage';
import Private from './components/Private';

function App() {
  return (
    <>
      <ToastContainer />
      <div className="px-16">
        <BrowserRouter> 
       
              <Routes>
              <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/" element={<Private />} >
                <Route path="/home" element={<HomePage />} />
              </Route>
              </Routes>
     
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
