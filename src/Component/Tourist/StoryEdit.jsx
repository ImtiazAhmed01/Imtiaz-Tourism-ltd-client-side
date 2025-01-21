import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const StoryEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { storyId } = useParams();
    const [story, setStory] = useState(location.state?.story || { title: '', text: '', images: [] });


    useEffect(() => {
        if (!location.state?.story && storyId) {
            console.log('Fetching story by ID:', storyId);
            fetch(`http://localhost:5000/stories/${storyId}`)
                .then((response) => {
                    console.log('Fetch response status:', response.status); // Log response status
                    return response.json();
                })
                .then((data) => {
                    console.log('Fetched story data:', data); // Log the fetched story data
                    setStory(data);
                })
                .catch((error) => {
                    console.error('Error fetching story:', error); // Log any error that occurs
                });
        } else {
            console.log('Using story from location state:', location.state?.story); // Log story from location state
        }
    }, [location.state, storyId]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStory((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log('Updating story with:', story);
            const response = await fetch(`http://localhost:5000/stories/${story._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(story),
            });

            const responseData = await response.json();
            console.log('Update response:', response.status, responseData);

            if (response.ok) {
                toast.success('Story updated successfully');
                navigate('/manage-stories');
            } else {
                console.error('Error response:', responseData);
                toast.error(responseData.message || 'Failed to update story');
            }
        } catch (error) {
            console.error('Error during story update:', error);
            toast.error('Error updating story');
        }
    };





    const handleRemoveImage = (imagePath) => {
        setStory((prev) => ({
            ...prev,
            images: prev.images.filter((image) => image !== imagePath),
        }));
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Edit Story</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label htmlFor="title" className="block font-semibold mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={story.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="text" className="block font-semibold mb-1">
                        Text
                    </label>
                    <textarea
                        id="text"
                        name="text"
                        value={story.text}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Images</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {story.images.map((image, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={image}
                                    alt={`Story image ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    onClick={() => handleRemoveImage(image)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Update Story
                </button>
            </form>
        </div>
    );
};

export default StoryEdit;
