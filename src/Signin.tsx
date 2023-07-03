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
import { useForm } from '@mantine/form';

import { useAuth } from './context/AuthProvider';

export default function Signin() {
	const [loading, setLoading] = React.useState(false);
	const [msg, setMsg] = React.useState('');
	const navigate = useNavigate();
	const { login } = useAuth();
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
	});

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		try {
			const { data, error } = await login(form.values);
			if (error) setMsg(error.message);
			else if (data) navigate('/home');
		} catch (error: unknown) {
			setMsg((error as Error)?.message ?? String(error));
		}
		setLoading(false);
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
							{...form.getInputProps('email')}
							required
						/>
						<PasswordInput
							label="Password"
							autoComplete="current-password"
							minLength={6}
							placeholder="Password"
							{...form.getInputProps('password')}
							required
						/>
						{msg && <Alert>{msg}</Alert>}
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
