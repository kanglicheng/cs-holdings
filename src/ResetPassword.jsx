import React, { useState } from 'react';

import { supabase } from './client';

export default function ResetPassword() {
	const [newPassword, setNewPassword] = useState('');

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data, error } = await supabase.auth.updateUser({
				password: newPassword,
			});

			if (data) {
				alert('Password updated successfully!');
			}
			if (error) {
				alert('There was an error updating your password.');
			}
		} catch (error) {
			console.error('An error occurred:', error.message);
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<label htmlFor="password">New Password </label>
			<input
				id="password"
				type="password"
				autoComplete="new-password"
				minLength="6"
				placeholder="Password"
				value={newPassword}
				onChange={(e) => setNewPassword(e.target.value)}
				required
			/>
			<button type="submit">Submit</button>
		</form>
	);
}
