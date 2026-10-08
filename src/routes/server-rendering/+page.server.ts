import type { PageServerLoad } from './$types';

/** A stand-in for data that is personal, or slow to come. */
async function getRecommendations() {
	await new Promise((resolve) => setTimeout(resolve, 1500));
	return [
		{ id: 1, title: 'Secure your account', icon: '/icons/lock.json' },
		{ id: 2, title: 'Earn rewards', icon: '/icons/coins.json' },
		{ id: 3, title: 'Add an extension', icon: '/icons/puzzle.json' }
	];
}

export const load: PageServerLoad = () => ({
	// Not awaited: the page goes out at once, and the data follows on the same response.
	recommendations: getRecommendations()
});
