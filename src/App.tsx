import React from 'react';
import { Outlet } from 'react-router-dom';

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
	IconHome,
	IconLogout2,
	IconMoonStars,
	IconSun,
	IconUser,
} from '@tabler/icons-react';

import { useAuth } from './context/AuthProvider';

import './App.css';
import Signin from './Signin';

//LogRocket.init('6gzskl/cs-holdings-prod');

function App(): JSX.Element {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { auth } = useAuth();

	if (!auth) {
		return <Signin />;
	}

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
			{<Outlet /> || <div>Home</div>}
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
	return (
		<UnstyledButton
			component={'a'}
			href={route ? route : '/'}
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
			icon: <IconHome size="1rem" />,
			color: 'blue',
			label: 'Home',
			route: '/home',
		},

		{
			icon: <IconBuildingEstate size="1rem" />,
			color: 'blue',
			label: 'Properties',
			route: '/properties',
		},
		{
			icon: <IconUser size="1rem" />,
			color: 'blue',
			label: 'Account',
			route: '/account',
		},
		{
			icon: <IconUser size="1rem" />,
			color: 'blue',
			label: 'Portfolio',
			route: '/portfolio',
		},
		{
			icon: <IconLogout2 size="1rem" />,
			color: 'blue',
			label: 'Logout',
			route: '/logout',
			type: 'button',
		},
	];
	const links = data.map((link) => <MainLink {...link} key={link.label} />);
	return <div>{links}</div>;
}

export default App;
