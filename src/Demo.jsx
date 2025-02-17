import React, { useState } from 'react';
import { useSelector } from "react-redux";
import DatabasesService from './appwrite/DatabasesService'; // Assuming the Service is in services folder

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const userId1 = useSelector((state) => state.auth.userData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when submitting the form
        setError('');
        setSuccess('');
        
        try {
            const userId = userId1?.$id ?? "defaultUserId";
            console.log(userId);

            const response = await DatabasesService.createPost({ title, userId });
            setSuccess('Post created successfully!');
            setTitle('');
        } catch (err) {
            setError('Error creating post: ' + err.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="create-post">
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Post Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Post...' : 'Create Post'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default CreatePost;
