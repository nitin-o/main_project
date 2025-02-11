import React from "react";
import { useState, useEffect } from "react";
import { Header, LoginForm } from "./componat/indext";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login,logout } from "./store/authSlice";
import Login_Card_Page from "./componat/Card/Card";






function App() {


const [loading,setLoading]=useState(false)
const dispatch = useDispatch()

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
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

  
  </>
 )

}

export default App