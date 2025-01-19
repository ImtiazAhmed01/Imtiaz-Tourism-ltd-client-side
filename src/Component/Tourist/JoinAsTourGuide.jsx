import React, { useState } from 'react';

const JoinAsTourGuide = () => {
    const [applicationData, setApplicationData] = useState({
        title: '',
        reason: '',
        cvLink: '',
    });
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplicationData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission here (e.g., API call)
        setSuccessModalOpen(true);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Join as a Tour Guide</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-[#008080] p-6 rounded-lg shadow-md space-y-4"
            >
                <div>
                    <label className="block text-white font-medium mb-1">Application Title</label>
                    <input
                        type="text"
                        name="title"
                        value={applicationData.title}
                        onChange={handleChange}
                        placeholder="Enter application title"
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white font-medium mb-1">Why do you want to be a Tour Guide?</label>
                    <textarea
                        name="reason"
                        value={applicationData.reason}
                        onChange={handleChange}
                        placeholder="Explain why you want to be a tour guide"
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white font-medium mb-1">CV Link</label>
                    <input
                        type="url"
                        name="cvLink"
                        value={applicationData.cvLink}
                        onChange={handleChange}
                        placeholder="Enter CV link"
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        Submit Application
                    </button>
                </div>
            </form>

            {isSuccessModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Application Submitted Successfully!</h2>
                        <p className="text-gray-700 mb-6">We will review your application and get back to you soon.</p>
                        <button
                            onClick={() => setSuccessModalOpen(false)}
                            className="btn btn-success"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JoinAsTourGuide;
