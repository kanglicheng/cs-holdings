import React from 'react';

import {
	Button,
	Center,
	Container,
	Group,
	NumberInput,
	Stack,
	Stepper,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import supabase from './client';

export const SetupStepper = () => {
	React.useEffect(() => {
		const getPortfolios = async () => {
			const { data: Portfolios, error } = await supabase
				.from('Portfolios')
				.select('user_id');
		};

		getPortfolios();
	}, []);

	const [active, setActive] = React.useState(1);
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			firstName: '',
			lastName: '',
			address: '',
			terms: true,
			city: '',
			state: '',
			zip: '',
			password: '',
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
			password: (val) =>
				val.length <= 6
					? 'Password should include at least 6 characters'
					: null,
		},
	});
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
					<Stack>
						<TextInput
							label="First Name"
							placeholder="Donald"
							value={form.values.firstName}
							onChange={(event) =>
								form.setFieldValue('firstName', event.currentTarget.value)
							}
							radius="md"
						/>
						<TextInput
							label="Last Name"
							placeholder="Bren"
							value={form.values.lastName}
							onChange={(event) =>
								form.setFieldValue('lastName', event.currentTarget.value)
							}
							radius="md"
						/>
						<TextInput
							label="Mailing Address"
							placeholder="25 Apple Blossom Drive"
							value={form.values.address}
							onChange={(event) =>
								form.setFieldValue('address', event.currentTarget.value)
							}
							radius="md"
						/>
						<TextInput
							label="City"
							placeholder="Portsmouth"
							value={form.values.address}
							onChange={(event) =>
								form.setFieldValue('city', event.currentTarget.value)
							}
							radius="md"
						/>
						<TextInput
							label="State"
							placeholder="NH"
							value={form.values.address}
							onChange={(event) =>
								form.setFieldValue('zip', event.currentTarget.value)
							}
							radius="md"
						/>
						<NumberInput label="Zip Code" placeholder="11122" />
					</Stack>
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
