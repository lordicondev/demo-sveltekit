<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const links = [
		{ href: '/', label: 'Basics' },
		{ href: '/state', label: 'Svelte state' },
		{ href: '/server-rendering', label: 'Server rendering' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="Animated Lordicon icons in a SvelteKit app, with @lordicon/element."
	/>
</svelte:head>

<header class="header">
	<a href="/" class="brand">Lordicon × SvelteKit</a>
	<nav class="nav">
		{#each links as link (link.href)}
			<a href={link.href} aria-current={page.url.pathname === link.href ? 'page' : undefined}>
				{link.label}
			</a>
		{/each}
	</nav>
</header>
<main class="main">
	{@render children()}
</main>
