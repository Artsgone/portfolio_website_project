<script>
    export let firstLink = "Not set"
    export let secondLink = "Not set"
    export let thirdLink = "Not set"
    export let linkAddress1 = ""
    export let linkAddress2 = ""
    export let linkAddress3 = ""
    export let titleName = ""
    export let footer_Decor_ID = ""
    export let snap_align = 'end'

    import Portfolio_FooterDecor from '$lib/svg_files/Portfolio/Portfolio_FooterDecor.svg'
    import AboutMe_FooterDecor from '$lib/svg_files/AboutMe/AboutMe_FooterDecor.svg'
    import MainPage_FooterDecor from '$lib/svg_files/MainPage/MainPage_footerDecor.svg'
    import Contact_FooterDecor from '$lib/svg_files/Contact/Contact_FooterDecor.svg'

    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'

    let authorName_element = false;
    function animate_troll(){
        authorName_element = true;
    }
</script>

<footer class="footer_container">
    <div class="content_container footer" style="scroll-snap-align: {snap_align};">
        <nav class="footer_top">
            <div class="navbar_list">
                <a class="first" href="/{linkAddress1}">{firstLink}</a>
            </div>
            <div class="navbar_list">
                <a class="second" href="/{linkAddress2}">{secondLink}</a>
            </div>
            <div class="navbar_list">
                <a class="third" href="/{linkAddress3}">{thirdLink}</a>
            </div>
        </nav>
        
        <div class="titleName">{titleName}</div>
        
        <div class="footer_bottom">
            <div tabindex="0" role="button" class="authorName" class:troll={authorName_element} on:mousedown={animate_troll}>
                <!-- web by Artem Damin -->
                artem damin by web
            </div>
            {#if footer_Decor_ID === "mainpage"}
                    <img class="footer_Decor" src={MainPage_FooterDecor} alt="footer_Decor">
                {:else if footer_Decor_ID === "aboutme"}
                    <img class="footer_Decor" src={AboutMe_FooterDecor} alt="footer_Decor">
                {:else if footer_Decor_ID === "portfolio"}
                    <img class="footer_Decor" src={Portfolio_FooterDecor} alt="footer_Decor">
                {:else}
                    <img class="footer_Decor" src={Contact_FooterDecor} alt="footer_Decor">
                {/if}
        </div>
    </div>
</footer>


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
    .footer_container{
        width: 100%;
        /* height: max(37.5vw, 47.5vh); */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* background-color: var(--background_color_lightCyan); */
        background: radial-gradient(var(--background_color_lightCyan) 55%, var(--background_color_lightCyanSaturated) 125%);
        position: relative;
        z-index: 0;

        scroll-snap-stop: always;
    }
    .content_container.footer{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        overflow-y: hidden;
        height: 100%;
        width: 95%;
        gap: max(3rem, 3.5vw);
        padding-top: max(3.5vw, 2.5rem);
        /* container: footer / size; */
    }
    .footer_top {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3.2vw;
    }
    .navbar_list{
        display: flex;
        justify-content: center;
        align-items: center;
        width: max(25%, 12.5rem);
        position: relative;
        isolation: isolate;
    }
    .navbar_list > a {
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-decoration: none;
        white-space: nowrap;
        color: var(--text_color_gray90);
        /* background-color: var(--element_background_color_lightestCyan); */
        background: radial-gradient(var(--element_background_color_lightestCyan) 30%, var(--background_color_lightCyanSaturated) 145%);
        border: max(4px, 0.250vw) var(--cyan_outline) solid;
        border-radius: 50rem;
        font-size: max(1.7vw, 1rem);
        padding-block: max(1vw, 0.8rem);
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
    .titleName{
        font-family: 'Brolimo', system-ui, sans-serif;
        font-size: max(11.25vw, 3.5rem);
        text-wrap: nowrap;
    }
    .footer_bottom{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr max(5rem, 5vw);
        justify-items: center;
    }
    .authorName{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_transparent);
        border-radius: 50rem;
        border: max(4px, 0.250vw) var(--cyan_outline) solid;
        position: relative;
        font-family: 'Neutral_Bold', system-ui, sans-serif;
        letter-spacing: max(0.025vw, 0.035rem);
        align-self: flex-start;
        display: flex;
        align-items: center;
        justify-content: center;
        word-break: keep-all;
        font-size: max(1.3vw, 1rem);
        padding-block: max(1.15vw, 1rem);
        padding-inline: max(2vw, 1.5rem);
        box-shadow: inset 0px max(3.1vw, 2.5rem) var(--background_color_darkestCyan), inset 0px calc(max(3.1vw, 2.5rem) + max(4px, 0.225vw)) var(--cyan_outline);
    }
    
    .authorName::before{
        content: "web by Artem Damin";
        box-sizing: content-box;
        color: var(--cyan_outline);
        
        background: radial-gradient(var(--background_color_lightCyan) 60%, var(--cyan_outline) 125%);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: absolute;
        padding-bottom: max(1.1rem, 0.95vw);
        border-radius: max(1.75rem, 2.2vw);
        top: 0;
        width: 100%;
        height: 165%;
        /* border: max(2px, 0.125vw) var(--text_color_gray90) solid; */
        border: max(4px, 0.250vw) var(--cyan_outline) solid;
        z-index: -1;
    }
    .authorName.troll::before{
        animation: troll_animation 2.5s linear;
    }
    @keyframes troll_animation{
        0%, 100%{
            background: none;
            background-color: var(--background_color_lightCyan);
        }
        20%{
            background-color: hsla(46, 100%, 50%);
        }
        40% {
            background-color: hsl(140, 100%, 50%);
        }
        60% {
            background-color: hsla(231, 100%, 50%);
        }
        60% {
            background-color: hsla(281, 100%, 50%);
        }
        80%{
            background-color: hsla(0, 100%, 50%);
        }
    }
    .footer_Decor{
        width: max(25rem, 60%);
        align-self: flex-end;
        grid-area: 1 / 2 / 3 / 4;
        /* z-index: -1; */
    }

    @media(width < 950px) {
        .authorName::before{
            height: 157.5%;
            padding-bottom: 0.75rem;
        }
        .navbar_list::before{
            height: 102.5%;
        }
        .footer_Decor{
            display: none;
        }
        .footer_bottom{
            grid-template-columns: 1fr;
            grid-template-rows: 1fr max(5rem, 5vw);
        }
        .navbar_list > a:hover{
            box-shadow: none;
        }
    }
    @media (width < 700px) {
        .titleName{
            font-size: min(16vw, 5rem);
        }
        .footer_top{
            gap: 0;
        }
        .navbar_list:nth-child(2) {
            width: max(25%, 11.5rem);
        }

        .authorName{
            font-size: min(5vw, 1rem);
        }
        .navbar_list > a{
            font-size: min(4vw, 1rem);
        }
        .navbar_list > a.first {
            border-radius: 10rem 0 0 10rem;
            padding-left: 1.75vw;
        }
        .navbar_list > a.second {
            border-inline: none;
            border-radius: 0 0 0 0;
        }
        .navbar_list > a.third {
            border-radius: 0 10rem 10rem 0;
            padding-right: 1.75vw;
        } 

        .navbar_list:nth-child(1)::before{
            border-radius: 10rem 0 0 10rem;
        }
        .navbar_list:nth-child(2)::before{
            border-inline: none;
            border-radius: 0 0 0 0;

        }
        .navbar_list:nth-child(3)::before{
            border-radius: 0 10rem 10rem 0;
        }
        .navbar_list > a:hover{
            translate: 0 0;
            box-shadow: none;
        }
    }
    
</style>