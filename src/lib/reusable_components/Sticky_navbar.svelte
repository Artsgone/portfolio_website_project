<script>
    import { fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    // import '$lib/styles_and_fonts/fonts.css'
    // import '$lib/styles_and_fonts/styles.css'
    import backButtonArrow from '$lib/svg_files/GlobalSVGs/Global_arrowBack.svg'

    export let anchorLinkToLargeWork = "#largeWorksSection"
</script>

<div class="sticky_navbar_container">
    <div class="sticky_navbar_wrapper" >
        <a transition:fly={{ delay: 100, duration: 250, easing: sineInOut, y: '-50'}} href="/portfolio{anchorLinkToLargeWork}" class="back_button"> 
            <img class="backButtonArrow" src={backButtonArrow} alt="backButtonArrow">Back
        </a>
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
        top: 0;
        width: 100%;
        height: max(12.5vh, 5rem);
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
        gap: 0 max(0.75vw, 0.75rem);
        width: max(10%, 9.5rem);
        height: max(7vh, 3.5rem);
        font-size: max(1.4rem, 1.4vw);
        text-decoration: none;
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        color: var(--text_color_gray5);
        backdrop-filter: blur(max(1vw, 1rem)) brightness(90%);
        background-color: var(--background_color_lightCyan_lowerOpacity075);
        /* box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated); */
        filter: drop-shadow(0 0 max(.5rem, 0.5vw) var(--background_color_lightCyanSaturated));

        border: max(4px, 0.250vw) var(--background_color_lightCyan) solid;
        border-radius: max(1vw, 1rem);
        transition: scale 1s var(--wiggleTransition);
    }
    .backButtonArrow{
        height: 45%;
        aspect-ratio: 1;
        transition: translate 1s var(--wiggleTransition), scale 1s var(--wiggleTransition);
        filter: drop-shadow(0 0 max(.75rem, .75vw) var(--background_color_darkCyanSaturated));
    }
    .back_button:hover > .backButtonArrow{
        translate: -20% 0;
        scale: 1.1;
    }
    .back_button:hover{
        scale: 1.05;
    }
    .back_button:active{
        scale: 1;
    }
</style>