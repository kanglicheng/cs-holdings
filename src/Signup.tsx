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
import { useForm } from '@mantine/form';

import { useAuth } from './context/AuthProvider';

export default function Signup() {
	const [loading, setLoading] = React.useState(false);
	const [msg, setMsg] = React.useState('');
	const { register } = useAuth();
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
	});

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			setLoading(true);
			const { data, error } = await register(form.values);
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
							{...form.getInputProps('email')}
							required
						/>
						<PasswordInput
							label="Password"
							autoComplete="new-password"
							minLength={6}
							placeholder="Password"
							{...form.getInputProps('password')}
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
