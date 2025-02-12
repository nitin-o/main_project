import React, { useEffect ,useState } from "react"
//import { useDispatch } from "react-redux"
import {logout} from "../../../store/authSlice"
import authService from "../../../appwrite/auth"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Login_SigUp_Loguot() {

  const authStatus = useSelector((state)=>((state.auth.status)))
  const dispatch = useDispatch();
  
 const naviget = useNavigate()




   

    const logoutHandler =()=>{ 
      console.log('login_Handler') 
        authService.logout().then(()=>(dispatch(logout())))
        naviget("/")
        }



    const login_Handler =()=>{
      naviget("/login")
      console.log('login_Handler')
       }

    const sign_up_Handler =()=>{  
      naviget("/sign_up")
      console.log('sign_up_Handler')
        }






    return  !authStatus ? (<>
     <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-3 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
     onClick={login_Handler}
     >Login</a>
     <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
     onClick={sign_up_Handler}
     >Sign up</a>
    
    
    </>):(<a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    onClick={logoutHandler}>Logout</a>)
    
}

