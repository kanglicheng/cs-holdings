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
			const urls = [];
			for (const item of photoLocations) {
				const { data, error } = await supabase.storage
					.from('property-photos')
					.createSignedUrl(item, 90000, {
						transform: {
							width: 200,
							height: 250,
						},
					});
				if (error) {
					break;
				}
				urls.push(data.signedUrl);
			}
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
