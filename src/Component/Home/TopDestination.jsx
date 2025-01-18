import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const TopDestination = () => {
    const navigate = useNavigate();
    const destinations = [
        {
            id: 1,
            name: "Sundarbans Mangrove Forest",
            image: "https://i.ibb.co.com/8mVXXHH/ev-ert5t-n5.jpg",
            description: "Explore the world's largest mangrove forest.",
        },
        {
            id: 2,
            name: "Cox's Bazar Beach",
            image: "https://i.ibb.co.com/ZW5HjWy/What-are-the-most-unique-things-to-do-in-Coxs-Bazar.jpg",
            description: "Enjoy the serene beauty of the world's longest beach.",
        },
        {
            id: 3,
            name: "Bandarban Hills",
            image: "https://i.ibb.co.com/6XrkwLf/maxresdefault.jpg",
            description: "Witness the majestic hills and waterfalls.",
        },
    ];
    return (
        <div className='px-16'>
            <section className="top-destinations p-8 bg-gray-100 justify-center">
                <h2 className="text-3xl font-bold mb-6 text-center">Top Destinations</h2>
                <div className="flex overflow-x-auto space-x-6" onClick={() => navigate('/alltirpspages')}>
                    {destinations.map((destination) => (
                        <motion.div
                            key={destination.id}
                            className="destination-card flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img
                                src={destination.image}
                                alt={destination.name}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h3 className="text-xl font-bold mt-4">{destination.name}</h3>
                            <p className="text-gray-700 mt-2">{destination.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TopDestination;