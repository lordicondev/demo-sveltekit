<script lang="ts">
	import type { Snippet } from 'svelte';

	/** One example: the icon, and the attributes that make it. */
	let {
		code,
		dark = false,
		children
	}: { code: string; dark?: boolean; children: Snippet } = $props();
</script>

<figure class={['tile', { dark }]}>
	{@render children()}
	<figcaption>
		<code>{code}</code>
	</figcaption>
</figure>
