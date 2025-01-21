import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/authProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styles are included

const ManageStories = () => {
    const [stories, setStories] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Fetch user's stories when the component is mounted
    const fetchStories = async () => {
        try {
            console.log('Fetching stories for email:', user?.email); // Log user email
            const response = await fetch(`http://localhost:5000/stories?email=${user?.email}`, {
                method: 'GET',
            });

            console.log('Fetch response status:', response.status); // Log response status
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched stories:', data.stories); // Log fetched stories
                setStories(data.stories || []);
            } else {
                console.error('Failed to fetch stories, status:', response.status); // Log failure details
                toast.error('Failed to fetch stories');
            }
        } catch (error) {
            console.error('Error fetching stories:', error); // Log any error
            toast.error('Error fetching stories');
        }
    };


    useEffect(() => {
        if (user?.email) {
            fetchStories();
        } else {
            console.warn('User email is undefined');
        }
    }, [user?.email]);

    const handleEdit = (story) => {
        console.log('Navigating with story:', story); // Debug log
        navigate(`/edit-story/${story._id}`, { state: { story } });
    };




    const handleDelete = async (storyId) => {
        try {
            const response = await fetch(`http://localhost:5000/stories/${storyId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                }
            });

            if (response.ok) {
                setStories(stories.filter(story => story._id !== storyId)); // Remove deleted story from state
                toast.success('Story deleted successfully');
            } else {
                toast.error('Error deleting story');
            }
        } catch (error) {
            console.error('Error deleting story:', error);
            toast.error('Error deleting story');
        }
    };

    // Remove image from story
    const handleRemoveImage = async (storyId, imagePath) => {
        try {
            const response = await fetch(`http://localhost:5000/stories/remove-image`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user?.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ storyId, imagePath })
            });

            if (response.ok) {
                const updatedStory = await response.json();
                setStories(stories.map(story =>
                    story._id === updatedStory._id ? updatedStory : story
                ));
                toast.success('Image removed successfully');
            } else {
                toast.error('Error removing image');
            }
        } catch (error) {
            console.error('Error removing image:', error);
            toast.error('Error removing image');
        }
    };

    return (
        <div className="max-w-3xl mt-2 ml-72 p-6 bg-[#008080] text-white rounded-lg shadow-lg">
            <ToastContainer />
            <h2 className="text-3xl font-semibold text-center mb-4">Manage Your Stories</h2>
            <div className="grid grid-cols-1 gap-4">
                {stories.map((story) => (
                    <div key={story._id} className="bg-white text-black p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{story.title}</h3>
                        <p>{story.text}</p>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {story.images && story.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt={`Story image ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                    <button
                                        className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
                                        onClick={() => handleRemoveImage(story._id, image)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>


                        <div className="mt-4">
                            <button
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md mr-2"
                                onClick={() => handleEdit(story)}
                            >
                                Edit
                            </button>

                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md"
                                onClick={() => handleDelete(story._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageStories;
