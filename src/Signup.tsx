import React from 'react';
import { Link } from 'react-router-dom';

import {
	Alert,
	Anchor,
	Button,
	Container,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';

import { useAuth } from './context/AuthProvider';

export default function Signup() {
	const emailRef = React.useRef<HTMLInputElement>(null);
	const passwordRef = React.useRef<HTMLInputElement>(null);
	const [loading, setLoading] = React.useState(false);
	const [msg, setMsg] = React.useState('');
	const { register } = useAuth();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			setLoading(true);
			const { data, error } = await register(
				emailRef.current?.value,
				passwordRef.current?.value
			);
			if (error) setMsg(error.message);
			else if (data)
				setMsg(
					'Registration Successful. Check your email to confirm your account'
				);
		} catch (error) {
			setMsg('Error in Creating Account');
		}
		setLoading(false);
	};

	return (
		<Container>
			<Title align="center">Create an Account</Title>
			<Text align="center">
				Already have an account?{' '}
				<Anchor component={Link} to={'/login'}>
					Log in
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
							autoComplete="new-password"
							minLength={6}
							placeholder="Password"
							ref={passwordRef}
							required
						/>
						{msg && <Alert>{msg}</Alert>}
						<Button type="submit" disabled={loading}>
							Register
						</Button>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}
