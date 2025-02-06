<script>
    import { fade } from 'svelte/transition';
    import { quadIn, quadOut } from 'svelte/easing';

    import Global_loadingAnimation from '$lib/svg_files/GlobalSVGs/Global_loadingAnimation.svg'
    // import Global_loadingAnimationWebp from '$lib/svg_files/GlobalSVGs/Global_loadingAnimation.webp'

    export let fadeDuration = 250;
    export let fadeDelay = 100;
</script>

<div in:fade={{ delay: 0, duration: fadeDuration, easing: quadIn}} out:fade={{ delay: fadeDelay|0, duration: 500, easing: quadOut}} class="loader_animation" fetchpriority="high">
    <!-- <img class="loadingSpinner" src={Global_loadingAnimationWebp} fetchpriority="high" alt="*"> -->
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
        animation: loadingSpinner 15s var(--wiggleTransition) alternate infinite, scaleSpinner 4s var(--wiggleTransition) infinite;
    }

    @keyframes loadingSpinner{
        0%{
            rotate: 0deg;
        }
        50%{
            rotate: 360deg;
        }
        100%{
            rotate: 0deg;
        }
    }
    @keyframes scaleSpinner{
        0%{
            scale: 1;
        }
        25%{
            scale: 0.8;
        }
        50%{
            scale: 0.9;
        }
        75%{
            scale: 0.8;
        }
        100%{
            scale: 1;
        }
    }
</style>