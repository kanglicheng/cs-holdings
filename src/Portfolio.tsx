import React from 'react';

import { Container, Paper, Table, Text, Title } from '@mantine/core';

import { useAuth } from './context/AuthProvider';

import supabase from './client';
import type { PortfolioTableRow } from './types';

export default function Portfolio() {
	const [elements, setElements] = React.useState<PortfolioTableRow>();
	const { user } = useAuth();
	// Get user's name from Profile table?
	React.useEffect(() => {
		const getPortfolios = async () => {
			const { data: Portfolios, error } = await supabase
				.from('Portfolios')
				.select('*')
				.eq('user_id', user.id)
				.single();
			console.log(Portfolios);
			if (!error) {
				setElements(Portfolios);
				console.log(user.id);
			}
		};

		getPortfolios();
	}, []);
	return (
		<Container>
			<Title align="center">Portfolio</Title>
			<Text align="center">Account: {user.email}</Text>
			<Paper shadow="md" radius="md" p="md" withBorder>
				<Text>Portfolio</Text>
				<Table></Table>
			</Paper>
		</Container>
	);
}
