<script>
    export let firstLink = "Not set"
    export let secondLink = "Not set"
    export let thirdLink = "Not set"
    export let linkAddress1 = ""
    export let linkAddress2 = ""
    export let linkAddress3 = ""

    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'

</script>

<nav class="navbar_container">
    <div class="navbar_inner" data-sveltekit-preload-code="hover">
        <div class="navbar_list">
            <a href="/{linkAddress1}">{firstLink}</a>
        </div>
        <div class="navbar_list">
            <a href="/{linkAddress2}">{secondLink}</a>
        </div>
        <div class="navbar_list">
            <a href="/{linkAddress3}">{thirdLink}</a>
        </div>
    </div>
</nav>

<style>
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .navbar_container {
        width: 100%;
        container-type: inline-size;
    }
    .navbar_inner {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3vw;
    }
    .navbar_list{
        display: flex;
        align-items: center;
        width: max(25%, 20rem);
        position: relative;
        isolation: isolate;
    }
    .navbar_list > a {
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-decoration: none;
        white-space: nowrap;
        color: var(--text_color_gray90);
        background: radial-gradient(var(--element_background_color_lightestCyan) 40%, var(--background_color_lightCyanSaturated) 125%);
        /* border: max(2px, 0.125vw) var(--text_color_gray90) solid; */
        border: max(4px, 0.250vw) var(--cyan_outline) solid;
        border-radius: 10rem;
        font-size: max(1.5rem, 1.6vw);
        padding-block: max(1vw, 1rem);
        transition: translate 0.15s ease-out, box-shadow 2s ease-out;
    }
    .navbar_list > a:focus-visible{
        outline: 0.20rem var(--background_color_alternativeLightYellow) solid;
        translate: 0 max(0.5rem, 0.40vw);
        box-shadow: inset 0 0 max(1.25rem, 1.25vw) max(0.3rem, 0.3vw) var(--background_color_lightCyanSaturated),
                    0 max(0.5rem, 0.5vw) max(1rem, 1vw) max(0.2rem, 0.2vw) var(--background_color_lightCyanSaturated);
    }
    .navbar_list::before{
        content: '';
        position: absolute;
        top: max(0.6rem, 0.45vw);
        border-radius: max(2.1vw, 2rem);
        width: 100%;
        height: 110%;
        border: max(4px, 0.250vw) var(--cyan_outline) solid;
        background-image: radial-gradient(var(--background_color_lightCyan) 25%, var(--background_color_darkestCyan) 100%);
        background-size: 100% 100%;
        background-position: center top;
        background-repeat: no-repeat;

        z-index: -1;
    }
    .navbar_list > a:hover{
        translate: 0 max(0.5rem, 0.40vw);
        box-shadow: inset 0 0 max(1.25rem, 1.25vw) max(0.3rem, 0.3vw) var(--background_color_lightCyanSaturated),
                    0 max(0.5rem, 0.5vw) max(1rem, 1vw) max(0.2rem, 0.2vw) var(--background_color_lightCyanSaturated);
        transition: translate 0.15s ease-out, box-shadow 0.25s ease-out;
    }
    .navbar_list > a:active{
        animation: buttonActiveAnim 0.3s ease-out;
    }
    @keyframes buttonActiveAnim {
        0%, 100% {
            scale: 1;
        }
        50% {
            scale: 1.05;
        }
    }
    
    @container (inline-size < 1100px) {
        .navbar_inner{
            flex-direction: column;
            gap: max(1.5rem, 3vw);
        }
        .navbar_list{
            width: max(60%, 25rem);
        }
        .navbar_list::before{
            height: 105%;
            border-radius: 1.85rem;
        }
        .navbar_list > a{
            font-size: min(7vw, 1.75rem);
            /* padding-block: 0.75rem; */
            padding-block: max(0.75rem, 1.75vw);
        }
    }
    @container (inline-size < 500px) {
        .navbar_inner{
            gap: 1.6rem;
            /* margin-bottom: 5vh; */
            margin-bottom: 2.5vh;
        }
        .navbar_list{
            width: 100%;
            /* min-width: 15rem; */
        }
        .navbar_list > a{
            font-size: min(7vw, 1.5rem);
            padding-block: 0.8rem 0.75rem;
        }
        .navbar_list > a:hover{
            translate: 0 0;
            box-shadow: none;
        }
    }

    @media (height < 750px) and (width < 950px) {
        .navbar_list > a{
            font-size: min(6vw, 1.6rem);
            padding-block: 0.55rem;
        }
        .navbar_list::before{
            height: 102.5%;
            border-radius: 1.65rem;
        }
    }
</style>