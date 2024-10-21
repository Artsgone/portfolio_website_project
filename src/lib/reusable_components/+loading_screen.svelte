<script>
    import { onMount } from "svelte";
    import { fade, blur, fly, slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    
    $: pageLoaded = false;
    onMount(() => {
        pageLoaded = true;
    });

</script>

<main>
    {#if !pageLoaded}
        <div transition:blur={{ delay: 100, duration: 500, amount: 10 }} class="loader_animation"></div>
    {/if}
</main>

<style>
    .loader_animation{
        position: fixed;
        z-index: 9999;
        background-color: var(--background_color_lightCyan);
        inset: 0 0 0 0;
    }
</style>