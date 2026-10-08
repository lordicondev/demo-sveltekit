<script lang="ts">
	import { untrack } from 'svelte';

	/** A toggle: the icon follows the button's `aria-pressed`, which follows Svelte state. */
	let { initialInCart }: { initialInCart: boolean } = $props();

	// Starts from the server's data, once; from there, the button's own.
	let inCart = $state(untrack(() => initialInCart));
</script>

<button type="button" class="button" aria-pressed={inCart} onclick={() => (inCart = !inCart)}>
	<lord-icon
		src="/icons/morph-shopping.json"
		trigger="follow"
		target="button"
		state="morph-select"
		current-color
	></lord-icon>
	In cart
</button>
