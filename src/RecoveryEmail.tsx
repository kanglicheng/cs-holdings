import React from 'react';
import { Link } from 'react-router-dom';

import {
	Alert,
	Anchor,
	Box,
	Button,
	Center,
	Container,
	Group,
	Paper,
	Stack,
	TextInput,
	Title,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

import { useAuth } from './context/AuthProvider';

export default function RecoveryEmail() {
	const { passwordReset } = useAuth();
	const [loading, setLoading] = React.useState(false);
	const [msg, setMsg] = React.useState('');
	const emailRef = React.useRef<HTMLInputElement>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			setLoading(true);
			const { data, error } = await passwordReset(emailRef.current?.value);
			if (error) setMsg(error.message);
			if (data) setMsg('Password reset has been sent to your email');
		} catch (error: unknown) {
			setMsg((error as Error)?.message ?? String(error));
		}
		setLoading(false);
	};

	return (
		<Container>
			<Title align="center">Forgot your password?</Title>
			<Center>Enter your email to get a reset link</Center>
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
						{msg && <Alert>{msg}</Alert>}
						<Group position="apart">
							<Anchor component={Link} to={'/login'}>
								<Center inline>
									<IconArrowLeft />
									<Box>Back to the login page</Box>
								</Center>
							</Anchor>
							<Button type="submit" disabled={loading}>
								Reset password
							</Button>
						</Group>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}
