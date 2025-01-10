<script>
    import A_Logo from '$lib/svg_files/A_Logo.svg'
    export let headerDecorSVG = ""
</script>

<header class="header">
    <div class="header_inside">
        <div class="inner_header left">
            <img id="A_Logo" src={A_Logo} alt="A_Logo">
        </div>
        <div class="inner_header right">
            <img class="title_Decor" src={headerDecorSVG} alt="title_Decor">
        </div>
    </div>
</header>

<style>
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }
    .header{
        width: 100%;
        container-type: inline-size;
    }
    .header_inside{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .inner_header{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .inner_header.right{
        align-items: start;
    }
    #A_Logo{
        width: max(10vh, 6rem);
        width: max(5svw, 6rem);
        translate: 0 1vh;
    }
    .title_Decor{
        width: max(21vw, 22rem);
    }

    @container (inline-size < 800px) {
        .header_inside{
            display: grid;
            place-content: center;
        }
        .title_Decor{
            display: none;
            width: 0;
        }
        #A_Logo{
            width: min(12.5vh, 5rem);
            padding-block: 3.5vh 0;
            translate: 0 0vh;
        }
        .inner_header.left{
            width: 100%;
        }
    }
</style>