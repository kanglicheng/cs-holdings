import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
	Alert,
	Button,
	Container,
	Paper,
	PasswordInput,
	Stack,
	Title,
} from '@mantine/core';

import { useAuth } from './context/AuthProvider';

export default function ResetPassword() {
	const { updatePassword } = useAuth();
	const passwordRef = React.useRef(null);
	const [errorMsg, setErrorMsg] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data, error } = await updatePassword(passwordRef.current.value);
			if (error) setErrorMsg(error.message);
			else if (data) navigate('/');
		} catch (error) {
			setErrorMsg(error.message);
		}
		setLoading(false);
	};

	return (
		<Container>
			<Title align="center">Update Password</Title>
			<Paper shadow="md" radius="md" p="md" withBorder>
				<form onSubmit={handleSubmit}>
					<Stack>
						<PasswordInput
							label="New Password"
							autoComplete="new-password"
							minLength={6}
							placeholder="Password"
							ref={passwordRef}
							required
						/>
						{errorMsg && <Alert>{errorMsg}</Alert>}
						<Button type="submit" disabled={loading}>
							Submit
						</Button>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}
