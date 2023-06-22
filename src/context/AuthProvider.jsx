import React from 'react';

import PropTypes from 'prop-types';

import supabase from '../client';

const AuthContext = React.createContext({});

export const useAuth = () => React.useContext(AuthContext);

const login = (email, password) =>
	supabase.auth.signInWithPassword({ email, password });

const register = (email, password) => supabase.auth.signUp({ email, password });

const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw error;
	}
};

const getURL = () => {
	const currentUrl = window.location.href;
	const url = new URL(currentUrl).origin;
	return `${url}/account/update-password`;
};

const passwordReset = (email) =>
	supabase.auth.resetPasswordForEmail(email, {
		redirectTo: getURL(),
	});

const updatePassword = (updatedPassword) =>
	supabase.auth.updateUser({ password: updatedPassword });

export default function AuthProvider({ children }) {
	const [auth, setAuth] = React.useState(false);
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);
		const getUser = async () => {
			const { data } = await supabase.auth.getUser();
			const { user: currentUser } = data;
			setUser(currentUser ?? null);
			setAuth(currentUser ? true : false);
			setLoading(false);
		};
		getUser();
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event == 'PASSWORD_RECOVERY') {
				setAuth(false);
			} else if (event === 'SIGNED_IN') {
				setUser(session.user);
				setAuth(true);
			} else if (event === 'SIGNED_OUT') {
				setAuth(false);
				setUser(null);
			}
		});
		return () => {
			data.subscription.unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{
				auth,
				user,
				register,
				login,
				signOut,
				passwordReset,
				updatePassword,
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
