import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllTripsPage = () => {
    const [packages, setPackages] = useState([]);
    const [sortedPackages, setSortedPackages] = useState([]);
    const [sortOrder, setSortOrder] = useState('default'); // 'asc', 'desc', 'default'
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://imtiaztourismltdd.vercel.app/ourpackages/allpackages')
            .then((res) => res.json())
            .then((data) => {
                setPackages(data);
                setSortedPackages(data);
            })
            .catch((error) => console.error("Error fetching packages:", error));
    }, []);

    // Sorting function
    const handleSortChange = (order) => {
        setSortOrder(order);
        let sortedData = [...packages];

        if (order === 'asc') {
            sortedData.sort((a, b) => a.price - b.price);
        } else if (order === 'desc') {
            sortedData.sort((a, b) => b.price - a.price);
        } else {
            sortedData = [...packages]; // Reset to original order
        }

        setSortedPackages(sortedData);
    };

    return (
        <section className="all-trips-section py-16 ">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">All Trips</h2>

                {/* Sorting Dropdown */}
                <div className="flex justify-end mb-4">
                    <select
                        className="px-4 py-2 border rounded-md shadow-sm"
                        value={sortOrder}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="default">Sort By</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>

                {/* Display Sorted Packages */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedPackages.map((pkg) => (
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
                            <p className="text-gray-700 mt-2">{pkg.tourtype}</p>
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
