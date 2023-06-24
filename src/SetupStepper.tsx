import React from 'react';

import {
	Button,
	Center,
	Container,
	Group,
	Stepper,
	Title,
} from '@mantine/core';

export const SetupStepper = () => {
	const [active, setActive] = React.useState(1);
	const nextStep = () =>
		setActive((current) => (current < 3 ? current + 1 : current));
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	return (
		<Container px="sm" style={{ margin: '2rem' }}>
			<Center style={{ marginBottom: '3rem' }}>
				<Title order={3}>Investment Account Activation</Title>
			</Center>

			<Stepper
				active={active}
				onStepClick={setActive}
				breakpoint="sm"
				allowNextStepsSelect={false}
			>
				<Stepper.Step
					label="Personal Information"
					description="Create an account"
				>
					Step 1 content: Create an account
				</Stepper.Step>
				<Stepper.Step label="ID Document Upload" description="Verify email">
					Step 2 content: Verify email
				</Stepper.Step>
				<Stepper.Step
					label="Review and Sign Agreements"
					description="Get full access"
				>
					Step 3 content: Get full access
				</Stepper.Step>
				<Stepper.Completed>
					Completed, click back button to get to previous step
				</Stepper.Completed>
			</Stepper>

			<Group position="center" mt="xl">
				<Button variant="default" onClick={prevStep}>
					Back
				</Button>
				<Button onClick={nextStep}>Next step</Button>
			</Group>
		</Container>
	);
};
