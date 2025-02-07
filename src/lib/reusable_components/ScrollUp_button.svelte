<script>
    import Global_arrowScrollUp from '$lib/svg_files/GlobalSVGs/Global_arrowScrollUp.svg'
    import { fly } from 'svelte/transition';
    import { elasticOut, sineInOut } from 'svelte/easing';
    export let scrollToTop;
</script>

<button in:fly={{ delay: 300, duration: 1250, easing: elasticOut, y: '5vh' }} out:fly={{ delay: 300, duration: 250, easing: sineInOut, y: '15vh'}} 
class="scrollUp_button" on:click={scrollToTop}> 
    <img class="arrowIcon" src={Global_arrowScrollUp} alt="MainPage_arrowScrollUp">
</button>

<style>
    .scrollUp_button{
        position: fixed;
        cursor: pointer;
        width: max(3.3rem, 3vw);
        aspect-ratio: 1;
        z-index: 999;
        bottom: 7.5%;
        right: min(7.5%, 3rem + 2vw);
        outline: max(0.25rem, 0.25vw) var(--cyan_outline_bright) solid;
        border: none;
        border-radius: 30%;
        /* overflow: clip; */
        backdrop-filter: blur(max(1vw, 1rem)) brightness(90%);
        background-color: var(--background_color_lightCyan_lowerOpacity075);
        /* box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated); */
        filter: drop-shadow(0 0 max(.5rem, 0.5vw) var(--background_color_lightCyanSaturated));
        padding: 0;
        transition: scale 1s var(--wiggleTransition);
    }
    .arrowIcon{
        width: 52.5%;
        aspect-ratio: 1;
        filter: drop-shadow(0 0 max(.65rem, .65vw) var(--background_color_darkAsHellCyanSaturated));
        transition: translate 1s var(--wiggleTransition);
    }
    .scrollUp_button:hover > .arrowIcon{
        translate: 0 -15%;
        transition: translate 1s var(--wiggleTransition);
    }
    .scrollUp_button:hover{
        scale: 1.1;
        transition: scale 1s var(--wiggleTransition);
    }
    .scrollUp_button:active{
        scale: 1;
        transition: scale 1s var(--wiggleTransition);
    }
</style>