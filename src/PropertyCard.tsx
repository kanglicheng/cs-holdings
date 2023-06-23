import React from 'react';

import { Card, Image, Text, Title } from '@mantine/core';

interface PropertyCardProps {
	address: string;
	city: string;
	state: string;
	zip: number;
	type: string;
	image_url?: string;
}

export const PropertyCard = ({
	address,
	city,
	state,
	zip,
	type,
	image_url,
}: PropertyCardProps) => {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Card.Section>
				<Image src={image_url} alt="lucky" />
			</Card.Section>
			<Card.Section>
				<Title order={3}>{address}</Title>
			</Card.Section>
			<Card.Section>
				<Text fw={450}>
					City: <em>{city}</em>
				</Text>
				<Text fw={500}>
					State: <em>{state}</em>
				</Text>
				<Text fw={500}>
					Zip: <em>{zip}</em>
				</Text>
				<Text fw={500}>
					Investment Type: <em>{type}</em>
				</Text>
			</Card.Section>
		</Card>
	);
};
