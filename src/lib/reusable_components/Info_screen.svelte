<script>
    import { fly, scale } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    import Global_loadingAnimation from '$lib/svg_files/GlobalSVGs/Global_loadingAnimation.svg'
    import Global_closeIcon from '$lib/svg_files/GlobalSVGs/Global_closeIcon.svg'
    export let closeInfoScreen;

</script>

<div in:fly={{ delay: 100, duration: 250, easing: sineInOut, y: '-100'}} out:scale={{ delay: 0, duration: 300, start: 0.9, easing: sineInOut }} class="loader_animation"> 
    <img class="loadingSpinner" src={Global_loadingAnimation} alt="*"> 
    Your email has been sent! 
    <button class="closeButton" on:click={closeInfoScreen}> <img class="Global_closeIcon" src={Global_closeIcon} alt="Global_closeIcon"> </button>
    
 </div>

<style>
    .loader_animation{
        position: fixed;
        z-index: 9999;
        background: radial-gradient(var(--background_color_lightCyan) 55%, var(--background_color_lightCyanSaturated) 125%);
        inset: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Brolimo', system-ui, sans-serif;
        font-size: var(--text_size_medium_big);
        color: var(--text_color_gray5);
        border-radius: max(1vw, 1rem);

        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: max(2vh, 2vw);
        padding-inline: max(2vw, 1.5rem);
        box-shadow: 0 max(0.5vw, 0.5vh) max(2rem, 2vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated);
    }
    .loadingSpinner{
        width: max(7.5rem, 10vw);
        animation: rotateInfinately 5s linear 0.5s infinite;
    }
    
    .closeButton{
        position: absolute;
        cursor: pointer;
        width: max(3.3rem, 3vw);
        aspect-ratio: 1;
        z-index: 9999;
        top: min(7.5%, 2rem + 2vw);
        right: min(5%, 3rem + 2vw);
        outline: max(0.25rem, 0.25vw) var(--background_color_lightCyan) solid;
        border: none;
        border-radius: 30%;
        overflow: clip;
        backdrop-filter: blur(5px) invert(25%);
        background-color: var(--background_color_lightCyan_lowerOpacity);
        box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated);

        transition: scale 0.15s ease-out, box-shadow 0.2s ease-in-out;
    }
    
    .Global_closeIcon{
        width: 70%;
        aspect-ratio: 1;
        filter: drop-shadow(0 0 max(.4rem, .4vw) var(--background_color_darkCyanSaturated));
    }
    .closeButton:hover > .Global_closeIcon{
        animation: closeIcon_animation .5s ease-in-out;
    }
    .closeButton:hover{
        animation: close_button_animation .5s ease-in-out;
    }
    
    @keyframes rotateInfinately{
        0%{
            rotate: 0deg
        }
        100%{
            rotate: 360deg;
        }
    }

    @keyframes closeIcon_animation{
        0%, 100% {
            rotate: 0deg;
            scale: 1;
        }
        25%{
            rotate: 5deg;
            scale: 0.85;
        }
        65%{
            rotate: -10deg;
            scale: 0.85;
        }
    }
    @keyframes close_button_animation{
        0%, 100% {
            box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated);
        }
        50%{
            box-shadow: 0 0 max(1.5rem, 1.5vw) max(0.15rem, 0.15vw) var(--background_color_lightCyanSaturated);
        }
    }

    @media (width < 1000px) {
        .loader_animation{
            inset: 30% 10%;
            font-size: min(7vw, 1.75rem);
        }
    }
</style>