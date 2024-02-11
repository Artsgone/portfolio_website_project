<script>
    export let firstLink = "Not set"
    export let secondLink = "Not set"
    export let thirdLink = "Not set"
    export let linkAddress1 = ""
    export let linkAddress2 = ""
    export let linkAddress3 = ""

    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'
    // import NavbarDecorHover1 from '$lib/svg_files/GlobalSVGs/Global_Decor_Navbar.svg'
    // import NavbarDecorHover2 from '$lib/svg_files/GlobalSVGs/Global_Decor1_Navbar.svg'

</script>

<nav class="navbar_container">
    <div class="navbar_inner">
        <div class="navbar_list">
            <a href="/{linkAddress1}">{firstLink}</a>
            <!-- <img class="NavbarDecorHover1" src={NavbarDecorHover1} alt="NavbarDecorHover1">
            <img class="NavbarDecorHover2" src={NavbarDecorHover2} alt="NavbarDecorHover2"> -->
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
        font-family: 'Neutral_Normal';
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-decoration: none;
        white-space: nowrap;
        color: var(--text_color_gray90);
        background-color: var(--element_background_color_lightestCyan);
        border: max(2px, 0.125vw) var(--text_color_gray90) solid;
        border-radius: 10rem;
        font-size: max(1.5rem, 1.6vw);
        padding-block: max(1vw, 0.8rem);
        transition: all 0.15s ease-out;
    }
    .navbar_list::before{
        content: '';
        position: absolute;
        top: max(0.6rem, 0.25vw);
        border-radius: max(2.1vw, 2rem);
        width: 100%;
        height: 110%;
        border: max(2px, 0.125vw) var(--text_color_gray90) solid;
        z-index: -1;
    }
    .navbar_list > a:hover{
        translate: 0 max(0.5rem, 0.25vw);
        box-shadow: inset 0 0 1.25rem 0.2rem var(--background_color_lightCyanSaturated),
                    0 0.5rem 1rem 0.1rem var(--background_color_lightCyanSaturated);
    }
    
    @container (inline-size < 800px) {
        .navbar_inner{
            flex-direction: column;
            gap: max(1.5rem, 3vw);
        }
        .navbar_list{
            width: max(60%, 25rem);
        }
        .navbar_list::before{
            height: 105%;
            border-radius: 2rem;
        }
        .navbar_list > a{
            font-size: min(7vw, 1.5rem);
            padding-block: 0.75rem;
            padding-block: max(0.25rem, 1.25vw);
        }
    }
    @container (inline-size < 500px) {
        .navbar_inner{
            gap: 1.6rem;
            margin-bottom: 5vh;
        }
        .navbar_list{
            width: 100%;
            min-width: 15rem;
        }
        .navbar_list > a{
            padding-block: 0.7rem;
        }
        .navbar_list > a:hover{
            translate: 0 0;
            box-shadow: none;
        }
    }

    @media (height < 750px) and (width < 950px) {
        .navbar_list > a{
            font-size: min(6vw, 1.75rem);
            padding-block: 0.5rem;
        }
        .navbar_list::before{
            height: 102.5%;
            border-radius: 2rem;
        }
    }
</style>