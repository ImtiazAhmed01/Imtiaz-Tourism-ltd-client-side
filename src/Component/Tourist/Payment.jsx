import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';


// Replace with your actual Stripe public key

const Payment = () => {
    const { id } = useParams(); // Get the booking ID from the URL params
    const stripe = useStripe();
    const elements = useElements();
    const [paymentStatus, setPaymentStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        const response = await fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 5000 }), // Example: $50 = 5000 cents
        });
        const { clientSecret } = await response.json();

        // Confirm the payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card },
        });

        if (error) {
            console.error(error.message);
            setPaymentStatus('Payment Failed');
        } else if (paymentIntent.status === 'succeeded') {
            setPaymentStatus('Payment Successful');

            await fetch(`http://localhost:5000/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'In Review' }),
            });
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Complete Your Payment</h2>
            <form onSubmit={handleSubmit}>
                <CardElement className="p-4 border rounded-md" />
                <button
                    type="submit"
                    disabled={!stripe}
                    className="btn btn-primary mt-4"
                >
                    Pay Now
                </button>
            </form>
            {paymentStatus && <p className="mt-4">{paymentStatus}</p>}
        </div>
    );
};

export default Payment;
