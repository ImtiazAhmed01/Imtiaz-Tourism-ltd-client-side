// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../Provider/authProvider';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styles are included

// const ManageStories = () => {
//     const [stories, setStories] = useState([]);
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();


//     const fetchStories = async () => {
//         try {
//             console.log('Fetching stories for email:', user?.email);
//             const response = await fetch(`https://imtiaztourismltdd.vercel.app/stories?email=${user?.email}`, {
//                 method: 'GET',
//             });

//             console.log('Fetch response status:', response.status);
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Fetched stories:', data.stories);
//                 setStories(data.stories || []);
//             } else {
//                 console.error('Failed to fetch stories, status:', response.status);
//                 toast.error('Failed to fetch stories');
//             }
//         } catch (error) {
//             console.error('Error fetching stories:', error);
//             toast.error('Error fetching stories');
//         }
//     };


//     useEffect(() => {
//         if (user?.email) {
//             fetchStories();
//         } else {
//             console.warn('User email is undefined');
//         }
//     }, [user?.email]);

//     const handleEdit = (story) => {
//         console.log('Navigating with story:', story); // Debug log
//         navigate(`/edit-story/${story._id}`, { state: { story } });
//     };




//     const handleDelete = async (storyId) => {
//         try {
//             const response = await fetch(`https://imtiaztourismltdd.vercel.app/stories/${storyId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${user?.token}`,
//                 }
//             });

//             if (response.ok) {
//                 setStories(stories.filter(story => story._id !== storyId)); // Remove deleted story from state
//                 toast.success('Story deleted successfully');
//             } else {
//                 toast.error('Error deleting story');
//             }
//         } catch (error) {
//             console.error('Error deleting story:', error);
//             toast.error('Error deleting story');
//         }
//     };

//     // Remove image from story
//     const handleRemoveImage = async (storyId, imagePath) => {
//         try {
//             const response = await fetch(`https://imtiaztourismltdd.vercel.app/stories/remove-image`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Authorization': `Bearer ${user?.token}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ storyId, imagePath })
//             });

//             if (response.ok) {
//                 const updatedStory = await response.json();
//                 setStories(stories.map(story =>
//                     story._id === updatedStory._id ? updatedStory : story
//                 ));
//                 toast.success('Image removed successfully');
//             } else {
//                 toast.error('Error removing image');
//             }
//         } catch (error) {
//             console.error('Error removing image:', error);
//             toast.error('Error removing image');
//         }
//     };

//     return (
//         <div className="max-w-3xl mt-2 ml-72 p-6 bg-[#008080] text-white rounded-lg shadow-lg">
//             <ToastContainer />
//             <h2 className="text-3xl font-semibold text-center mb-4">Manage Your Stories</h2>
//             <div className="grid grid-cols-1 gap-4">
//                 {stories.map((story) => (
//                     <div key={story._id} className="bg-white text-black p-4 rounded-lg shadow-md">
//                         <h3 className="text-xl font-semibold">{story.title}</h3>
//                         <p>{story.text}</p>

//                         <div className="grid grid-cols-2 gap-2 mt-4">
//                             {story.images && story.images.map((image, index) => (
//                                 <div key={index} className="relative">
//                                     <img
//                                         src={image}
//                                         alt={`Story image ${index + 1}`}
//                                         className="w-full h-32 object-cover rounded-md"
//                                     />
//                                     <button
//                                         className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
//                                         onClick={() => handleRemoveImage(story._id, image)}
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>


//                         <div className="mt-4">
//                             <button
//                                 className="bg-indigo-600 text-white px-4 py-2 rounded-md mr-2"
//                                 onClick={() => handleEdit(story)}
//                             >
//                                 Edit
//                             </button>

//                             <button
//                                 className="bg-red-600 text-white px-4 py-2 rounded-md"
//                                 onClick={() => handleDelete(story._id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ManageStories;

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/authProvider';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styles are included

const ManageStories = () => {
    const [stories, setStories] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchStories = async () => {
        try {
            const response = await fetch(
                `https://imtiaztourismltdd.vercel.app/stories?email=${user?.email}`,
                { method: 'GET' }
            );
            if (response.ok) {
                const data = await response.json();
                setStories(data.stories || []);
            } else {
                toast.error('Failed to fetch stories');
            }
        } catch (error) {
            toast.error('Error fetching stories');
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchStories();
        }
    }, [user?.email]);

    const handleEdit = (story) => {
        navigate(`/edit-story/${story._id}`, { state: { story } });
    };

    const handleDelete = async (storyId) => {
        try {
            const response = await fetch(
                `https://imtiaztourismltdd.vercel.app/stories/${storyId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );
            if (response.ok) {
                setStories(stories.filter((story) => story._id !== storyId));
                toast.success('Story deleted successfully');
            } else {
                toast.error('Error deleting story');
            }
        } catch (error) {
            toast.error('Error deleting story');
        }
    };

    const handleRemoveImage = async (storyId, imagePath) => {
        try {
            const response = await fetch(
                `https://imtiaztourismltdd.vercel.app/stories/remove-image`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ storyId, imagePath }),
                }
            );
            if (response.ok) {
                const updatedStory = await response.json();
                setStories((prevStories) =>
                    prevStories.map((story) =>
                        story._id === updatedStory._id ? updatedStory : story
                    )
                );
                toast.success('Image removed successfully');
            } else {
                toast.error('Error removing image');
            }
        } catch (error) {
            toast.error('Error removing image');
        }
    };

    return (
        <div className="max-w-full sm:max-w-3xl mt-2 mx-auto ml-4 p-4 sm:p-6 bg-teal-600 text-white rounded-lg shadow-lg">
            <ToastContainer />
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
                Manage Your Stories
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {stories.map((story) => (
                    <div
                        key={story._id}
                        className="bg-white text-black p-4 rounded-lg shadow-md"
                    >
                        <h3 className="text-lg sm:text-xl font-semibold">{story.title}</h3>
                        <p className="text-sm sm:text-base">{story.text}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                            {story.images &&
                                story.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image}
                                            alt={`Story image ${index + 1}`}
                                            className="w-full h-32 sm:h-40 object-cover rounded-md"
                                        />
                                        <button
                                            className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full"
                                            onClick={() =>
                                                handleRemoveImage(story._id, image)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <button
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm sm:text-base rounded-md"
                                onClick={() => handleEdit(story)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm sm:text-base rounded-md"
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
