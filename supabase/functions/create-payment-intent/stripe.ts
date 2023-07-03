import Stripe from 'https://esm.sh/stripe@12.4.0';

export const stripe = Stripe(
	'sk_test_51NPpUVEALby9bwVO4CfXr69jt2H8anPck7I3DANVohIPU5tXJgTObcsyRBgtzLMW5zx3I5JqeXXhaBuq110zHhY2004NHtevMt',
	{
		// This is needed to use the Fetch API rather than relying on the Node http
		// package.
		httpClient: Stripe.createFetchHttpClient(),
		apiVersion: '2022-08-01',
	}
);
