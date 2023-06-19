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
	IconMoonStars,
	IconSun,
} from '@tabler/icons-react';

import './App.css';
import { supabase } from './client';

//LogRocket.init('6gzskl/cs-holdings-prod');

function App(): JSX.Element {
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
			<Outlet />
		</AppShell>
	);
}

interface MainLinkProps {
	icon: React.ReactNode;
	color: string;
	label: string;
}

function MainLink({ icon, color, label }: MainLinkProps) {
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
			icon: <IconBuildingEstate size="1rem" />,
			color: 'blue',
			label: 'Properties',
		},
	];
	const links = data.map((link) => <MainLink {...link} key={link.label} />);
	return <div>{links}</div>;
}

export default App;
