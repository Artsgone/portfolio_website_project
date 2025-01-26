<script>
    import { fade } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';

    import Global_loadingAnimation from '$lib/svg_files/GlobalSVGs/Global_loadingAnimation.svg'
    // import Global_loadingAnimationWebp from '$lib/svg_files/GlobalSVGs/Global_loadingAnimation.webp'

    export let fadeDuration = 250;
    export let fadeDelay = 100;

    // let displayLoadingImage = false
    // function loadFallback() {
    //     displayLoadingImage = true
    // }
</script>

<div in:fade={{ delay: 0, duration: fadeDuration, easing: sineInOut}} out:fade={{ delay: fadeDelay|0, duration: 500, easing: sineInOut}} class="loader_animation" fetchpriority="high">
    <!-- <img class="loadingSpinner" src={Global_loadingAnimationWebp} fetchpriority="high" alt="*"> -->
    <!-- <img fetchpriority="high" class="loadingSpinner" class:renderOut={displayLoadingImage} src={Global_loadingAnimation} alt="*" on:error={loadFallback}> -->
    <object class="loadingSpinner" data={Global_loadingAnimation} type="image/svg+xml" aria-label="loading"></object>
    
</div>

<style>
    .loader_animation{
        position: fixed;
        z-index: 9999;
        background: radial-gradient(var(--background_color_lightCyan) 55%, var(--background_color_lightCyanSaturated) 125%);
        inset: -10% -10% -10% -10%;
        display: flex;
        align-items: center;
        justify-content: center;
        /* font-family: 'Brolimo', system-ui, sans-serif;
        font-size: var(--text_size_medium_big);
        color: var(--text_color_gray5); */

        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .loadingSpinner{
        width: max(10rem, 12.5vw);
        transform-origin: center;
        translate: 0 -2.5%;
        animation: loadingSpinner 2s ease-out alternate both infinite, scaleSpinner 1s ease-out forwards infinite;
    }

    /* .loadingSpinnerPlaceholder{
        background: radial-gradient(var(--background_color_lightCyan) 55%, var(--background_color_lightCyanSaturated) 125%);
        width: max(7.5rem, 10vw);
        border-radius: 25%;
        aspect-ratio: 1;
        translate: 0 -2.5%;
        animation: loadingSpinner 2s ease-in-out alternate both infinite, scaleSpinner 1s ease-out forwards infinite;
    } */

    @keyframes loadingSpinner{
        0%{
            rotate: 0deg;
        }
        25%{
            rotate: 160deg;
        }
        50%{
            rotate: 220deg;
        }
        75%{
            rotate: 300deg;
        }
        100%{
            rotate: 360deg;
        }
    }
    @keyframes scaleSpinner{
        0%{
            scale: 1;
        }
        25%{
            scale: 0.9;
        }
        50%{
            scale: 0.95;
        }
        75%{
            scale: 0.9;
        }
        100%{
            scale: 1;
        }
    }
</style>