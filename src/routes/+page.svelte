<script>
    import Navbar from '$lib/reusable_components/+navbar.svelte'
    import Header from '$lib/reusable_components/+header.svelte'
    import Footer from '$lib/reusable_components/+footer.svelte'
    import LoadingScreen from '$lib/reusable_components/+loading_screen.svelte'
    import ScrollUpButton from '$lib/reusable_components/+scrollUp_button.svelte'
//
    import MainPage_titlePageSVG from '$lib/svg_files/MainPage/MainPage_titlePageSVG.svg'
    import MainPage_greetingPageSVG from '$lib/svg_files/MainPage/MainPage_greetingPageSVG.svg'
    import MainPage_earLikeThingSVG from '$lib/svg_files/MainPage/MainPage_earLikeThingSVG.svg'
    import MainPage_YellowHighlight from '$lib/svg_files/MainPage/MainPage_YellowHighlight.svg'
    import MainPage_MyPhotosDecorElement from '$lib/svg_files/MainPage/MainPage_MyPhotosDecorElement.svg'
    import MainPage_cvDownloadDecor from '$lib/svg_files/MainPage/MainPage_cvDownloadDecor.svg'
    import CV_Artem_Damin from '$lib/misc_and_forDownload/CV_Artem_Damin.png'
    import MY from '$lib/svg_files/MainPage/MY.svg'
//
    import sunsetInTheCloudsIMG from '$lib/compressed_images/sunset_inthe_clouds.jpg'
    import dandelionIMG from '$lib/compressed_images/IMG_20210627_185235-min.jpg'
    import goldenLeaves from '$lib/compressed_images/golden_leaves.jpg'
//
    // import noise_light from '$lib/svg_files/GlobalSVGs/noise-light.png'
    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'
//
    import { navigating } from '$app/stores'
    import { afterNavigate, beforeNavigate } from '$app/navigation';

    import { onMount, tick, onDestroy } from "svelte";
    import { fade, fly } from 'svelte/transition';
    import { quintOut, sineInOut } from 'svelte/easing';
    
    let pageLoaded = false;
    // let pageFullyLoaded = false;
    // let firstPageLoad = false;
    $: sunsetInTheCloudsIMG_height = 0;
    $: page4_totalHeight = 0;
    let yellowBox_height = 0;

    // $: stored_scrollY = 100;

    // onDestroy(() => {
    //     stored_scrollY = svelte_main_element.scrollTop;
    // });

    onMount(() => {
        pageLoaded = true;
        yellowBox_height = page4_totalHeight - sunsetInTheCloudsIMG_height;
        // svelte_main_element.scrollTo(0, 100);
        // const interval = setInterval(() => {
		// 	pageFullyLoaded = true;
		// }, 5000);

		// return () => clearInterval(interval);
    });
    beforeNavigate(() => {
        pageLoaded = false;
    });

    afterNavigate(() => {
        pageLoaded = true;
    });

    let svelte_main_element;
    $: innerHeight = 0;
    $: y = 0;
    
    let newY = [];
    $: oldY = newY[1];
    function updateY(event){
        y = svelte_main_element.scrollTop;
        newY.push(y);
        if(newY.length > 50) {
            newY.shift();
        }
        newY=newY;
        // console.log(newY)
    }

</script>

<svelte:window bind:innerHeight/>
<!-- bind:scrollY={y} on:scroll={updateY} -->

<main class="svelte_main" on:scroll={updateY} bind:this={svelte_main_element}>
    {#if !pageLoaded}
        <LoadingScreen />
    {/if}

    {#if y > (innerHeight / 1.75) && (oldY - 40) > y}
        <ScrollUpButton scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })}/>
    {/if}

    <div class="default_container cyan">
        <Header title_Decor_ID = "mainpage" />
        <div class="content_container title_page">
            {#if pageLoaded}
                <div  class="title_page_name" transition:fade={{ delay: 200, duration: 400, easing: sineInOut}}>
                    <div class="title_name darkgrayText">Art's page</div>
                    <img id="MainPage_titlePageSVG" src={MainPage_titlePageSVG} alt="MainPage_titlePageSVG">
                </div>
            {/if}
            <Navbar firstLink="About me" secondLink = "Portfolio" thirdLink="Contact"
                    linkAddress1="about_me" linkAddress2="portfolio" linkAddress3="contact"/>
        </div>
    </div>
    <div class="default_container greeting">
        <div class="content_container greeting_page">
            <img id="MainPage_greetingPageSVG" src={MainPage_greetingPageSVG} alt="MainPage_greetingPageSVG">
            <div class="text introducing">
                 <p class="lightgrayText">My name is <span>Artem Damin</span>. <br> I am <span>UX/UI designer</span>, <br> and this is my  <span>personal website</span>.</p>
            </div>
        </div>
    </div>
    <div class="default_container greeting dwnCV">
        <div class="content_container CV_download_page">
            <div class="text cvDownload">
                 <p class="lightgrayText">Download my <span class="span_CV">CV</span> </p>
            </div>
            <div class="CV_downloadLink">
                <a href={CV_Artem_Damin} download="CV_Artem_Damin" class="CV_downloadLinkInside"> Download <img class="MainPage_cvDownloadDecor" src={MainPage_cvDownloadDecor} alt="MainPage_cvDownloadDecor"></a>
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
                <img class="copyright_text" src={MainPage_MyPhotosDecorElement} alt="MainPage_MyPhotosDecorElement">
                <div class="photo_collection_text lightgrayText">photo <br> collection</div>
            </div>
        </div>
    </div>
    <div class="default_container">
        <div bind:clientHeight={page4_totalHeight} class="content_container page4">
            <div class="left_part page4">
                <div bind:clientHeight={sunsetInTheCloudsIMG_height} class="sunsetIMG_box">
                    <img class="sunsetInTheCloudsIMG" src={sunsetInTheCloudsIMG} alt="sunsetInTheCloudsIMG">
                </div>
            </div>
            <div class="right_part page4" style="--yellowBox_height: {yellowBox_height}px">
                <div class="page4_title_text darkgrayText">Gorgeous sunset in the clouds</div>
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
        background-color: var(--background_color_lightCyan);
        /* -webkit-font-smoothing: antialiased; */
    }
    main.svelte_main{
        overflow-y: scroll;
        height: 100dvh;
        scroll-snap-type: block proximity;
    }
    :global(body)::-webkit-scrollbar {
        display: none;
    }
    main.svelte_main::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    main.svelte_main::-webkit-scrollbar-track {
        background-color: var(--background_color_lightCyan);
    }
    main.svelte_main::-webkit-scrollbar-thumb {
        background-color: var(--background_color_alternativeLightYellow);
        border-radius: 5rem;
    }
    @media (width < 800px){
        main.svelte_main{
            scroll-snap-type: block mandatory;
        }
        main.svelte_main::-webkit-scrollbar {
            display: none;
        }
    }

    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .default_container{
        width: 100%;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightYellow);
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
        border-bottom: max(6px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        scroll-snap-align: start;
        scroll-snap-stop: always;
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
        height: 100svh;
        background: radial-gradient(var(--background_color_lightCyan) 55%, var(--background_color_lightCyanSaturated) 125%);
        box-shadow: none;
        border: none;
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
        translate: 33% 2%;
    }
    .title_name{
        font-size: var(--text_size_title_ultrabig);
        font-family: 'Brolimo';
        z-index: 999;
        text-wrap: nowrap;
    }

    @media (width < 942px){
        .content_container.title_page{
            justify-content: center;
            gap: 15vh;
        }
        #MainPage_titlePageSVG{
            width: 80%;
            translate: 15% 10%;
        }
        .title_name{
            text-wrap: wrap;
            text-align: center;
            font-size: 22.5vw;
            line-height: 17.5vw;
        }
    }
    @media (width < 500px){
        .content_container.title_page{
            justify-content: center;
            gap: 15vh;
        }
        #MainPage_titlePageSVG{
            width: 100%;
            translate: 0% 10%;
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
        border: none;
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
    .text.introducing > p{
        font-family: 'Subjectivity_Medium';
        font-size: var(--text_size_medium);
        line-height: var(--text_line_height_medium);
        letter-spacing: -0.5px;
    }
    .text.introducing > p > span{
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
            width: max(27.5rem, 60%);
        }
        .text.introducing > p{
            text-align: center;
        }
    }
    @media (width < 1100px) and (width > 650px) {
        .text.introducing > p{
            text-align: center;
            font-size: var(--text_size_medium_big_media1);
            line-height: var(--text_line_height_medium_media1);
        }
        .text.introducing > p > span{
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
    @media (width < 350px) {
        .text.introducing > p{
            font-size: max(1.75vw, 1.25rem);
            line-height: max(2.25vw, 2rem);
        }
        .text.introducing > p > span{
            font-size: max(2vw, 1.5rem);
        }
    }

    /* CV Download */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .default_container.dwnCV{
        overflow-x: clip;
    }
    .content_container.CV_download_page{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1.25fr;

        justify-items: center;
        align-items: center;
    }

    .text.cvDownload > p{
        font-family: 'Brolimo';
        font-size: max(4vw, 3.5rem);
        /* line-height: var(--text_line_height_big); */
        text-wrap: balance;
        /* word-spacing: max(1rem, 1vw); */
    }
    .span_CV{
        font-family: 'Subjectivity_Bold';
        font-size: max(5vw, 4.5rem);
        background: linear-gradient(-177.5deg, var(--element_background_color_lightestCyan), var(--background_color_darkCyanSaturated));
        background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
        isolation: isolate;
    }
    .span_CV::before {
        content: "";
        position: absolute;
        height: 125%;
        width: 200%;
        left: -50%;
        background-image: radial-gradient(var(--background_color_darkCyanSaturated) 15%, var(--cyan_outline) 100%);
        background-size: 100% 100%;
        background-position: right bottom;
        background-repeat: no-repeat;
        border-radius: max(0.35rem, 0.35vw);
        filter: blur(7.5rem);
        z-index: -1;
    }

    .CV_downloadLink{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        isolation: isolate;
    }
    .CV_downloadLinkInside{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: max(2rem, 2vw);
        
        width: 100%;
        padding: max(1rem, 1vw) max(3.25rem, 3.25vw);
        text-wrap: balance;
        text-decoration: none;
        font-family: "Neutral_Normal";
        font-size: max(2vw, 1.75rem);
        color: var(--background_color_lightCyan);
        text-shadow: 0rem 0rem 0.75rem var(--background_color_lightCyanSaturated);
        backdrop-filter: blur(0.6rem);
        /* background: radial-gradient(var(--background_color_darkCyan) 1%, var(--background_color_darkGray) 150%); */
        border-radius: max(2rem, 2vw);
        border: max(4px, 0.250vw) var(--background_color_lightCyanSaturated) solid;
        transition: all 0.15s ease-out;
    }
    .MainPage_cvDownloadDecor{
        height: max(2.25rem, 2.25vw);
        filter: drop-shadow(0 0 1rem var(--background_color_lightCyanSaturated));
    }

    .CV_downloadLink > .CV_downloadLinkInside:hover{
        color: var(--text_color_gray5);
        text-shadow: 0rem 0rem 0.75rem var(--text_color_gray5);
        translate: 0 max(0.5rem, 0.40vw);
        box-shadow: inset 0 0 max(1.25rem, 1.25vw) 0.2rem var(--background_color_lightCyanSaturated),
                    0 max(0.5rem, 0.5vw) max(1rem, 1vw) 0.25rem var(--background_color_lightCyanSaturated);
    }

    .CV_downloadLink::before{
        content: '';
        position: absolute;
        top: max(0.6rem, 0.45vw);
        border-radius: max(1.9rem, 1.9vw);
        width: 100%;
        height: 115%;
        border: max(4px, 0.250vw) var(--background_color_lightCyanSaturated) solid;
        z-index: -1;

        background-image: radial-gradient(var(--text_color_gray90) 15%, var(--background_color_darkCyanSaturated) 100%);
        background-size: 100% 100%;
        background-position: center top;
        background-repeat: no-repeat;
        /* transition: background-size 1s ease-out; */
    }
    /* .CV_downloadLink:hover::before{
        background-size: 100% 100%;
        transition: background-size 0.25s ease-out;
    } */

    @media (width < 670px) {
        .content_container.CV_download_page{
            grid-template-rows: 1fr 1.5fr;
        }
        .CV_downloadLink{
            width: 75%;
        }
        .text.cvDownload > p{
            font-size: min(9vw, 3.5rem);
        }
        .span_CV{
            font-size: min(12.5vw, 4.5rem);
        }
        .span_CV::before{
            filter: blur(15vw);
        }
        .MainPage_cvDownloadDecor{
            height: min(2.25rem, 7.5vw);
        }
        .CV_downloadLinkInside{
            border-radius: max(2.1rem, 2.1vw);
        }
        .CV_downloadLink::before{
            height: 112.5%;
        }
    }
    @media (width < 500px) {
        .CV_downloadLink{
            width: 85%;
        }
        .CV_downloadLinkInside{
            gap: min(2rem, 5vw);
            padding: max(1rem, 1vw) max(3rem, 3vw);
            font-size: min(6vw, 1.45rem);
            border-radius: max(2rem, 2vw);
            border: max(4px, 0.250vw) var(--background_color_lightCyanSaturated) solid;
        }
    }

    /* PAGE 3 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .default_container.cyanSaturated{
        background-color: var(--background_color_lightCyanSaturated);
        box-shadow: none;
        border: none;
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
        height: max(2.75rem, 4.5vh);
        border-radius: max(1rem, 1vw);
        width: 100%;
        bottom: 0;
        background-color: var(--background_color_darkCyan);
        display: none;
    }
    .top_part.page3, .bottom_part.page3{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50%;
        padding-block: 3vh;
        container: photos_title / size;
    }
    .top_part.page3{
        border-block: max(5px, 0.4vw) var(--cyan_outline) solid;
    }
    .bottom_part.page3{
        border-bottom: max(5px, 0.4vw) var(--cyan_outline) solid;
    }
    .MY{
        width: 65%;
        height: 100%;
    }
    .earLikeThing{
        height: 100%;
        max-width: 30%;
    }
    .photo_collection_text{
        font-family: 'Brolimo';
        /* padding-bottom: max(1vw, 2rem); */
        font-size: max(7.5vw, 5rem);
        text-align: end;
        align-self: center;
        z-index: 1;
    }
    .copyright_text{
        height: 100%;
        max-width: 50%;
        align-self: center;
        z-index: 1;
    }
    
    @media (width > 1650px) {
        .MY{
            width: 60%;
        }
    }
    @container photos_title (inline-size < 1200px) {
        .MY{
            width: 60%;
        } 
        .earLikeThing{
            width: 40%;
            height: min(17.5rem, 85%);
            padding-inline: 0;
        }
        .bottom_part.page3{
            justify-content: center;
        }  
    }
    @container photos_title (inline-size < 680px) {
        .MY{
            height: 35%;
            width: 100%;
        } 
        .earLikeThing{
            height: 55%;
            width: 50%;
            max-width: none;
        }
        .bottom_part.page3{
            justify-content: center;
        } 
        .photo_collection_text{
            text-align: center;
            font-size: min(19vw, 6.5rem);
        } 
    }

    @media (width < 800px) {
        .top_part.page3, .bottom_part.page3{
            border: none;
            padding-bottom: 0;
        }
        .copyright_text{
            display: none;
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

    .sunsetIMG_box{
        width: 100%;
        height: 85%;
        z-index: 1;
    }
    .sunsetInTheCloudsIMG{
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 2;
        border-radius: max(1rem, 1vw);
    }
    .left_part.page4::before{
        position: absolute;
        content: "";
        width: 100%;
        height: 50%;
        bottom: 0;
        border: max(0.25vw, 3.5px) solid var(--text_color_gray90);
        border-radius: max(1rem, 1vw);
    }
    .left_part.page4::after{
        position: absolute;
        content: "";
        width: 100%;
        height: 50%;
        bottom: 0;
        border: max(0.25vw, 3.5px) solid var(--text_color_gray90);
        border-radius: max(15vw, 10rem);
    }

    .right_part.page4::before{
        content: "";
        position: absolute;
        /* height: max(5rem, 20vh); */
        height: var(--yellowBox_height);
        width: 100%;
        bottom: 0;
        background-color: var(--background_color_alternativeLightYellow);
        background: radial-gradient(var(--background_color_alternativeLightYellow) 55%, var(--background_color_alternativeLightYellow_Darker) 125%);
        border-radius: max(1rem, 1vw);
    }
    .page4_title_text{
        font-family: 'Neutral_Normal';
        --page4_title_text_size: max(3vw, 2.85rem);
        font-size: var(--page4_title_text_size);
        line-height: var(--page4_title_text_size);
        padding-block-start: 8vw;
    }

    @container sunset_page_left_part (block-size < 600px) and (inline-size < 850px) {
        .sunsetIMG_box{
            height: 85%;
        }
    }
    @container sunset_page_left_part (block-size < 450px) and (inline-size < 400px) {
        .sunsetIMG_box{
            height: 80%;
        }
    }
    
    @container sunset_page_right_part (block-size < 350px) and (inline-size < 850px) {
        .page4_title_text{
            padding-block-start: max(2rem, 5vh);
            --page4_title_text_size: max(5vw, 2.25rem);
            font-size: var(--page4_title_text_size);
            line-height: var(--page4_title_text_size);
        }

        .right_part.page4::before{
            height: min(10vh, 22.5vw);
            width: 100%;
            bottom: min(-2.5vh, -3vw);
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
        height: 100%;
        width: 40%;
        object-fit: cover;
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
        background: linear-gradient(-25deg, hsl(93, 8%, 40%), hsl(94, 8%, 65%));
    }

    @container dandelion_page (inline-size < 1500px) {
        .dandelion{
            width: 31%;
        }
    }

    @media (width < 600px) {
        .content_container.page5{
            flex-direction: column;
        }
        .page5_title_text{
            font-size: 9vw;
            line-height: 9vw;
        }
        .dandelion{
            width: 100%;
            height: 30%;
            object-fit: cover;
        }
    }
    @media (width < 450px) {
        .dandelion{
            height: 34%;
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
        border-radius: max(1rem, 1vw);
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
            width: min(35vw, 12.5rem);
            rotate: 0deg;
        }
        .page6_text{
            --font_size_golden_leaves: min(12vw, 3.65rem);
            font-size: var(--font_size_golden_leaves);
            line-height: var(--font_size_golden_leaves);
            writing-mode: horizontal-tb;
        }
    }

    /* PAGE 6 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    @media (width < 1100px) {
        .content_container{
            width: 85%;
            height: 87.5%;
        }
    }     
    @media (width < 1100px) and (height < 690px){ 
        .content_container{
            width: 85%;
            height: 90%;
        }
    }  
</style>