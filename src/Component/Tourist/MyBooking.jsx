import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/authProvider';
import { Link } from 'react-router-dom';

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // To show loading state

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:5000/bookings?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBookings(data);
                } else {
                    console.error('Expected an array but received:', data);
                    setBookings([]); // Fallback to an empty array
                }
            })
            .catch((error) => console.error('Error fetching bookings:', error))
            .finally(() => setLoading(false)); // Set loading to false after fetch
    }, [user]);

    const handleCancel = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
                method: 'DELETE', // Use DELETE method
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                // Filter out the canceled booking from state
                setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">My Bookings</h2>
            {loading ? (
                <p className="text-center text-gray-600">Loading bookings...</p>
            ) : (
                <table className="table-auto w-full text-center text-gray-700">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="px-4 py-2">Package</th>
                            <th className="px-4 py-2">Tour Guide</th>
                            <th className="px-4 py-2">Tour Date</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(bookings) && bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <tr key={booking._id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{booking.packageName}</td>
                                    <td className="px-4 py-2">{booking.guideName}</td>
                                    <td className="px-4 py-2">
                                        {new Date(booking.tourDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2">${booking.price}</td>
                                    <td className="px-4 py-2">{booking.status}</td>
                                    <td className="px-4 py-2">
                                        {booking.status === 'pending' ? (
                                            <>
                                                <Link
                                                    to={`/payment/${booking._id}`}
                                                    className="btn btn-success mr-2"
                                                    disabled={booking.status !== 'pending'} // Disable button if not pending
                                                >
                                                    Pay
                                                </Link>
                                                <button
                                                    className="btn btn-error"
                                                    onClick={() => handleCancel(booking._id)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-500">No actions available</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyBooking;
