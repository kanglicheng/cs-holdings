import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from '@mantine/core';

import { Properties } from './Properties/PropertiesGrid';
import { PropertyDetails } from './Properties/PropertyDetails';
import AuthProvider from './context/AuthProvider';

import Account from './Account';
import App from './App';
import { Logout } from './Logout';
import RecoveryEmail from './RecoveryEmail';
import ResetPassword from './ResetPassword';
import { SetupStepper } from './SetupStepper';
import Signin from './Signin';
import Signup from './Signup';
import './index.css';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		//errorElement: <ErrorPage />,
		children: [
			{
				path: '/properties',
				element: <Properties />,
			},
			{
				path: '/properties/:property_id',
				element: <PropertyDetails />,
			},
			{
				path: '/login',
				element: <Signin />,
			},
			{
				path: '/account',
				element: <Account />,
			},
			{
				path: '/home',
				element: <div>Home</div>,
			},
		],
	},
	{
		path: '/account/update-password',
		element: <ResetPassword />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
	{
		path: '/logout',
		element: <Logout />,
	},
	{
		path: '/reset-password',
		element: <RecoveryEmail />,
	},
	{
		path: '/invest/setup',
		element: <SetupStepper />,
	},
]);

function Parent() {
	const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
	const toggleColorScheme = (value) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{ colorScheme }}
				withGlobalStyles
				withNormalizeCSS
			>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Parent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
