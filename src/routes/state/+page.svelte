<script lang="ts">
	import CartButton from '#lib/components/CartButton.svelte';
	import DownloadButton from '#lib/components/DownloadButton.svelte';
	import SubscribeForm from '#lib/components/SubscribeForm.svelte';
	import type { PageProps } from './$types';

	// `data` from the page's `load`, `form` from its action: both in +page.server.ts.
	let { data, form }: PageProps = $props();

	let color = $state('#08a88a');
	let stroke = $state('regular');
</script>

<svelte:head>
	<title>Svelte state · Lordicon × SvelteKit</title>
</svelte:head>

<h1>Icons that follow Svelte state</h1>
<p class="lead">
	Svelte state goes into an icon's attributes, as into any element's, and the icon follows: a new
	look at once, or, with <code>trigger="follow"</code>, an animation. Nothing else to wire up: no
	effects.
</p>

<h2>Attributes from state</h2>
<p class="note">
	<code>colors="primary:{'{color}'}"</code> and <code>{'{stroke}'}</code> take their values from
	<code>$state</code>, bound to the inputs. Pick another colour or stroke.
</p>
<div class="actions">
	<lord-icon src="/icons/lock.json" trigger="hover" colors="primary:{color}" {stroke}></lord-icon>
	<label class="field">
		Colour
		<input type="color" bind:value={color} />
	</label>
	<label class="field">
		Stroke
		<select bind:value={stroke}>
			<option>light</option>
			<option>regular</option>
			<option>bold</option>
		</select>
	</label>
</div>

<h2>A toggle, from the server's data</h2>
<p class="note">
	Each button carries <code>aria-pressed</code>. The products come from the page's server
	<code>load</code>, and the headphones are in the cart when the page arrives: their icon starts on
	the second look, without playing. Click to see it morph.
</p>
<ul class="products">
	{#each data.products as product (product.id)}
		<li class="product">
			<span>
				{product.name} <span class="price">{product.price}</span>
			</span>
			<CartButton initialInCart={product.inCart} />
		</li>
	{/each}
</ul>

<h2>A process, in stages</h2>
<p class="note">
	<code>follow(data-state, busy=loop-cycle, done=morph-check)</code> gives each value its animation: a
	loop while busy, a check when done, and back.
</p>
<div class="actions">
	<DownloadButton />
</div>

<h2>Played from code, after a form action</h2>
<p class="note">
	<code>bind:this</code> gives the element, with <code>play()</code>. The form posts the address to
	a form action, and with <code>use:enhance</code> the icon plays when the server has answered.
</p>
<SubscribeForm message={form?.message} />

<p class="next">
	<a href="/server-rendering" class="link">Next: server rendering →</a>
</p>

<style>
	.field {
		display: inline-flex;
		gap: 8px;
		align-items: center;
	}

	.field select {
		padding: 4px 8px;
		font: inherit;
	}

	.products {
		max-width: 480px;
		margin-top: 16px;
		list-style: none;
	}

	.product {
		display: flex;
		gap: 16px;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0;
		border-bottom: 1px solid var(--border);
	}

	.price {
		margin-left: 6px;
		color: var(--muted);
	}

	.next {
		margin-top: 48px;
	}
</style>
