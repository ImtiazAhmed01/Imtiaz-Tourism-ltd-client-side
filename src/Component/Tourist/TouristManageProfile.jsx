import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const TouristManageProfile = () => {
    const [user, setUser] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUser(data[0]);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, []);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSave = () => {
        const { email, userRole, ...editableData } = editedUser;
        fetch('/update-user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editableData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update user data');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                setEditModalOpen(false);
            })
            .catch((error) => {
                console.error('Error updating user data:', error.message);
            });
    };

    return (
        <div className="p-6">
            <div className="text-center font-sans">
                <h1 className="text-2xl text-gray-700 mb-8 animate-slide-in">
                    Welcome to the Tourist Guide,{' '}
                    <span className="font-semibold">{user ? user.fullName : 'Loading...'}</span>! We're thrilled to
                    have you with us.As one of the best tourism platforms, we are committed to providing you with unforgettable experiences and detailed travel information about Bangladesh. Our goal is to ensure that every step of your journey is smooth, enjoyable, and filled with enriching experiences. We're here to guide you every step of the way, so you can make the most out of your travels. Let's explore together!
                </h1>

                <div className="flex justify-center items-center mt-8">
                    <img
                        src={user?.photoURL || 'https://via.placeholder.com/150'}
                        alt="User profile"
                        className="w-36 h-36 rounded-lg object-cover border-4 border-gray-700 transition-transform hover:scale-105 mr-8"
                    />
                    <div className="text-left text-gray-600">
                        <p>
                            <strong className="text-red-500">Name:</strong> {user?.fullName || 'N/A'}
                        </p>
                        <p>
                            <strong className="text-red-500">Role:</strong> {user?.userRole || 'Tourist'}
                        </p>
                        <p>
                            <strong className="text-red-500">Joined:</strong> {user?.registrationDate || 'N/A'}
                        </p>
                        <p>
                            <strong className="text-red-500">Email:</strong> {user?.email || 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        className="btn btn-primary mr-4"
                        onClick={() => setEditModalOpen(true)}
                    >
                        Edit Profile
                    </button>
                    <button className="btn btn-success" onClick={() => Navigate('/dashboard/tourist/joinguide')}>Apply For Tour Guide</button>
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-center text-lg font-bold mb-4">Edit Profile</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editedUser.firstName || user?.firstName || ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedUser.lastName || user?.lastName || ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    value={editedUser.photoURL || user?.photoURL || ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleEditSave}
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-error"
                                    onClick={() => setEditModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TouristManageProfile;
