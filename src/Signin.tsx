import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
	Alert,
	Anchor,
	Button,
	Container,
	Group,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';

import { useAuth } from './context/AuthProvider';

export default function Signin() {
	const emailRef = React.useRef(null);
	const passwordRef = React.useRef(null);
	const [error, setError] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const {
				data: { user, session },
				error,
			} = await login(emailRef.current.value, passwordRef.current.value);

			if (error) setError(error.message);
			else if (user && session) navigate('/');
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
			navigate('/home');
		}
	};

	return (
		<Container>
			<Title align="center">Welcome back!</Title>
			<Text align="center">
				Don&apos;t have an account?{' '}
				<Anchor component={Link} to={'/signup'}>
					Register
				</Anchor>
			</Text>

			<Paper shadow="md" radius="md" p="md" withBorder>
				<form onSubmit={handleSubmit}>
					<Stack>
						<TextInput
							label="Email"
							type="email"
							placeholder="Email address"
							ref={emailRef}
							required
						/>
						<PasswordInput
							label="Password"
							autoComplete="current-password"
							minLength={6}
							placeholder="Password"
							ref={passwordRef}
							required
						/>
						{error && <Alert>{error}</Alert>}
						<Group position="apart">
							<Anchor component={Link} to={'/reset-password'}>
								Forgot password?
							</Anchor>
							<Button type="submit" disabled={loading}>
								Sign in
							</Button>
						</Group>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}
