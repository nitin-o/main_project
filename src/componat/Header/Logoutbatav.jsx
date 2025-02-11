import React from "react"
import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { Button } from "../indext"



function LogoutButton(params) {
    const dispatch = useDispatch()
    const logoutHandler =()=>{
        
        authService.logout().then(()=>(dispatch(logout())))

        
    }

    return(<Button 
        className=""
        onClick={logoutHandler}>Loguot</Button>)
    
}

export default LogoutButton