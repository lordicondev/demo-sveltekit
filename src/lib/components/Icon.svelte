<script>
  import { onMount } from 'svelte';
  import lottie from "lottie-web";
  
  onMount(async () => {
    const { defineElement } = await import('@lordicon/element');

    // define "lord-icon" custom element with default properties
    defineElement(lottie.loadAnimation);
  });
    
  export let name = "puzzle";

  const src = `/${name}.json`;
</script>

<style>
  lord-icon {
    width: 128px;
    height: 128px;
  }
</style>

<lord-icon
    {src}
    trigger="hover">
</lord-icon>