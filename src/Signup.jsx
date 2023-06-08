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
					onChange={(e) => setEmail(e.target.value)}
					type="username"
					placeholder="Email address"
					value={email}
				/>

				<label htmlFor="password">Password </label>
				<input
					id="password"
					onChange={(e) => setPassword(e.target.value)}
					type="current-password"
					placeholder="Password"
					value={password}
				/>
				<button type="submit">Sign up</button>
			</form>
		</div>
	);
};
