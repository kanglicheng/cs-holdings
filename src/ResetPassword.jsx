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

	const handlePasswordChange = (event) => {
		setNewPassword(event.target.value);
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<label>
				New Password:
				<input
					type="password"
					value={newPassword}
					onChange={handlePasswordChange}
				/>
			</label>
			<button type="submit">Submit</button>
		</form>
	);
}
