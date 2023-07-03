import React from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { CheckoutForm } from './CheckoutForm';

export const Invest = () => {
	const [clientSecret, setClientSecret] = React.useState('');
	const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

	React.useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		const getSecret = async () => {
			const response = await fetch(
				'http://127.0.0.1:4242/create-payment-intent',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
				}
			);
			const data = await response.json();
			setClientSecret(data.clientSecret);
		};
		getSecret();
		// fetch('http://127.0.0.1:4242/create-payment-intent', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => setClientSecret(data.clientSecret));
	}, []);

	const options = {
		clientSecret,
		theme: 'stripe',
	};
	return (
		<>
			hei
			<Elements stripe={stripePromise} options={options}>
				<CheckoutForm />
			</Elements>
		</>
	);
};
