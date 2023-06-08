import React from 'react';

import { supabase } from './client';

const getURL = () => {
	const currentUrl = window.location.href;
	const url = new URL(currentUrl).origin;
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
