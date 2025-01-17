import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PackageDetails = () => {
    const { id } = useParams();
    const [packageDetails, setPackageDetails] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/ourpackages/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // Verify fetched data
                setPackageDetails(data);
            })
            .catch((error) => console.error("Error fetching package details:", error));
    }, [id]);

    if (!packageDetails) {
        return <div>Loading...</div>;
    }

    return (
        <section className="package-details-section py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">{packageDetails.name}</h2>
                <div className="flex flex-col md:flex-row items-center">
                    <img
                        src={packageDetails.image}
                        alt={packageDetails.name}
                        className="w-full md:w-1/2 rounded-md"
                    />
                    <div className="md:ml-8">
                        <p className="text-gray-700 mt-4">{packageDetails.description}</p>
                        <p className="text-lg font-semibold text-[#3F0113] mt-4">
                            Price: ${packageDetails.price}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PackageDetails;
