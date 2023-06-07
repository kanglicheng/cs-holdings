import React from 'react';

import { supabase } from './client';

export const Signin = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState(null);

	const handleSignin = async (e) => {
		e.preventDefault();
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});
			if (error) {
				throw error;
			}
			// Clear form fields after successful sign-in
			setEmail('');
			setPassword('');
		} catch (error) {
			// Handle error gracefully and provide user feedback
			setError(error.message);
			console.error('Sign in error:', error.message);
		}
	};

	return (
		<div>
			<form onSubmit={handleSignin}>
				<h3>Sign in</h3>
				<label htmlFor="email">Email </label>
				<input
					id="email"
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Email address"
					value={email}
				/>

				<label htmlFor="password">Password </label>
				<input
					id="password"
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
					value={password}
				/>
				<button type="submit">Sign in</button>
			</form>
			{error && <p>Error: {error}</p>}
		</div>
	);
};
