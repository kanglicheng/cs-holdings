import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
} from '@mantine/core';

import { App } from './App';
import { ErrorPage } from './ErrorPage';
import './index.css';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/properties',
				element: <div>Properties</div>,
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
				<RouterProvider router={router} />
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
