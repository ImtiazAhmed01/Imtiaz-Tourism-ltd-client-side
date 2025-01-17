import React, { useEffect, useState } from 'react';
import { FacebookShareButton } from 'react-share';
import { useNavigate } from 'react-router-dom';

const TouristStorySection = ({ isLoggedIn }) => {
    const [stories, setStories] = useState([]);
    const navigate = useNavigate();

    // Fetch random stories from the backend
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('https://localhost:5000/stories/random'); // Replace with your backend API URL
                const data = await response.json();
                // Randomize and select 4 stories
                const randomStories = data.sort(() => 0.5 - Math.random()).slice(0, 4);
                setStories(randomStories);
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };

        fetchStories();
    }, []);

    // Handle share button click
    const handleShare = (storyUrl) => {
        if (!isLoggedIn) {
            navigate('/login'); // Redirect to login if the user is not logged in
        }
    };

    return (
        <div className="tourist-story-section p-6">
            <h2 className="text-2xl font-bold mb-4">Tourist Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stories.map((story) => (
                    <div key={story.id} className="story-card bg-white rounded shadow p-4">
                        <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h3 className="text-lg font-bold">{story.title}</h3>
                        <p className="text-sm text-gray-700 mt-2">{story.text.substring(0, 100)}...</p>
                        <div className="mt-4 flex items-center justify-between">
                            <FacebookShareButton
                                url={story.image} // Use the relevant story URL or content URL
                                quote={story.title}
                                onClick={() => handleShare(story.image)}
                            >
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Share on Facebook
                                </button>
                            </FacebookShareButton>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                    onClick={() => navigate('/all-stories')}
                >
                    All Stories
                </button>
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                    onClick={() => navigate('/add-stories')}
                >
                    Add Stories
                </button>
            </div>
        </div>
    );
};

export default TouristStorySection;
