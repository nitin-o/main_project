import React,{useId} from "react"
import { forwardRef } from "react"


const Input = React.forwardRef(function Input({
    type = "text",
    value,
    className ="",
    label,
    ...props},ref) {



        const id = useId()
        return (
            <div className='w-full'>
                {label && <label 
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' 
                htmlFor={id}>
                    {label}</label>

                   
                }
                <input
                type={type}
                className={`class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  ${className}`}
                ref={ref}
                {...props}
                id={id}
                />
            </div>
        )
    
})

export default Input