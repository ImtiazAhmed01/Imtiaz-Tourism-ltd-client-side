import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/authProvider';
import { Link } from 'react-router-dom';

const MyBooking = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:5000/bookings?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error('Error fetching bookings:', error));
    }, [user]);

    const handleCancel = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Cancelled' }),
            });
            if (response.ok) {
                setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">My Bookings</h2>
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
                    {bookings.map((booking) => (
                        <tr key={booking._id} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2">{booking.packageName}</td>
                            <td className="px-4 py-2">{booking.guideName}</td>
                            <td className="px-4 py-2">
                                {new Date(booking.tourDate).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">${booking.price}</td>
                            <td className="px-4 py-2">{booking.status}</td>
                            <td className="px-4 py-2">
                                {booking.status === 'pending' && (
                                    <>
                                        <Link
                                            to={`/payment/${booking._id}`}
                                            className="btn btn-success mr-2"
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
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyBooking;
