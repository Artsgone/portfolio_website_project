<script>
    import A_Logo from '$lib/svg_files/A_Logo.svg'
    export let title_Decor_ID = ""
    import MainPage_titlePageDecor from '$lib/svg_files/MainPage/MainPage_titlePageDecor.svg'
    import AboutMe_OutlineTitleDecorSVG from '$lib/svg_files/AboutMe/AboutMe_OutlineTitleDecorSVG.svg'
    import Portfolio_OutlineTitleDecor from '$lib/svg_files/Portfolio/Portfolio_OutlineTitleDecor.svg'
    import Contact_OutlineTitleDecor from '$lib/svg_files/Contact/Contact_OutlineTitleDecor.svg'
</script>

<header class="header">
    <div class="header_inside">
        <div class="inner_header left">
            <img id="A_Logo" src={A_Logo} alt="A_Logo">
        </div>
        <div class="inner_header right">
            {#if title_Decor_ID === "mainpage"}
                <img class="title_Decor" src={MainPage_titlePageDecor} alt="title_Decor">
            {:else if title_Decor_ID === "aboutme"}
                <img class="title_Decor" src={AboutMe_OutlineTitleDecorSVG} alt="title_Decor">
            {:else if title_Decor_ID === "portfolio"}
                <img class="title_Decor" src={Portfolio_OutlineTitleDecor} alt="title_Decor">
            {:else}
                <img class="title_Decor" src={Contact_OutlineTitleDecor} alt="title_Decor">
            {/if}
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
        translate: 0 1vh;
    }
    .title_Decor{
        width: max(21vw, 20rem);
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
            width: min(12.5vh, 6rem);
            padding-block: 4vh 0.5rem;
            translate: 0 0vh;
        }
        .inner_header.left{
            width: 100%;
        }
    }
</style>