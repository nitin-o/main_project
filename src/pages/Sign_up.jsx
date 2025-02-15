import React ,{useState ,useId, useEffect} from "react";
import { useForm} from "react-hook-form";
import authService from "../appwrite/auth";
import { Link , useNavigate} from "react-router";
import { login } from "../store/authSlice";
import { useDispatch,useSelector } from "react-redux";


export default function SignUp() {
    const navigate = useNavigate()
    const authStatus = useSelector((state)=>((state.auth.status)))
    useEffect(()=>{
        
            if (authStatus) {
                navigate("/")  
            }}
    ,[authStatus])


  

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
        } = useForm();
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        if(data.password.length >= 8){
                await  authService.createAccount(data)
                const userData = await authService.getCurrentUser();
                if (userData) {
                dispatch(login(userData));
                navigate("/");
                
            }
        }


   
    

  };

  return (

    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up for our platform</h5>
        <div>
            <label htmlFor="full-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input type="text" {...register("fullName", { required: true })} id="full-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" />
            {errors.fullName && <p class="text-red-500 text-xs mt-1">Full Name is required</p>}
        </div>
        <div>
            <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" {...register("email", { required: true })} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" />
            {errors.email && <p class="text-red-500 text-xs mt-1">Email is required</p>}
        </div>
        <div>
            <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" {...register("password", { required: true })} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
            {errors.password && <p class="text-red-500 text-xs mt-1">Password is required</p>}
        </div>
        <div class="flex items-start">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input id="terms" type="checkbox" {...register("terms",)} class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                </div>
                <label htmlFor="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to the terms and conditions</label>
            </div>
            {errors.terms && <p class="text-red-500 text-xs mt-1">You must agree to continue</p>}
        </div>
        <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account? <Link to="/login" class="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
        </div>
    </form>
</div>


  );
}



 






export  function SignUp2() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          
        />
        <label className="absolute text-sm text-gray-500">Email address</label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          
        />
        <label className="absolute text-sm text-gray-500">Password</label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          
        />
        <label className="absolute text-sm text-gray-500">Confirm Password</label>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            
          />
          <label className="absolute text-sm text-gray-500">First Name</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            
          />
          <label className="absolute text-sm text-gray-500">Last Name</label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            
          />
          <label className="absolute text-sm text-gray-500">Phone Number</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            
          />
          <label className="absolute text-sm text-gray-500">Company</label>
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
}
