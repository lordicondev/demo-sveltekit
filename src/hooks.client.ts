import type { ClientInit } from '@sveltejs/kit/hooks';
import { defineElement } from '@lordicon/element';

// Defines <lord-icon> in the browser, before the app hydrates. On the server, Svelte renders the
// tag with its attributes, and the icon takes over once this has run.
export const init: ClientInit = () => {
	defineElement();
};
