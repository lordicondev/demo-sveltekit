import type { Actions, PageServerLoad } from './$types';

/** A stand-in for your data: a database, a CMS, the session. */
export const load: PageServerLoad = () => ({
	products: [
		{ id: 1, name: 'Headphones', price: '$129', inCart: true },
		{ id: 2, name: 'Keyboard', price: '$89', inCart: false }
	]
});

export const actions = {
	/** A stand-in for signing someone up: a mailing list, a database. */
	subscribe: async ({ request }) => {
		const data = await request.formData();
		return { message: `Subscribed: ${data.get('email')}` };
	}
} satisfies Actions;
