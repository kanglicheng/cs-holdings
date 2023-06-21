import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from './context/AuthProvider';

export default function AuthRoute() {
	const { auth } = useAuth();
	const location = useLocation();

	return auth ? (
		<Outlet />
	) : (
		<Navigate to={'/login'} replace state={{ path: location.pathname }} />
	);
}
