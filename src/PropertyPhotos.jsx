import React from 'react';

import { supabase } from './client';

export const PropertyPhotos = () => {
	const [photoUrls, setPhotoUrls] = React.useState([]);
	const [photoNames, setPhotoNames] = React.useState([]);
	React.useEffect(() => {
		const getFromStorage = async () => {
			const { data } = await supabase.storage
				.from('property-photos')
				.list('lucky-trail');

			const photoNames = data
				?.map((d) => d.name)
				.filter((name) => name !== '.emptyFolderPlaceholder');
			setPhotoNames(photoNames);
			console.log(photoNames);
		};

		getFromStorage();
	}, []);

	React.useEffect(() => {
		const photoLocations = photoNames.map((name) => `lucky-trail/${name}`);
		const getPhotoUrls = async () => {
			const { data, error } = await supabase.storage
				.from('property-photos')
				.createSignedUrls(photoLocations, 60);
			const urls = data?.map((d) => d.signedUrl);
			setPhotoUrls(urls);
		};

		getPhotoUrls();
	}, [photoNames]);

	return (
		<>
			<h3>Property Photos</h3>
			<div
				style={{
					maxWidth: '600px',
					margin: '15px',
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
				}}
			>
				{photoUrls?.map((url) => (
					<img key={url} src={url} />
				))}
			</div>
		</>
	);
};
