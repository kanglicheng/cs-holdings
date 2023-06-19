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
					type="email"
					placeholder="Email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>

				<label htmlFor="password">Password </label>
				<input
					id="password"
					type="password"
					autoComplete="current-password"
					minLength={6}
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Sign in</button>
			</form>
			{error && <p>Error: {error}</p>}
		</div>
	);
};
