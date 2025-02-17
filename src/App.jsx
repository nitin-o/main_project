import React from "react";
import { useState, useEffect } from "react";
import {  Footer, Header } from "./componat/indext";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login,logout } from "./store/authSlice";
import { Outlet } from "react-router";



function App() {


const [loading,setLoading]=useState(false)
const dispatch = useDispatch()

useEffect(() => {
  authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData)); // Remove extra object wrapping
      } else {
        dispatch(logout());
      }
    })
    .finally(() => setLoading(true)); // Ensure loading is set to false
}, [dispatch]);

 return loading? (
 <>
   <div className=" w-full h-screen bg-amber-400 ">
    <Header />
     <div className=" flex justify-center items-center w-full h-screen bg-white border-gray-200 dark:bg-gray-900">
      <Outlet className= " bg-gray-500 w-full h-screen"/>
      </div>
    </div>
  
  <Footer/>
  
 </>

 ):( <div className="flex justify-center items-center h-screen bg-gray-900">
  <div className="text-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    <p className="mt-4 text-white text-lg">Loading, please wait...</p>
  </div>
</div>)

}

export default App

