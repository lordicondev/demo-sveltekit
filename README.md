# Lordicon × SvelteKit

Animated [Lordicon](https://lordicon.com/) icons in a SvelteKit app, with
[`@lordicon/element`](https://www.npmjs.com/package/@lordicon/element): icons in any component,
icons that follow Svelte state, and server rendering that does not shift the page.

```sh
npm install
npm run dev        # http://localhost:5173
```

With Node 22.17 or later, as SvelteKit 3 asks.

## Lordicon in your SvelteKit app

**1. Install**

```sh
npm install @lordicon/element
```

**2. Define the element** in the client hooks, `src/hooks.client.ts`. SvelteKit runs `init` once,
in the browser, before the app hydrates:

```ts
import type { ClientInit } from '@sveltejs/kit/hooks';
import { defineElement } from '@lordicon/element';

export const init: ClientInit = () => {
	defineElement();
};
```

**3. Give icons a size** in your global CSS, so that nothing moves while the page loads. Here it
is `src/app.css`, imported in `src/routes/+layout.svelte`:

```css
@layer base {
	lord-icon {
		display: inline-block;
		width: 64px;
		height: 64px;
	}

	lord-icon:not(:defined) > * {
		width: 100%;
		height: 100%;
	}
}
```

In `@layer base`, the rule gives way to your classes, so one icon can take another size:
`class="size-8"`, or `style="width: 32px; height: 32px"`. The layer matters with Tailwind 4: its
classes sit in a layer, and a rule outside any layer would beat them.

**4. Use it**, in any component, with a closing tag (Svelte warns about `<lord-icon />`):

```svelte
<lord-icon src="/icons/lock.json" trigger="hover"></lord-icon>
```

Svelte needs no configuration: a tag with a hyphen is a custom element, and the server sends it as
HTML, with its attributes. No `onMount` or `{#if browser}` around it either.

Pick icons on [lordicon.com](https://lordicon.com/), give them your style and colours there, and
download them as Lottie JSON into `static/`, as here.

## What's inside

| Page                | Shows                                                                                                    | Code                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `/`                 | Triggers, colours, stroke, a colour from CSS, icons in buttons and links                                 | [`src/routes/+page.svelte`](src/routes/+page.svelte)           |
| `/state`            | Attributes from state, `follow` with data from `load`, a process in stages, `play()` after a form action | [`src/routes/state/`](src/routes/state/)                       |
| `/server-rendering` | A placeholder, a size before the script runs, loading on view or interaction, streamed data              | [`src/routes/server-rendering/`](src/routes/server-rendering/) |

The buttons and the form are in [`src/lib/components/`](src/lib/components/); the data and the
form action in each page's `+page.server.ts`.

## Good to know

- Icons do not wait for Svelte: on a page reached by a link, or in a part rendered later, with
  `{#await}` or `{#if}`, they load as soon as they are on the page.
- Prefer `src` to `icon={data}`: the URL is in the server's HTML and the icon loads sooner, and
  the JSON stays out of your JavaScript. `icon={data}` works too: Svelte sets it as a property.
- `bind:this` gives the element, with `play()` and the rest:
  `let icon = $state<LordIconElement>()`, the type from `@lordicon/element`. Its events go to
  `oncomplete`, `onerror` and so on, typed by hand: `(event: CustomEvent<CompleteDetail>) => …`.
- Methods such as `play()` wait for the icon to be ready by themselves. To run code of your own at
  that moment, `await icon.readyPromise`: on a page from the server, the icon can be ready before
  Svelte listens for `ready`.
- No component is needed around the element. For one of your own, an `Icon.svelte` say, pass the
  rest of the props on, and write `<Icon name="lock" trigger="hover" />`:

  ```svelte
  <script lang="ts">
  	let { name, ...rest }: { name: string; [attribute: string]: unknown } = $props();
  </script>

  <lord-icon src="/icons/{name}.json" {...rest}></lord-icon>
  ```

- `defineElement()` takes options, in the same hook: triggers of your own, or `motion: 'always'`
  for every icon.
- Screen readers skip icons: give one an `aria-label` when it means something on its own. When
  the viewer asks for less motion, icons stop animating by themselves.
- Children of `<lord-icon>` show until the icon is ready: a still of the icon, downloaded from
  lordicon.com as SVG, makes a good placeholder.
- Svelte without SvelteKit, as `npm create vite` makes it: `defineElement()` goes in
  `src/main.ts`, and the rest is the same.
- SvelteKit 2 works the same way, with `$lib` rather than `#lib`, and `ClientInit` from
  `@sveltejs/kit`.
- Every attribute and trigger: the
  [`@lordicon/element`](https://www.npmjs.com/package/@lordicon/element) README.

## This project

A new SvelteKit 3 app as `npx sv create` makes it (the minimal template, TypeScript, with
Prettier and ESLint), and plain CSS. Its form action and streamed data need a server, so it runs
on one rather than as a static site; `adapter-auto` picks the adapter for your host.

```sh
npm run lint       # Prettier and ESLint
npm run check      # svelte-check
npm run format     # Prettier
npm run build && npm run preview
```

## License

MIT
