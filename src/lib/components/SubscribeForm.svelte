<script lang="ts">
	import type { LordIconElement } from '@lordicon/element';
	import { enhance } from '$app/forms';

	/**
	 * A form that posts to the page's `subscribe` action; the icon plays once the server has
	 * answered. Without JavaScript the form still works: the page reloads with the message.
	 */
	let { message }: { message?: string } = $props();

	let icon = $state<LordIconElement>();
</script>

<form
	method="POST"
	action="?/subscribe"
	class="form"
	use:enhance={() => {
		return async ({ result, update }) => {
			await update();
			if (result.type === 'success') void icon?.play({ from: 'start' });
		};
	}}
>
	<lord-icon bind:this={icon} src="/icons/confetti.json"></lord-icon>
	<input
		name="email"
		type="email"
		required
		placeholder="you@example.com"
		aria-label="Email"
		class="input"
	/>
	<button class="button">Subscribe</button>
	<p role="status" class="status">{message}</p>
</form>

<style>
	.form {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
		margin-top: 16px;
	}

	.input {
		min-width: 220px;
		padding: 9px 14px;
		border: 1px solid var(--border);
		border-radius: 999px;
		font: inherit;
	}

	.status {
		flex-basis: 100%;
		min-height: 1.5em;
		color: var(--muted);
	}
</style>
