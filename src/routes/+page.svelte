<script lang="ts">
	import ExampleTile from '#lib/components/ExampleTile.svelte';
</script>

<svelte:head>
	<title>Lordicon × SvelteKit</title>
</svelte:head>

<h1>Animated icons in a SvelteKit app</h1>
<p class="lead">
	<code>&lt;lord-icon&gt;</code> goes straight into any component, like this page's. Its attributes say
	what the icon is and when it plays. Hover, click or scroll.
</p>

<h2>Triggers</h2>
<div class="grid">
	<ExampleTile code={'trigger="hover"'}>
		<lord-icon src="/icons/lock.json" trigger="hover"></lord-icon>
	</ExampleTile>
	<ExampleTile code={'trigger="click"'}>
		<lord-icon src="/icons/coins.json" trigger="click" state="hover-jump"></lord-icon>
	</ExampleTile>
	<ExampleTile code={'trigger="loop"'}>
		<lord-icon src="/icons/coins.json" trigger="loop" state="loop-spin"></lord-icon>
	</ExampleTile>
	<ExampleTile code={'trigger="morph"'}>
		<lord-icon src="/icons/lock.json" trigger="morph" state="morph-unlocked"></lord-icon>
	</ExampleTile>
	<ExampleTile code={'trigger="in"'}>
		<lord-icon src="/icons/puzzle.json" trigger="in" state="in-reveal"></lord-icon>
	</ExampleTile>
</div>

<h2>Looks</h2>
<p class="note">
	The last icon takes its colour from CSS, as on a dark theme: <code>--lord-icon-primary</code>, in
	<code>app.css</code>.
</p>
<div class="grid">
	<ExampleTile code={'colors="primary:…,secondary:…"'}>
		<lord-icon src="/icons/puzzle.json" trigger="hover" colors="primary:#e83a30,secondary:#f9a400"
		></lord-icon>
	</ExampleTile>
	<ExampleTile code={'stroke="bold"'}>
		<lord-icon src="/icons/lock.json" trigger="hover" stroke="bold"></lord-icon>
	</ExampleTile>
	<ExampleTile code="--lord-icon-primary" dark>
		<lord-icon src="/icons/coins.json" trigger="hover"></lord-icon>
	</ExampleTile>
</div>

<h2>In buttons and links</h2>
<p class="note">
	<code>target</code> plays the icon when the pointer is anywhere on the button, and
	<code>current-color</code> gives it the colour of the text.
</p>
<div class="actions">
	<button type="button" class="button">
		<lord-icon src="/icons/download.json" trigger="hover" target="button" current-color></lord-icon>
		Download
	</button>
	<a href="/state" class="link">
		<lord-icon src="/icons/morph-account.json" trigger="hover" target="a" current-color></lord-icon>
		Next: icons that follow Svelte state
	</a>
</div>
