import React from 'react';
import { Link } from 'react-router-dom';

import {
	Anchor,
	Button,
	Container,
	Group,
	Paper,
	Stack,
	Text,
} from '@mantine/core';

import { useAuth } from './context/AuthProvider';

export default function Account() {
	const { user, signOut } = useAuth();

	return (
		<Paper shadow="md" radius="md" p="md" withBorder>
			<Stack>
				<Text align="center">
					You are logged in and your email address is {user.email}
				</Text>
				<Stack>
					<Group>
						<Text fw={500}>Investment Account Status:</Text>
						<Text>Your investment account is not currently active</Text>
					</Group>
					<Container>
						<Button href="/invest/setup" component="a" variant="light">
							Activate Investment Account
						</Button>
					</Container>
				</Stack>
				<Group position="apart">
					<Anchor component={Link} to={'/account/update-password'}>
						Update password
					</Anchor>
					<Button onClick={signOut}>Sign Out</Button>
				</Group>
			</Stack>
		</Paper>
	);
}
