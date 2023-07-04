import React from 'react';

import type {
	AuthError,
	AuthResponse,
	User,
	UserResponse,
} from '@supabase/supabase-js';

import supabase from '../client';

export type SupabaseAuthPayload = {
	email: string;
	password: string;
};

export type AuthContextProps = {
	user: User | undefined;
	auth: boolean;
	register: (payload: SupabaseAuthPayload) => Promise<AuthResponse>;
	login: (payload: SupabaseAuthPayload) => Promise<AuthResponse>;
	signOut: () => Promise<void>;
	passwordReset: (
		email: string
	) => Promise<{ data: object | null; error: null | AuthError }>;
	updatePassword: (updatedPassword: string) => Promise<UserResponse>;
};

const AuthContext = React.createContext<AuthContextProps>(
	{} as AuthContextProps
);

export const useAuth = () => React.useContext(AuthContext);

const login = (payload: SupabaseAuthPayload): Promise<AuthResponse> =>
	supabase.auth.signInWithPassword(payload);

const register = (payload: SupabaseAuthPayload): Promise<AuthResponse> =>
	supabase.auth.signUp(payload);

const signOut: () => Promise<void> = async () => {
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

const passwordReset = (email: string) =>
	supabase.auth.resetPasswordForEmail(email, {
		redirectTo: getURL(),
	});

const updatePassword = (updatedPassword: string) =>
	supabase.auth.updateUser({ password: updatedPassword });

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [auth, setAuth] = React.useState(false);
	const [user, setUser] = React.useState<User>();
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user ?? undefined);
			setAuth(user ? true : false);
			setLoading(false);
		};
		getUser();
		const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
			if (event == 'PASSWORD_RECOVERY') {
				setAuth(false);
			} else if (event === 'SIGNED_IN') {
				setUser(session?.user);
				setAuth(true);
			} else if (event === 'SIGNED_OUT') {
				setAuth(false);
				setUser(undefined);
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
