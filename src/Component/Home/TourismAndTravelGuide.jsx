import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const TourismAndTravelGuide = () => {
    const [packages, setPackages] = useState([]);
    const [guides, setGuides] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/ourpackages')
            .then((res) => res.json())
            .then((data) => setPackages(data))
            .catch((error) => console.error("Error fetching packages:", error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/tourguides`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // Log data to verify response
                setGuides(data);
            })
            .catch((error) => console.error("Error fetching guide details:", error));
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
                    </TabPanel>

                    {/* Meet Our Tour Guides Tab */}
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {guides.map((guide) => (
                                <div
                                    key={guide._id}
                                    className="guide-card bg-white shadow-lg rounded-lg p-4"
                                >
                                    <img
                                        src={guide.img}
                                        alt={guide.name}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <h3 className="text-xl font-bold mt-4">{guide.name}</h3>
                                    <p><strong>Age:</strong> {guide.age}</p>
                                    <p><strong>Gender:</strong> {guide.gender}</p>
                                    <p><strong>Languages:</strong> {guide.language.join(', ')}</p>
                                    <p><strong>Experience:</strong> {guide.experience}</p>
                                    <p><strong>Specialty:</strong> {guide.specialty}</p>
                                    <p><strong>Rating:</strong> {guide.rating} ⭐</p>
                                    <p><strong>Availability:</strong> {guide.availability}</p>
                                    <button
                                        onClick={() => navigate(`/guideProfile/${guide._id}`)}
                                        className="mt-4 px-4 py-2 bg-[#FFA500] text-white rounded-lg hover:bg-[#3F0113] hover:text-[#FFA500] transition"
                                    >Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    );
};

export default TourismAndTravelGuide;
