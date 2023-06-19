import React from 'react';

import { supabase } from './client';

export const Signup = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleSignup = async (e) => {
		e.preventDefault();
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});
		if (error) {
			throw error;
		}
	};

	return (
		<div>
			<form onSubmit={handleSignup}>
				<h3>Create an Account</h3>
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
					autoComplete="new-password"
					minLength={6}
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Sign up</button>
			</form>
		</div>
	);
};
