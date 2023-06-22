import React from 'react';

import { Grid } from '@mantine/core';

import { PropertyCard } from './PropertyCard';
import supabase from './client';

export const Properties = () => {
	const [properties, setProperties] = React.useState([]);

	React.useEffect(() => {
		const getProperties = async () => {
			const { data: Properties, error } = await supabase
				.from('Properties')
				.select('*');
			if (!error) {
				setProperties(Properties);
			}
		};
		getProperties();
	}, []);

	console.log(properties);

	return (
		<Grid>
			{properties.map((property) => (
				<Grid.Col key={property.id} md={6} lg={4}>
					<PropertyCard
						address={property.address}
						city={property.city}
						state={property.state}
						zip={property.zip}
						type={property.type}
						image_url={property.image_url}
					/>
				</Grid.Col>
			))}
		</Grid>
	);
};
