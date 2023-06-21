import React from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import {
	ActionIcon,
	AppShell,
	Group,
	Header,
	Navbar,
	Text,
	ThemeIcon,
	UnstyledButton,
	useMantineColorScheme,
} from '@mantine/core';
import {
	IconBuildingEstate,
	IconMoonStars,
	IconSun,
} from '@tabler/icons-react';

import './App.css';
import AuthRoute from './AuthRoute';
import Home from './Home';
import RecoveryEmail from './RecoveryEmail';
import ResetPassword from './ResetPassword';
import Signin from './Signin';
import Signup from './Signup';

//LogRocket.init('6gzskl/cs-holdings-prod');

function App(): JSX.Element {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<AppShell
			padding="md"
			navbar={
				<Navbar width={{ base: 300 }} height={500} p="xs">
					<Navbar.Section grow mt="xs">
						<MainLinks />
					</Navbar.Section>
				</Navbar>
			}
			header={
				<Header height={60}>
					<Group sx={{ height: '100%' }} px={20} position="apart">
						<ActionIcon
							variant="default"
							onClick={() => toggleColorScheme()}
							size={30}
						>
							{colorScheme === 'dark' ? (
								<IconSun size="1rem" />
							) : (
								<IconMoonStars size="1rem" />
							)}
						</ActionIcon>
					</Group>
				</Header>
			}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			<Routes>
				<Route element={<AuthRoute />}>
					<Route path="/" element={<Home />} />
					<Route path="/account" element={<Home />} />
					<Route path="/account/update-password" element={<ResetPassword />} />
				</Route>
				<Route path="/signup" element={<Signup />} />
				<Route path="/reset-password" element={<RecoveryEmail />} />
				<Route path="/login" element={<Signin />} />
			</Routes>
			<Outlet />
		</AppShell>
	);
}

interface MainLinkProps {
	icon: React.ReactNode;
	color: string;
	label: string;
	route?: string;
}

function MainLink({ icon, color, label, route }: MainLinkProps) {
	const navigate = useNavigate();
	return (
		<UnstyledButton
			sx={(theme) => ({
				display: 'block',
				width: '100%',
				padding: theme.spacing.xs,
				borderRadius: theme.radius.sm,
				color:
					theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

				'&:hover': {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[6]
							: theme.colors.gray[0],
				},
				'&:focus': {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[4]
							: theme.colors.green[1],
				},
			})}
			onClick={() => navigate(route ? route : '/')}
		>
			<Group>
				<ThemeIcon color={color} variant="light">
					{icon}
				</ThemeIcon>

				<Text size="sm">{label}</Text>
			</Group>
		</UnstyledButton>
	);
}

function MainLinks() {
	const data = [
		{
			icon: <IconBuildingEstate size="1rem" />,
			color: 'blue',
			label: 'Properties',
			route: '/properties',
		},
	];
	const links = data.map((link) => <MainLink {...link} key={link.label} />);
	return <div>{links}</div>;
}

export default App;
