import React from 'react';

import LogRocket from 'logrocket';

import { supabase } from './client';
import { Signin } from './Signin';
import { Signup } from './Signup';

import './App.css';

LogRocket.init('6gzskl/cs-holdings-prod');


export default function App() {
	// Manage login state
	const [session, setSession] = React.useState(null);

	React.useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
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
			{!session && <Signup />}
			{!session && <Signin />}
			{session && <button onClick={logout}>Logout</button>}
		</div>
	);
}