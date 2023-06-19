import React from 'react';

import LogRocket from 'logrocket';

import { supabase } from './client';
import RecoveryEmail from './RecoveryEmail';
import ResetPassword from './ResetPassword';
import { Signin } from './Signin';
import { Signup } from './Signup';

import './App.css';

LogRocket.init('6gzskl/cs-holdings-prod');

export default function App() {
	const currentUrl = window.location.pathname;

	// Manage login state
	const [session, setSession] = React.useState(null);

	React.useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange(async (_event, session) => {
			setSession(session);
		});
	}, []);

	const logout = async () => {
		await supabase.auth.signOut();
	};

	return (
		<div className="App">
			<h1>CS Holdings</h1>
			{session && <h3>{session.user.email}</h3>}
			{session && currentUrl === '/account/' && <ResetPassword />}
			{!session && <Signup />}
			{!session && <Signin />}
			{!session && <RecoveryEmail />}
			{session && <button onClick={logout}>Logout</button>}
		</div>
	);
}
