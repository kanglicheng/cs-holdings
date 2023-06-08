import React from 'react';

import { supabase } from './client';

const getURL = () => {
	// eslint-disable-next-line no-undef
	let url = process.env.NEXT_PUBLIC_SITE_URL ?? null; // Set this to your site URL in production env.
	// eslint-disable-next-line no-undef
	url = url ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? null; // Automatically set by Vercel.
	url = url ?? 'http://localhost:3000/'; // local env

	// Make sure to include `https://` when not localhost.
	url = url.includes('http') ? url : `https://${url}`;
	// Make sure to including trailing `/`.
	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
	return url;
};

export default function RecoveryEmail() {
	const [email, setEmail] = React.useState('');
	const [error, setError] = React.useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: getURL(),
			});

			if (error) {
				throw error;
			}
		} catch (error) {
			// Handle error gracefully and provide user feedback
			setError(error.message);
			console.error('Error:', error.message);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h3>Reset Password</h3>
				<label htmlFor="email">Email </label>
				<input
					id="email"
					type="email"
					placeholder="Email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit">Reset Password</button>
			</form>
			{error && <p>Error: {error}</p>}
		</div>
	);
}
