import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TourismAndTravelGuide = () => {
    const [packages, setPackages] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
        // Fetch random packages from the backend
        fetch('http://localhost:5000/ourpackages')
            .then((res) => res.json())
            .then((data) => setPackages(data))
            .catch((error) => console.error("Error fetching packages:", error));
    }, []);

    return (
        <section className="tourism-section py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">Tourism and Travel Guide</h2>
                <Tabs>
                    <TabList>
                        <Tab>Our Packages</Tab>
                        <Tab>Meet Our Tour Guides</Tab>
                    </TabList>

                    {/* Our Packages Tab */}
                    <TabPanel>
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
                                        // onClick={() => navigate(`/packages/${pkg._id}`)}
                                        className="mt-4 px-4 py-2 bg-[#FFA500] text-white rounded-lg hover:bg-[#3F0113] hover:text-[#FFA500] transition"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </TabPanel>


                    {/* Meet Our Tour Guides Tab */}
                    <TabPanel>
                        <div className="guide-section text-center">
                            <h3 className="text-2xl font-bold mb-4">Meet Our Top-Class Tour Guides</h3>
                            <p className="text-lg text-gray-600 mb-8">
                                Our experienced guides ensure a seamless and enjoyable travel experience.
                            </p>
                            <div className="flex justify-center items-center flex-wrap gap-8">
                                {/* Sample guide cards */}
                                <div className="guide-card bg-white shadow-lg rounded-lg p-4">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Guide Name"
                                        className="w-32 h-32 object-cover rounded-full mx-auto"
                                    />
                                    <h4 className="text-xl font-bold mt-4">Guide Name</h4>
                                    <p className="text-gray-700">Specialty: Historical Tours</p>
                                </div>
                                <div className="guide-card bg-white shadow-lg rounded-lg p-4">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="Guide Name"
                                        className="w-32 h-32 object-cover rounded-full mx-auto"
                                    />
                                    <h4 className="text-xl font-bold mt-4">Guide Name</h4>
                                    <p className="text-gray-700">Specialty: Cultural Experiences</p>
                                </div>
                                {/* Add more guides as needed */}
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    );
};

export default TourismAndTravelGuide;
