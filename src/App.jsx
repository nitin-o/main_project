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
    console.log(userData)
    if (userData) {
      dispatch(login({userData}))
    }else{
      dispatch(logout())
    }
  })
  .finally(()=>(setLoading(false)))

}, [ dispatch]  )












 return(
 <>
   <div className=" w-full h-screen bg-amber-400 ">
    <Header />
    <div className=""><Outlet/></div>
  </div>
  <Footer/>
 </>
 )

}

export default App