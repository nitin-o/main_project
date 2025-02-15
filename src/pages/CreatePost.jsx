import React, { useCallback,useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import service from "../appwrite/config";



export default function CreatePost({post}) {
    const navigate=useNavigate();
    const userData=useSelector((state)=>(state.auth.userData));

    const {register,handleSubmit,watch,setValue,getValues,control}=useForm({
        defaultValues:{
            title :post?.title || "",
            sulg :post?.sulg || "",
            content :post?.content || "",
            status :post?.status || "active"
        }
    })



    const submit = async(data)=>{

            const file= data.image[0] ? (await service.uploadFile(data.image)):null
            if (file){
                    const fileId =file.$id
                    data.featuredImage = fileId
                    const dbpost = await service.createPost(
                        {...data,
                            userId:userData.$id})
                    if(dbpost){
                        navigate(`/post/${dbpost.$id}`)
                    }
                }
            }
    
    const urlTransfor =useCallback((value)=>{
        if (value && typeof value=== "string") {
            return value
            .trim()
            .toLowerCase()
            .replace(/\s/g,"-")
        }
        return ' '
    });


    const [imageUrl, setImageUrl] = useState("");

    const handleImageChange = (e) => {
        setImageUrl(e.target.value);}



    return (
        <div className="w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Create Post</h2>
            <form className="space-y-4">
                {/* Grid for Inputs */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Left Box (Image Preview & Input) */}
                    <div className="p-4 bg-blue-200 shadow-lg rounded-lg flex flex-col items-center">
                        {imageUrl && (
                            <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2" />
                        )}
                        <input
                            type="text"
                            name="featuredImage"
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={handleImageChange}
                            className="w-full p-2 rounded border"
                        />
                    </div>

                    {/* Right Box (Slug & Title) */}
                    <div className="p-4 bg-green-200 shadow-lg rounded-lg flex flex-col gap-2">
                        <input name="slug" placeholder="Slug" className="w-full p-2 rounded border" />
                        <input name="title" placeholder="Title" required className="w-full p-2 rounded border" />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Post
                </button>
            </form>
        </div>
    );
}