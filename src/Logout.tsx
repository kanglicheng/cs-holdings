import React from 'react';

import { useAuth } from './context/AuthProvider';

export default function Logout() {
	const { signOut } = useAuth();

	try {
		signOut();
	} catch (error: unknown) {
		return <div>Error occurred, please try again.</div>;
	}
	return <div>You have successfully logged out</div>;
}
