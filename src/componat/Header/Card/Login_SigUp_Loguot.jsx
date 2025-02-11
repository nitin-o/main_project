import React, { useEffect ,useState } from "react"
import { useDispatch } from "react-redux"
import { login,logout} from "../../../store/authSlice"
import authService from "../../../appwrite/auth"



export default function Login_SigUp_Loguot() {

   



const [itIsLogout,setItIsLogout]=useState(false)
const dispatch = useDispatch()

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if (userData) {setItIsLogout(true)}else{setItIsLogout(false)}
  })
}, [ dispatch]  )

   

    const logoutHandler =()=>{  
        authService.logout().then(()=>(dispatch(logout())))}


    const login_Handler =()=>{  
        authService.logout().then(()=>(dispatch(logout())))}

    const sign_up_Handler =()=>{  
        authService.logout().then(()=>(dispatch(logout())))}






    return  !itIsLogout ? (<>
     <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
     onClick={login_Handler}
     >Login</a>
     <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
     onClick={sign_up_Handler}
     >Sign up</a>
    
    
    </>):(<a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    onClick={logoutHandler}>Logout</a>)
    
}

