import React from 'react';

import { Grid } from '@mantine/core';

import supabase from '../client';
import { PropertyTableRow } from '../types';

import { PropertyCard } from './PropertyCard';

type PropertyTableRowPartial = Omit<
	PropertyTableRow,
	'created_at' | 'document_links'
>;

export const Properties = () => {
	const [properties, setProperties] = React.useState<PropertyTableRowPartial[]>(
		[]
	);

	React.useEffect(() => {
		const getProperties = async () => {
			const { data: Properties, error } = await supabase
				.from('Properties')
				.select(
					'id, address, city,  name, image_url, state, zip, property_type'
				);
			if (!error) {
				setProperties(Properties);
			}
		};
		getProperties();
	}, []);

	return (
		<Grid>
			{properties.map((property) => (
				<Grid.Col key={property.id} md={6} lg={4}>
					<PropertyCard
						id={property.id}
						name={property.name}
						address={property.address}
						city={property.city}
						state={property.state}
						zip={property.zip}
						property_type={property.property_type}
						image_url={property.image_url}
					/>
				</Grid.Col>
			))}
		</Grid>
	);
};
