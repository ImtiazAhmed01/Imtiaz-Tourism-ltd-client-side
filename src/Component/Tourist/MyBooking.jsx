import React, { useState, useEffect } from 'react';

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch(`/bookings?email=${user.email}`);
            const data = await response.json();
            setBookings(data);
        };

        fetchBookings();
    }, []);

    const handlePay = async (bookingId, price) => {
        const response = await fetch('/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId, amount: price * 100 }), // Stripe requires amount in cents
        });

        const { clientSecret } = await response.json();

        const stripe = window.Stripe('your_stripe_public_key');
        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement, // Assumes you have a Stripe Element for the card details
            },
        });

        if (error) {
            console.error('Payment failed', error);
        } else {
            console.log('Payment successful');
            // Optionally, update UI to reflect payment success
        }
    };

    const handleCancel = async (bookingId) => {
        // Implement cancel logic here, e.g., call an API to update booking status to "Cancelled"
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
                            <td className="px-4 py-2">{booking.tourGuide}</td>
                            <td className="px-4 py-2">{new Date(booking.tourDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2">${booking.tourPrice}</td>
                            <td className="px-4 py-2">{booking.status}</td>
                            <td className="px-4 py-2">
                                {booking.status === 'Pending' && (
                                    <>
                                        <button
                                            className="btn btn-success mr-2"
                                            onClick={() => handlePay(booking._id, booking.tourPrice)}>
                                            Pay
                                        </button>
                                        <button
                                            className="btn btn-error"
                                            onClick={() => handleCancel(booking._id)}>
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
