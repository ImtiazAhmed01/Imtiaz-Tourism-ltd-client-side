import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const Payment = () => {
    const { id } = useParams(); // Get the booking ID from the URL params
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        try {
            // Fetch the payment intent client secret
            const response = await fetch('https://imtiaztourismltdd.vercel.app/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 5000, bookingId: id }),
            });

            const data = await response.json();

            if (!data.clientSecret) {
                throw new Error('Missing clientSecret from the server');
            }

            // Confirm the payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card },
            });

            if (error) {
                console.error(error.message);
                setPaymentStatus('Payment Failed');
            } else if (paymentIntent.status === 'succeeded') {
                setPaymentStatus('Payment Successful');

                // Update booking status
                await fetch(`https://imtiaztourismltdd.vercel.app/bookings/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'In Review' }),
                });

                // Redirect to my bookings
                setTimeout(() => {
                    navigate('/dashboard/tourist/myBookings');
                }, 2000);
            }
        } catch (err) {
            console.error('Error processing payment:', err);
            setPaymentStatus('Payment Failed');
        }
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Complete Your Payment</h2>
            <form onSubmit={handleSubmit}>
                <CardElement className="p-4 border rounded-md" />
                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="btn btn-primary mt-4"
                >
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
            {paymentStatus && <p className="mt-4">{paymentStatus}</p>}
        </div>
    );
};

export default Payment;
