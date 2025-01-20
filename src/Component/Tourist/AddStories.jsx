import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To redirect after submission
import { AuthContext } from '../Provider/authProvider';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styles are included

const AddStories = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [images, setImages] = useState([]);
    const [userRole, setUserRole] = useState('Tourist');
    const navigate = useNavigate();

    const { user } = useContext(AuthContext)
    const handleImageChange = (e) => {
        const files = e.target.files;
        setImages([...images, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        formData.append('userImage', user?.photoURL || '');
        formData.append('userName', user?.displayName || '');
        formData.append('email', user?.email || '');
        formData.append('userRole', userRole);
        formData.append('shareCount', 0); // Default 0
        formData.append('reactCount', 0); // Default 0

        images.forEach((image) => {
            formData.append('images', image);
        });

        // Log form data to check its contents
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await fetch('http://localhost:5000/stories/add', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('Story added successfully!');
                navigate('/manage-stories');
            } else {
                console.error('Error adding story');
                toast.error('Error adding story');
            }
        } catch (error) {
            console.error('Error submitting story:', error);
            toast.error('Error submitting story');
        }
    };


    return (
        <div className="max-w-3xl mt-2 ml-72 p-6 bg-[#008080] text-white rounded-lg shadow-lg">
            <ToastContainer /> {/* ToastContainer placed inside AddStories component */}
            <h2 className="text-3xl font-semibold text-center mb-4">Add Your Story</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg font-medium text-white mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="text" className="text-lg font-medium text-white mb-2">Story Text</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className="px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y h-28"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="images" className="text-lg font-medium text-white mb-2">Upload Images</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        onChange={handleImageChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="userImage" className="text-lg font-medium text-white mb-2">User Image URL</label>
                        <input
                            type="text"
                            value={user?.photoURL || ""}
                            readOnly
                            className="w-full border rounded-md p-2 text-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="userName" className="text-lg font-medium text-white mb-2">Your Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="w-full border rounded-md p-2 text-black"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-lg font-medium text-white mb-2">Your Email</label>
                        <input
                            type="text"
                            value={user?.email || ""}
                            readOnly
                            className="w-full border rounded-md p-2 text-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="userRole" className="text-lg font-medium text-white mb-2">User Role</label>
                        <select
                            id="userRole"
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                            className="px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="Tourist" className='text-black'>Tourist</option>
                            <option value="Guide" className='text-black'>Guide</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit Story
                </button>
            </form>
        </div>
    );
};

export default AddStories;
