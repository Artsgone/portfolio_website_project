<script>
    import { fade } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';

    import '$lib/styles_and_fonts/styles.css'
    import Global_loadingAnimation from '$lib/svg_files/GlobalSVGs/Global_loadingAnimation.svg'

    // export let fadeDuration = 250;
    // export let fadeDelay = 150;
</script>

<div in:fade={{ delay: 0, duration: 100, easing: sineInOut}} out:fade={{ delay: 150, duration: 600, easing: sineInOut}} class="loader_animation">
    <object class="loadingSpinner" data={Global_loadingAnimation} type="image/svg+xml" aria-label="loading"></object>
</div>

<style>
    .loader_animation{
        position: fixed;
        z-index: 9999;
        /* background: radial-gradient(var(--background_color_lightCyan) 30%, var(--background_color_darkCyan) 150%); */
        background-color: var(--background_color_lightCyan);
        inset: -10% -10% -10% -10%;
        display: flex;
        align-items: center;
        justify-content: center;

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