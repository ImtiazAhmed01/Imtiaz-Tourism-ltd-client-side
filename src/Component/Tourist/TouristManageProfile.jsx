// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Provider/authProvider';
// import AdminState from '../Admin/AdminState';

// const TouristManageProfile = () => {
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);
//     const [userData, setUserData] = useState(null);
//     const [isEditModalOpen, setEditModalOpen] = useState(false);
//     const [editedUser, setEditedUser] = useState({});

//     useEffect(() => {
//         const fetchUserData = async () => {
//             if (user?.email) {
//                 try {
//                     const response = await fetch(`https://imtiaztourismltdd.vercel.app/users?email=${user.email}`);
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch user data');
//                     }
//                     const data = await response.json(); // Direct object
//                     setUserData(data); // Set the user object directly
//                 } catch (error) {
//                     console.error('Error fetching user data:', error.message);
//                 }
//             } else {
//                 console.log('No email available to fetch data.');
//             }
//         };

//         fetchUserData();
//     }, [user]);
//     // Re-run if user changes

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditedUser((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleEditSave = () => {
//         const { email, userRole, ...editableData } = editedUser;
//         fetch('/update-user', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(editableData),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Failed to update user data');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setUserData(data);
//                 setEditModalOpen(false);
//             })
//             .catch((error) => {
//                 console.error('Error updating user data:', error.message);
//             });
//     };

//     if (!user) {
//         return <p>Loading user data...</p>;
//     }

//     return (
//         <div className="p-6">
//             <div className="text-center font-sans">
//                 <h1 className="text-2xl text-gray-700 mb-8 animate-slide-in">
//                     Welcome to the Imtiaz Tourism Ltd ,{' '}
//                     <span className="font-semibold">{userData ? userData.fullName : 'Loading...'}</span>!
//                 </h1>

//                 <div className="flex justify-center items-center mt-8">
//                     <img
//                         src={userData?.photoURL || 'https://via.placeholder.com/150'}
//                         alt="User profile"
//                         className="w-36 h-36 rounded-lg object-cover border-4 border-gray-700 transition-transform hover:scale-105 mr-8"
//                     />
//                     <div className="text-left text-gray-600">
//                         <p>
//                             <strong className="">Name:</strong> {userData?.fullName || 'N/A'}
//                         </p>
//                         <p>
//                             <strong className="text-red-500">Role:</strong> {userData?.userRole || 'Tourist'}
//                         </p>
//                         <p>
//                             <strong className="text-red-500">Joined:</strong> {userData?.registrationDate || 'N/A'}
//                         </p>
//                         <p>
//                             <strong className="text-red-500">Email:</strong> {userData?.email || 'N/A'}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <button
//                         className="btn btn-primary mr-4"
//                         onClick={() => setEditModalOpen(true)}
//                     >
//                         Edit Profile
//                     </button>
//                     {userData?.userRole !== 'Admin' && userData?.userRole !== 'Tour guide' && (
//                         <button className="btn btn-success" onClick={() => navigate('/dashboard/tourist/joinguide')}>
//                             Apply For Tour Guide
//                         </button>
//                     )}
//                 </div>
//             </div>
//             {userData?.userRole !== 'Tourist' && userData?.userRole !== 'Tour guide' && (
//                 <AdminState></AdminState>
//             )}

//             {isEditModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//                         <h2 className="text-center text-lg font-bold mb-4">Edit Profile</h2>
//                         <form className="space-y-4">
//                             <div>
//                                 <label className="block text-gray-700 font-medium mb-1">First Name</label>
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     value={editedUser.firstName || userData?.firstName || ''}
//                                     onChange={handleEditChange}
//                                     className="input input-bordered w-full"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 font-medium mb-1">Last Name</label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={editedUser.lastName || userData?.lastName || ''}
//                                     onChange={handleEditChange}
//                                     className="input input-bordered w-full"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 font-medium mb-1">Rols</label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={userData?.userRole}
//                                     readOnly
//                                     className="input input-bordered w-full"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 font-medium mb-1">Your Email</label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={userData?.email}
//                                     readOnly
//                                     className="input input-bordered w-full"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
//                                 <input
//                                     type="text"
//                                     name="photoURL"
//                                     value={editedUser.photoURL || userData?.photoURL || ''}
//                                     onChange={handleEditChange}
//                                     className="input input-bordered w-full"
//                                 />
//                             </div>
//                             <div className="flex justify-between mt-4">
//                                 <button
//                                     type="button"
//                                     className="btn btn-success"
//                                     onClick={handleEditSave}
//                                 >
//                                     Save Changes
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-error"
//                                     onClick={() => setEditModalOpen(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}


//         </div>
//     );
// };

// export default TouristManageProfile;



import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/authProvider';
import AdminState from '../Admin/AdminState';
import Overstate from '../Overstate/Overstate';

const TouristManageProfile = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.email) {
                try {
                    const response = await fetch(`https://imtiaztourismltdd.vercel.app/users?email=${user.email}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const data = await response.json();
                    console.log("Fetched User Data:", data);  // Check if age, address, phone are present
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            } else {
                console.log('No email available to fetch data.');
            }
        };

        fetchUserData();
    }, [user]);


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
                setUserData(data);
                setEditModalOpen(false);
            })
            .catch((error) => {
                console.error('Error updating user data:', error.message);
            });
    };

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div className="p-6">
            <div className="text-center font-sans">
                <h1 className="text-2xl text-gray-700 mb-8 animate-slide-in">
                    Welcome to the Imtiaz Tourism Ltd ,{' '}
                    <span className="font-semibold">{userData ? userData.fullName : 'Loading...'}</span>!
                </h1>

                <div className="lg:flex justify-center items-center mt-8">
                    <img
                        src={userData?.photoURL || 'https://via.placeholder.com/150'}
                        alt="User profile"
                        className="w-36 h-36 rounded-lg object-cover border-4 border-gray-700 transition-transform hover:scale-105 mr-8"
                    />
                    <div className="text-left ">
                        <p>
                            <strong className="">Name:</strong> {userData?.fullName || 'N/A'}
                        </p>
                        <p>
                            <strong className="">Role:</strong> {userData?.userRole || 'Tourist'}
                        </p>
                        <p>
                            <strong className="">Joined:</strong> {userData?.registrationDate || 'N/A'}
                        </p>
                        <p>
                            <strong className="">Email:</strong> {userData?.email || 'N/A'}
                        </p>
                        <p>
                            <strong className="">Age:</strong> {userData?.age || 'N/A'}
                        </p>
                        <p>
                            <strong className="">Address:</strong> {userData?.address || 'N/A'}
                        </p>
                        <p>
                            <strong className="">Phone:</strong> {userData?.phone || 'N/A'}
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
                    {userData?.userRole !== 'Admin' && userData?.userRole !== 'Tour guide' && (
                        <button className="btn btn-success" onClick={() => navigate('/dashboard/tourist/joinguide')}>
                            Apply For Tour Guide
                        </button>
                    )}
                </div>
            </div>
            {userData?.userRole !== 'Tourist' && userData?.userRole !== 'Tour guide' && (
                <AdminState></AdminState>
            )}

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
                                    value={editedUser.firstName || userData?.firstName || ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editedUser.lastName || userData?.lastName || ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Role</label>
                                <input
                                    type="text"
                                    name="userRole"
                                    value={userData?.userRole}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={userData?.email}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Photo URL</label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    value={editedUser.photoURL || userData?.photoURL || ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={editedUser.age || userData?.age || ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editedUser.address || userData?.address || ''}
                                    onChange={handleEditChange}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedUser.phone || userData?.phone || ''}
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
            <div>
                <Overstate></Overstate>
            </div>
        </div>
    );
};

export default TouristManageProfile;
