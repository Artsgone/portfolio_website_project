<script>
    import { fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
</script>

<div class="sticky_navbar_container">
    <div class="sticky_navbar_wrapper" transition:fly={{ delay: 100, duration: 250, easing: sineInOut, y: '-50'}}>
        <a href="/portfolio#largeWorksID" class="back_button"> Back </a>
    </div>
</div>


<style>
    :global(body)::-webkit-scrollbar {
        display: block;
    }
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }

    .sticky_navbar_container{
        width: 100%;
        height: 10vh;
        position: fixed;
        z-index: 999;

        display: flex;
        align-items: center;
        justify-content: center
    }
    .sticky_navbar_wrapper{
        width: 90%;
        border-radius: max(1vw, 1rem);
        /* backdrop-filter: blur(1rem); */
    }

    .back_button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: max(10%, 7.5rem);
        height: 7vh;
        font-size: max(1.5rem, 1.5vw);
        text-decoration: none;
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        color: var(--text_color_gray5);
        background-color: var(--background_color_lightCyan_lowerOpacity025);
        backdrop-filter: blur(1rem);

        border: max(4px, 0.250vw) var(--background_color_lightCyan) solid;
        border-radius: max(1vw, 1rem);
        filter: drop-shadow(0 0 max(.4rem, .4vw) var(--background_color_darkCyanSaturated));
    }
</style>