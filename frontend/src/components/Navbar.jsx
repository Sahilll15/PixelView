import React, { useEffect, useState } from "react";
import axios from 'axios'
import { CgProfile } from "react-icons/cg";
import {useNavigate} from 'react-router-dom'

function Navbar() {

    const signout=()=>{
        localStorage.removeItem('token')
        window.location.href='/'
    }

    const navigate=useNavigate()
    const [user,setUser]=useState(null)



    const getLoggedinUser=async(req,res)=>{
        try {
          const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/users/user`,{
              headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
              }
            }
            );
            console.log(response.data)
            setUser(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getLoggedinUser()
    },[])

  return (
    <div className="relative">
    <nav className=" bg-purple-500 py-4 mt-10 mx-10 rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div onClick={()=>{
            navigate('/')
          }} className="flex items-center" >
            <h1 className="text-white text-2xl font-semibold">PixelView</h1>
          </div>
          <div className="flex items-center">
            <a onClick={signout} className="text-white text-2xl font-bold  hover:text-white px-3 py-2">
              Logout
            </a>
    
            <a onClick={()=>{
                navigate(`/profile`)
            }} className="text-white font-bold hover:text-white px-3 py-2 w-10 text-xl ">
            <CgProfile />
            </a>

          </div>
        </div>
      </div>
    </nav>
   
  </div>
  
  );
}

export default Navbar;