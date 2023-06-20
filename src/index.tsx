import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from '@mantine/core';

import AuthProvider from './context/AuthProvider';

import App from './App';
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
				element: <div>Properties</div>,
			},
			{
				path: '/login',
			},
			{
				path: '/signup',
			},
			{
				path: '/reset-password',
			},
			{
				path: '/account/update-password',
			},
			{
				path: '/account',
			},
		],
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
