import React from 'react';
import { Link } from 'react-router-dom';

import { Anchor, Button, Group, Paper, Stack, Text } from '@mantine/core';

import { useAuth } from './context/AuthProvider';

export default function Home() {
	const { user, signOut } = useAuth();

	return (
		<Paper shadow="md" radius="md" p="md" withBorder>
			<Stack>
				<Text align="center">
					You are logged in and your email address is {user.email}
				</Text>
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
