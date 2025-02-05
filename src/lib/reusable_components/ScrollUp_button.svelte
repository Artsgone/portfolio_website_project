<script>
    import Global_arrowScrollUp from '$lib/svg_files/GlobalSVGs/Global_arrowScrollUp.svg'
    import { fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    export let scrollToTop;
</script>

<button transition:fly={{ delay: 300, duration: 250, easing: sineInOut, y: '100'}} class="scrollUp_button" on:click={scrollToTop}> <img class="arrowIcon" src={Global_arrowScrollUp} alt="MainPage_arrowScrollUp"></button>

<style>
    .scrollUp_button{
        position: fixed;
        cursor: pointer;
        width: max(3.3rem, 3vw);
        aspect-ratio: 1;
        z-index: 999;
        bottom: 7.5%;
        right: min(7.5%, 3rem + 2vw);
        outline: max(0.25rem, 0.25vw) var(--background_color_lightCyan) solid;
        border: none;
        border-radius: 30%;
        /* overflow: clip; */
        backdrop-filter: blur(5px) invert(25%);
        background-color: var(--background_color_lightCyan_lowerOpacity);
        /* box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated); */
        filter: drop-shadow(0 0 max(.5rem, .5vw) var(--background_color_lightCyanSaturated));
        padding: 0;
    }
    .arrowIcon{
        width: 52.5%;
        aspect-ratio: 1;
        filter: drop-shadow(0 0 max(.5rem, .5vw) var(--background_color_darkCyanSaturated));
    }
    .scrollUp_button:hover > .arrowIcon{
        animation: arrowIcon_animation .5s ease-in-out;
    }
    .scrollUp_button:hover{
        animation: scrollUp_button_animation .5s ease-in-out;
    }

    @keyframes arrowIcon_animation{
        0%, 100% {
            translate: 0 0%;
        }
        50%{
            translate: 0 -15%;
        }
        60%{
            translate: 0 -20%;
        }
        90%{
            translate: 0 5%;
        }
    }
    @keyframes arrowIcon_animation_click{
        0%{
            translate: 0 0%;
        }
        50%{
            translate: 0 -17.5%;
        }
        60%{
            translate: 0 -20%;
        }
        90%{
            translate: 0 -15%;
        }
        100%{
            translate: 0 -20%;
        }
    }
    /* @keyframes scrollUp_button_animation{
        0%, 100% {
            box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated);
        }
        50%{
            box-shadow: 0 0 max(1.5rem, 1.5vw) max(0.15rem, 0.15vw) var(--background_color_lightCyanSaturated);
        }
    } */
</style>