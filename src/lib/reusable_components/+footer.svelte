<script>
    export let firstLink = "Not set"
    export let secondLink = "Not set"
    export let thirdLink = "Not set"
    export let linkAddress1 = ""
    export let linkAddress2 = ""
    export let linkAddress3 = ""
    export let titleName = ""
    export let footer_Decor_ID = ""
    import Portfolio_FooterDecor from '$lib/svg_files/Portfolio/Portfolio_FooterDecor.svg'
    import AboutMe_FooterDecor from '$lib/svg_files/AboutMe/AboutMe_FooterDecor.svg'
    import MainPage_FooterDecor from '$lib/svg_files/MainPage/MainPage_FooterDecor.svg'
    import Contact_FooterDecor from '$lib/svg_files/Contact/Contact_FooterDecor.svg'

    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'
</script>

<footer class="footer_container">
    <div class="content_container footer">
        <nav class="footer_top">
            <div class="navbar_list">
                <a href="/{linkAddress1}">{firstLink}</a>
            </div>
            <div class="navbar_list">
                <a href="/{linkAddress2}">{secondLink}</a>
            </div>
            <div class="navbar_list">
                <a href="/{linkAddress3}">{thirdLink}</a>
            </div>
        </nav>
        
        <div class="titleName">{titleName}</div>
        
        <div class="footer_bottom">
            <div class="authorName">
                <!-- web by Artem Damin -->
                what the hell u doin?
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
        height: max(40vw, 57.5vh);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightCyan);
        position: relative;
        z-index: 0;
    }
    .content_container.footer{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        overflow-y: hidden;
        height: 100%;
        width: 95%;
        padding-top: max(3.5vw, 2.5rem);
        container: footer / size;
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
        font-family: 'Neutral_Normal';
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-decoration: none;
        white-space: nowrap;
        color: var(--text_color_gray90);
        background-color: var(--element_background_color_lightestCyan);
        border: max(2.5px, 0.125vw) var(--text_color_gray90) solid;
        border-radius: 10rem;
        font-size: max(1.7vw, 1rem);
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
        border: max(2.5px, 0.125vw) var(--text_color_gray90) solid;
        z-index: -1;
}
    .navbar_list > a:hover{
        translate: 0 max(0.5rem, 0.25vw);
        box-shadow: inset 0 0 1.25rem 0.1rem var(--background_color_lightCyanSaturated),
                    0 0.5rem 1rem 0.1rem var(--background_color_lightCyanSaturated);
    }
    .titleName{
        font-family: 'Brolimo';
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
        border: max(2.5px, 0.125vw) var(--text_color_gray90) solid;
        position: relative;
        font-family: 'Neutral_Normal';
        align-self: flex-start;
        display: flex;
        align-items: center;
        justify-content: center;
        word-break: keep-all;
        font-size: max(1.3vw, 1rem);
        padding-block: max(1.15vw, 1rem);
        padding-inline: max(2vw, 1.5rem);
        box-shadow: inset 0px max(3.1vw, 2.5rem) var(--background_color_darkestCyan), inset 0px calc(max(3.1vw, 2.5rem) + max(2px, 0.09vw)) var(--text_color_gray90);
    }
    .authorName::before{
        content: "web by Artem Damin";
        box-sizing: content-box;
        color: var(--text_color_gray90);
        background-color: var(--background_color_lightCyan);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: absolute;
        padding-bottom: max(1rem, 0.85vw);
        border-radius: max(1.75rem, 2.2vw);
        top: 0;
        width: 100%;
        height: 165%;
        border: max(2.5px, 0.125vw) var(--text_color_gray90) solid;
        z-index: -1;
    }
    .footer_Decor{
        width: max(24rem, 60%);
        align-self: flex-end;
        grid-area: 1 / 2 / 3 / 4;
        z-index: -2;
    }

    @container footer (inline-size < 790px) {
        .authorName::before{
            height: 157.5%;
            padding-bottom: 0.75rem;
        }
        .navbar_list::before{
            height: 100%;
        }
    }
    @container footer (inline-size < 650px) {
        .titleName{
            font-family: 'Brolimo';
            font-size: max(17vw, 3.5rem);
            text-wrap: nowrap;
        }
        .authorName::before{
            height: 157.5%;
            padding-bottom: 0.75rem;
        }
        .navbar_list::before{
            height: 100%;
        }
        .navbar_list > a:hover{
            translate: 0 0;
            box-shadow: none;
        }
    }

    @media (width < 850px) {
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
    @media (width < 370px) {
        .content_container.footer{
            padding-top: max(7.5vw, 1.5rem);
        }
        .footer_top{
            flex-direction: column;
            gap: 2.25vh;
        }
        .navbar_list::before{
            height: 95%;
        }
        .navbar_list{
            width: 100%;
        }
        .navbar_list > a {
            font-size: max(1.7vw, 1rem);
            padding-block: max(.5vw, 0.3rem);
        }
    }
    @media (height > 750px) {
        .footer_container{
            height: max(40vw, 45vh);
        }
    }
    @media (height > 750px) and (width > 750px) and (width < 1200px) {
        .footer_container{
            height: max(40vw, 42.5vh);
        }
    }
    
</style>