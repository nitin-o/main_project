import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import bucketService from "../appwrite/BucketService";
import databasesService from "../appwrite/DatabasesService";


export default function CreatePost() {
    const [image , setImage] = useState()
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm();
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate()

    // Watch for title changes to update slug dynamically
    const title = watch("title");

    useEffect(() => {
        if (title) {
            const slug = title.toLowerCase().replace(/\s+/g, '-');
            setValue("slug", slug);
        }
    }, [title, setValue]);

    const previewImage = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
    };

   const submit =async(data)=>{
       try{ 
        let file = null;

        // Upload image only if it exists
        if (data.image && data.image[0]) {
            file = await bucketService.uploadFile(data.image[0]);
        }else{
            console.log("bucketService.uploadFile(data.image[0]);   ");
            
        }
       
        
        if (file) {
            const userId = userData?.$id ?? "anonymous";
            data.image = file?.$id ?? "nitin"
            console.log(data.image);
            await databasesService.createPost(data.slug,{...data,userId})
            navigate("/")
           
        }}catch(error){
            console.error("Error while submitting post:", error);
        }
        
        
    
   }
    

    return (
        <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow-sm md:max-w-4xl w-full min-h-[400px] gap-3 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-6">
            {/* Form */}
            <form onSubmit={handleSubmit(submit)} className="w-full flex gap-3">
                {/* Image Upload Section */}
                <div className="flex flex-col items-center bg-amber-400 text-center w-3/5 min-h-[400px] rounded-lg p-4">
                    <input
                        {...register("image")}
                        type="file"
                        accept="image/*"
                        onChange={previewImage}
                        className="mb-2 bg-indigo-600 text-center"
                    />
                    {image && <img src={image} alt="Preview" className="object-cover w-full h-full rounded-lg" />}
                </div>

                {/* Form Section */}
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="h-full">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            type="text"
                            id="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter title"
                        />

                        <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Slug</label>
                        <input
                            {...register("slug")}
                            type="text"
                            id="slug"
                            placeholder="Enter slug"
                            disabled={true}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        />

                        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                        <textarea
                            {...register("content")}
                            id="content"
                            placeholder="Enter your content here..."
                            rows="4"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-2"
                        />

                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
