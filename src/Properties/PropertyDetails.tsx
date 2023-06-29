import React from 'react';
import { useParams } from 'react-router-dom';

import { Title } from '@mantine/core';

import supabase from '../client';
import { PropertyTableRow } from '../types';

export const PropertyDetails = () => {
	const params = useParams();
	const [propertyDetails, setPropertyDetails] =
		React.useState<PropertyTableRow>();
	React.useEffect(() => {
		const getPropertyDetails = async () => {
			const { data: Properties, error } = await supabase
				.from('Properties')
				.select('*')
				.filter('id', 'eq', params.property_id);
			if (!error) {
				setPropertyDetails(Properties[0]);
			}
		};

		getPropertyDetails();
	}, []);
	return <Title>{propertyDetails?.address}</Title>;
};
