import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllTripsPage = () => {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all packages from the backend
        fetch('http://localhost:5000/ourpackages/allpackages')
            .then((res) => res.json())
            .then((data) => setPackages(data))
            .catch((error) => console.error("Error fetching packages:", error));
    }, []);

    return (
        <section className="all-trips-section py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">All Trips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className="package-card bg-white shadow-lg rounded-lg p-4"
                        >
                            <img
                                src={pkg.image}
                                alt={pkg.name}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <h3 className="text-xl font-bold mt-4">{pkg.name}</h3>
                            <p className="text-gray-700 mt-2">{pkg.description}</p>
                            <p className="text-lg font-semibold text-[#3F0113] mt-4">
                                Price: ${pkg.price}
                            </p>
                            <button
                                onClick={() => navigate(`/packages/${pkg._id}`)}
                                className="mt-4 px-4 py-2 bg-[#FFA500] text-white rounded-lg hover:bg-[#3F0113] hover:text-[#FFA500] transition"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllTripsPage;
