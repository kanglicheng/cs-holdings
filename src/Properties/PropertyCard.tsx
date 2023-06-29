import React from 'react';
import { Link } from 'react-router-dom';

import {
	AspectRatio,
	Card,
	Container,
	Image,
	NavLink,
	Text,
	Title,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

interface PropertyCardProps {
	address: string;
	city: string;
	state: string;
	zip: number;
	type: string;
	name: string;
	image_url?: string;
	property_id: string;
}

export const PropertyCard = ({
	address,
	city,
	state,
	zip,
	type,
	image_url,
	name,
	property_id,
}: PropertyCardProps) => {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Card.Section>
				<NavLink
					component={Link}
					to={`/properties/${property_id}`}
					label={
						<Title fw={450} order={3}>
							{name}
						</Title>
					}
					ta={'center'}
					fz="xl"
					mt={'md'}
					sx={(theme) => ({
						color:
							theme.colorScheme === 'dark'
								? theme.colors.dark[0]
								: theme.colors.indigo,

						'&:hover': {
							backgroundColor:
								theme.colorScheme === 'dark'
									? theme.colors.dark[4]
									: theme.colors.gray[3],
						},
					})}
					rightSection={
						<IconChevronRight color={'blue'} size="1rem" stroke={1.5} />
					}
				/>
			</Card.Section>

			<Card.Section>
				<AspectRatio ratio={720 / 1080} maw={300} mah={280} mx="auto">
					<Image src={image_url} alt="lucky" />
				</AspectRatio>
			</Card.Section>
			<Card.Section>
				<Container mb={'sm'}>
					<Text mx={'sm'} fw={450}>
						<b>Address: </b>
						{address}
					</Text>
					<Text mx={'sm'} fw={450}>
						<b> City: </b>
						{city}
					</Text>
					<Text mx={'sm'} fw={500}>
						<b> State: </b>
						{state}
					</Text>
					<Text mx={'sm'} fw={500}>
						<b>Zip:</b> {zip}
					</Text>
					<Text mx={'sm'} fw={500}>
						<b>Investment Type: </b>
						{type}
					</Text>
				</Container>
			</Card.Section>
		</Card>
	);
};
