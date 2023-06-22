import React from 'react';
import { Outlet } from 'react-router-dom';

import { useAuth } from './context/AuthProvider';

import Signin from './Signin';

export default function AuthRoute() {
	const { auth } = useAuth();

	return auth ? <Outlet /> : <Signin />;
}
