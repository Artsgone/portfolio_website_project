<script>
    import Navbar from '$lib/reusable_components/+navbar.svelte'
    import Header from '$lib/reusable_components/+header.svelte'
    import Footer from '$lib/reusable_components/+footer.svelte'
    import MainPage_titlePageSVG from '$lib/svg_files/MainPage/MainPage_titlePageSVG.svg'
    import MainPage_greetingPageSVG from '$lib/svg_files/MainPage/MainPage_greetingPageSVG.svg'
    import MainPage_purpleSquaresSVG from '$lib/svg_files/MainPage/MainPage_purpleSquaresSVG.svg'
    import MainPage_earLikeThingSVG from '$lib/svg_files/MainPage/MainPage_earLikeThingSVG.svg'
    import MainPage_stylingForSunsetImageSVG from '$lib/svg_files/MainPage/MainPage_stylingForSunsetImage.svg'
    import MainPage_YellowHighlight from '$lib/svg_files/MainPage/MainPage_YellowHighlight.svg'
    import sunsetInTheCloudsIMG from '$lib/compressed_images/sunset_inthe_clouds.jpg'
    import dandelionIMG from '$lib/compressed_images/IMG_20210627_185235-min.jpg'
    import goldenLeaves from '$lib/compressed_images/golden_leaves.jpg'
    import MY from '$lib/svg_files/MainPage/MY.svg'
    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'

    // (function() {
    // document.addEventListener("mousemove", parallax);
    // const elem = document.querySelector("#MainPage_titlePageSVG");
    //     function parallax(e) {
    //         let _w = window.innerWidth/2;
    //         let _h = window.innerHeight/2;
    //         let _mouseX = e.clientX;
    //         let _mouseY = e.clientY;
    //         let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
    //         let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
    //         let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
    //         let x = `${_depth3}, ${_depth2}, ${_depth1}`;
    //         console.log(x);
    //         elem.style.backgroundPosition = x;
    //     }

    // })();
</script>

<main>
    <div class="default_container cyan">
        <Header title_Decor_ID = "mainpage" />
        <div class="content_container title_page">
            <div class="title_page_name">
                <div class="title_name darkgrayText">Main page</div>
                <img id="MainPage_titlePageSVG" src={MainPage_titlePageSVG} alt="MainPage_titlePageSVG">
            </div>
            <Navbar firstLink="About me" secondLink = "Portfolio" thirdLink="Contact"
                    linkAddress1="about_me" linkAddress2="portfolio" linkAddress3="contact"/>
        </div>
    </div>
    <div class="default_container greeting">
        <div class="content_container greeting_page">
            <img id="MainPage_greetingPageSVG" src={MainPage_greetingPageSVG} alt="MainPage_greetingPageSVG">
            <div class="text introducing">
                <!-- <img class="purpleSquares" src={MainPage_purpleSquaresSVG} alt="MainPage_purpleSquaresSVG"> -->
                 <p class="lightgrayText">My name is <span>Artem Damin</span>. <br> I am <span>UX/UI designer</span>, <br> and this is my  <span>personal website</span>.</p>
            </div>
        </div>
    </div>
    <div class="default_container cyanSaturated">
        <div class="content_container introductionToPhotos_page">
            <div class="top_part page3">
                <img class="MY" src={MY} alt="MY">
                <img class="earLikeThing" src={MainPage_earLikeThingSVG} alt="MainPage_earLikeThingSVG">
            </div>
            <div class="bottom_part page3">
                <p class="copyright_text darkgrayText">copyrightcopyrighted <br> copyrightcopyrighted <br> copyrightcopyrighted <br>copyrightcopyrighted</p>
                <div class="photo_collection_text lightgrayText">photo <br> collection</div>
            </div>
        </div>
    </div>
    <div class="default_container">
        <div class="content_container page4">
            <div class="left_part page4">
                <img class="sunsetInTheCloudsIMG" src={sunsetInTheCloudsIMG} alt="sunsetInTheCloudsIMG">
                <img class="MainPage_stylingForSunsetImageSVG" src={MainPage_stylingForSunsetImageSVG} alt="MainPage_stylingForSunsetImageSVG">
            </div>
            <div class="right_part page4">
                <div class="page4_title_text darkgrayText">Gorgeous sunset in the clouds</div>
                <p class="page4_text darkgrayText"> 
                    mazingamazingamazinga <br>
                    azingamazingamazingma <br>
                    zingamazingamazingama <br>
                    ingamazingamazingamaz <br>
                    ngamazingamazingamazi <br>
                    gamazingamazingamazin
                </p>
            </div>
        </div>
    </div>
    <div class="default_container">
        <div class="content_container page5">
            <img class="dandelion IMG1" src={dandelionIMG} alt="dandelionIMG">
            <div class="page5_gradient"></div>
            <img class="dandelion IMG2" src={dandelionIMG} alt="dandelionIMG">
            <div class="page5_title_text lightgrayText">Distinguished <br> dream, <br> pure <br> perfection.</div>
        </div>
    </div>
    <div class="default_container">
        <div class="content_container page6">
            <div class="left_part img_box">
                <img class="goldenLeaves" src={goldenLeaves} alt="goldenLeaves">
            </div>
            <div class="right_part page5">
                <div class="right_part_text_box">
                    <div class="page6_text darkgrayText">Importance <br> of <br> desillusion</div>
                    <img class="MainPage_YellowHighlight" src={MainPage_YellowHighlight} alt="MainPage_YellowHighlight">
                </div>
            </div>
        </div>
    </div>
    <Footer firstLink="About me" secondLink="Portfolio" thirdLink="Contact" 
    linkAddress1="about_me" linkAddress2="portfolio" linkAddress3="contact"
    titleName = "Main page" footer_Decor_ID = "mainpage"/>
</main>

<style >
    :global(body){
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
    }
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .default_container{
        width: 100%;
        /* height: 100svh; */
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightYellow);
        /* border-bottom: 1px solid var(--text_color_gray90); */
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
        /* overflow: hidden; */
    }
    .content_container{
        width: 92.5%;
        height: 87.5%;
    }
    .darkgrayText{
        color: var(--text_color_gray90);
    }
    .lightgrayText{
        color: var(--text_color_gray5);
    }
    .default_container.cyan{
        background-color: var(--background_color_lightCyan);
        box-shadow: none;
    }
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }

/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
    .content_container.title_page{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 100%;
    }
    .title_page_name{
        position: relative;
        display: flex;
    }
    #MainPage_titlePageSVG{
        width: var(--element_size_title_decor_main_page);
        position: absolute;
        inset: 50% 0 0 50%;
        translate: -50% -38%;
    }
    .title_name{
        font-size: var(--text_size_title_ultrabig);
        font-family: 'Brolimo';
        z-index: 9999;
        text-wrap: nowrap;
    }

    @media (width < 500px){
        .content_container.title_page{
            justify-content: space-evenly;
            gap: 3rem;
        }
        #MainPage_titlePageSVG{
            width: 100%;
        }
        .title_name{
            text-wrap: wrap;
            text-align: center;
            font-size: 30vw;
            line-height: 22.5vw;
        }
    }
    @media (width < 500px) and (height < 750px){
        .content_container.title_page{
            justify-content: space-evenly;
            gap: 2rem;
        }
    }

    /* PAGE 2 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
    .default_container.greeting{
        background-color: var(--background_color_darkGray);
        box-shadow: none;
    }
    .content_container.greeting_page{
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1.75fr 2fr;
        align-content: center;
        justify-items: center;
        gap: 1vw;
    }
    #MainPage_greetingPageSVG{
        width: max(10rem, 75%);
        align-self: center;
    }
    .text.introducing{
        display: flex;
        flex-direction: column;
        align-self: center;
    }
    .text > p{
        font-family: 'Subjectivity_Medium';
        font-size: var(--text_size_medium);
        line-height: var(--text_line_height_medium);
        letter-spacing: -0.5px;
    }
    .text > p > span{
        font-family: 'Subjectivity_Bold';
        background: linear-gradient(-177.5deg, var(--element_background_color_lightestCyan), var(--background_color_darkCyanSaturated));
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: var(--text_size_medium_big);
        text-wrap: nowrap;
    }

    @media (width < 1450px) {
        .content_container.greeting_page{
            grid-auto-columns: 1fr 1.25fr;
        }
    }
    @media (width < 1100px) {
        .content_container.greeting_page{
            grid-auto-flow: row;
            grid-auto-rows: 1fr 1fr;
        }
        #MainPage_greetingPageSVG{
            width: max(25rem, 50%);
        }
        .text > p{
            text-align: center;
        }
    }
    @media (width < 1100px) and (width > 650px) {
        .text > p{
            text-align: center;
            font-size: var(--text_size_medium_big_media1);
            line-height: var(--text_line_height_medium_media1);
        }
        .text > p > span{
            font-size: var(--text_size_medium_big_media1);
        }
    }
    @media (width < 500px) {
        .content_container.greeting_page{
            gap: 0;
        }
        #MainPage_greetingPageSVG{
            width: 100%;
        }
    }

    /* PAGE 3 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .default_container.cyanSaturated{
        background-color: var(--background_color_lightCyanSaturated);
        box-shadow: none;
    }
    .content_container.introductionToPhotos_page{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }
    .content_container.introductionToPhotos_page::before{
        content: "";
        position: absolute;
        height: max(3.375rem, 6vh);
        border-radius: max(1rem, 1vw);
        width: 100%;
        bottom: 0;
        background-color: var(--background_color_darkCyan);
    }
    .top_part.page3, .bottom_part.page3{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50%;
        padding-block: 3vh;
        container: photos_title / size;
    }
    .MY{
        width: 65%;
        height: 100%;
    }
    .earLikeThing{
        height: 100%;
        width: 35%;
    }
    .photo_collection_text{
        font-family: 'Vetrino';
        padding-bottom: max(1vw, 2rem);
        font-size: max(7.5vw, 5rem);
        text-align: end;
        align-self: flex-end;
        z-index: 1;
    }
    .copyright_text{
        font-family: 'Neutral_Normal';
        line-height: max(0.9rem, 0.9vw);
        font-size: max(1rem, 1vw);
        align-self: flex-end;
        z-index: 1;
        translate: 0 calc(-50% - 1rem);
    }
    
    @media (width > 1650px) {
        .MY{
            width: auto;
        }
    }
    @container photos_title (inline-size < 1200px) {
        .MY{
            width: 60%;
        } 
        .earLikeThing{
            width: 40%;
            height: min( 17.5rem, 85%);
            padding-inline: 0;
        }
        .bottom_part.page3{
            justify-content: center;
        }  
    }
    @container photos_title (inline-size < 680px) {
        .MY{
            height: 40%;
            width: 100%;
        } 
        .earLikeThing{
            height: 60%;
            width: 50%;
        }
        .bottom_part.page3{
            justify-content: center;
        } 
        .photo_collection_text{
            text-align: center;
            font-size: min(17vw, 6rem);
        }
        .copyright_text{
            display: none;
        } 
    }

    @media (width < 800px) {
        .top_part.page3, .bottom_part.page3{
            border: none;
        }
        
        .top_part.page3{
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4rem;
            height: 60%;
        }
        .bottom_part.page3{
            display: grid;
            justify-content: center;
            align-content: center;
            height: 40%;
        }
    }

    /* PAGE 4 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.page4{
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: max(7.5vw, 2rem);
    }
    .left_part.page4, .right_part.page4{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        position: relative;
    }
    .left_part.page4{
        container: sunset_page_left_part / size;
    }
    .right_part.page4{
        container: sunset_page_right_part / size;
    }
    .sunsetInTheCloudsIMG{
        width: 100%;
        height: 85%;
        object-fit: cover;
        z-index: 1;
        border-radius: max(1rem, 1vw);
    }
    .MainPage_stylingForSunsetImageSVG{
        border-radius: max(1rem, 1vw);
        border: max(0.25vw, 2.75px) solid var(--text_color_gray90);
        position: absolute;
        width: 100%;
        bottom: 0;
    }

    .right_part.page4::before{
        content: "";
        position: absolute;
        height: max(5rem, 15vh);
        width: 100%;
        bottom: 0;
        background-color: var(--background_color_alternativeLightYellow);
        border-radius: max(1rem, 1vw);
    }
    .page4_title_text{
        font-family: 'Neutral_Normal';
        --page4_title_text_size: max(3vw, 3rem);
        font-size: var(--page4_title_text_size);
        line-height: var(--page4_title_text_size);
        padding-block-start: 8vw;
    }
    .page4_text{
        font-family: 'Butler_Light';
        font-size: max(1.3vw, 1.5rem);
        line-height: max(0.85vw, 1.1rem);
        z-index: 1;
        padding: max(1.25rem, 1vw);
    }

    @container sunset_page_left_part (block-size < 600px) and (inline-size < 850px) {
        .sunsetInTheCloudsIMG{
            height: auto;
        }
        .MainPage_stylingForSunsetImageSVG{
            display: none;
        }
    }
    @container sunset_page_left_part (block-size < 600px) and (inline-size < 300px) {
        .sunsetInTheCloudsIMG{
            height: 75%;
        }
    }
    @container sunset_page_left_part (block-size < 600px) and (inline-size < 500px) {
        .MainPage_stylingForSunsetImageSVG{
            display: block;
        }
    }
    
    @container sunset_page_right_part (block-size < 500px) and (inline-size < 850px) {
        .page4_title_text{
            padding-block-start: max(2rem, 5vh);
            --page4_title_text_size: max(4vw, 2rem);
            font-size: var(--page4_title_text_size);
            line-height: var(--page4_title_text_size);
        }
        .page4_text{
            display: none;
        }
        .right_part.page4::before{
            height: min(8vh, 22.5vw);
            width: 100%;
            bottom: -1vh;
        }
    }
    /* @container sunset_page_right_part (block-size >= 300px) and (inline-size < 850px) {
        .page4_title_text{
            --page4_title_text_size: max(5vw, 3rem);
            font-size: var(--page4_title_text_size);
            line-height: var(--page4_title_text_size);
        }
    } */

    @media (width < 1000px) {
        .content_container.page4{
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1.75fr;
            gap: max(8vh, 4rem);
        }
        .left_part.page4{
            order: 2;
            align-items: center;
            justify-content: center;
        }
        .page4_text{
            padding: 0;
        }
    }
    @media (width < 1000px) and (height < 690px) {
        .content_container.page4{
            grid-template-rows: 1fr 1.5fr;
            gap: min(4vh, 2rem);
        }
    }
    /* PAGE 5 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.page5{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        border-radius: max(1rem, 1vw);
        overflow: clip;
        container: dandelion_page / size;
    }
    .dandelion{
        max-height: 100%;
    }
    .dandelion.IMG1{
        scale: -1 1;
    } 
    .page5_title_text{
        font-family: 'Neutral_Normal';
        text-align: center;
        font-size: max(7.5vw, 2.25rem);
        line-height: max(7.5vw, 2.25rem);
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
    }
    .page5_gradient{
        width: 100%;
        height: 100%;
        opacity: 0.75;
        background: linear-gradient(70deg, #71786dff, #989d95ff);
    }

    @container dandelion_page (inline-size < 1450px) {
        .dandelion{
            width: 35%;
            height: 100%;
            object-fit: cover;
        }
    }

    @media (width < 600px) {
        .content_container.page5{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }
        .dandelion{
            width: 100%;
            height: 35%;
            object-fit: cover;
        }
    }

    /* PAGE 5 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.page6{
        display: grid;
        grid-template-columns: 2.25fr 1fr;
        grid-template-rows: 1fr;
        gap: max(3vw, 5vh);
        align-items: center;
        justify-items: flex-end;
        border-radius: max(1rem, 1vw);
        overflow: clip;
    }
    .right_part.page5{
        width: max(50%, 13.5vw);
        height: 100%;
        container: golden_leaves_page_right_part / size;
    }
    .left_part.img_box{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        container: golden_leaves_page_left_part / size;
    }
    .right_part_text_box{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    .goldenLeaves{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: max(1rem, 1vw);
    }   
    .MainPage_YellowHighlight{
        width: 100%;
        rotate: 180deg;
    }
    .page6_text{
        font-family: 'Neutral_Normal';
        font-size: 3.75vw;
        writing-mode: vertical-rl;
    }
    
    @media (width < 1400px) {
        .content_container.page6{
            grid-template-columns: 1fr;
            grid-template-rows: 1.5fr 1fr;
        } 
        .right_part.page5{
            width: 100%;
        }
        .right_part_text_box{
            align-items: start;
        }
        .MainPage_YellowHighlight{
            width: min(30vw, 10rem);
            rotate: 0deg;
        }
        .page6_text{
            font-size: min(11.75vw, 3.5rem);
            line-height: min(11.75vw, 3.5rem);
            writing-mode: horizontal-tb;
        }
    }

    /* PAGE 6 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    @media (width < 1100px) {
        .content_container{
            width: 85%;
            height: 80%;
        }
    }     
    @media (width < 1100px) and (height < 690px){ 
        .content_container{
            width: 85%;
            height: 90%;
        }
    }  
</style>