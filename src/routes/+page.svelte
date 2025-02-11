<script lang="js">
    import Navbar from '$lib/reusable_components/Navbar.svelte'
    import Header from '$lib/reusable_components/Header.svelte'
    // import Footer from '$lib/reusable_components/Footer.svelte'
    import LoadingScreen from '$lib/reusable_components/Loading_screen.svelte'
    import { saveScrollY } from '$lib/saveScrollY'
//
    import MainPage_titlePageDecor from '$lib/svg_files/MainPage/MainPage_titlePageDecor.svg'
    import MainPage_titlePageSVG from '$lib/svg_files/MainPage/MainPage_titlePageSVG.svg'
    import MainPage_FooterDecor from '$lib/svg_files/MainPage/MainPage_footerDecor.svg'
//
    import CV_Artem_Damin from '$lib/misc_and_forDownload/CV_Artem_Damin_q.png'
//
    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'
//
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { fly, scale } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';
    
    let pageLoaded = false
    $: innerHeight = 0
    // let Header
    // let Navbar
    let Footer
    let ScrollUpButtonLazy
    let MainPage_greetingPageSVG
    let MainPage_cvDownloadDecor
    let MainPage_MyPhotosDecorElement
    let MainPage_earLikeThingSVG
    let MainPage_MY
    let MainPage_YellowHighlight

    onMount(async() => {
        const oldScrollY = sessionStorage.getItem("stored_scrollY")
        if (oldScrollY != null) {
            svelte_main_element.scrollTo({ top: oldScrollY, behavior: 'auto' })
        }
        pageLoaded = true
        // Header = (await import('$lib/reusable_components/Header.svelte')).default
        // Navbar = (await import('$lib/reusable_components/Navbar.svelte')).default
        Footer = (await import('$lib/reusable_components/Footer.svelte')).default
        ScrollUpButtonLazy = (await import('$lib/reusable_components/ScrollUp_button.svelte')).default

        MainPage_greetingPageSVG = (await import('$lib/svg_files/MainPage/MainPage_greetingPageSVG.svg')).default
        MainPage_cvDownloadDecor = (await import('$lib/svg_files/MainPage/MainPage_cvDownloadDecor.svg')).default
        MainPage_MyPhotosDecorElement = (await import('$lib/svg_files/MainPage/MainPage_MyPhotosDecorElement.svg')).default
        MainPage_earLikeThingSVG = (await import('$lib/svg_files/MainPage/MainPage_earLikeThingSVG.svg')).default
        MainPage_MY = (await import('$lib/svg_files/MainPage/MY.svg')).default
        MainPage_YellowHighlight = (await import('$lib/svg_files/MainPage/MainPage_YellowHighlight.svg')).default

        sunsetInTheClouds = (await import('$lib/compressed_images/sunset_inthe_clouds.webp')).default
        dandelions = (await import('$lib/compressed_images/IMG_20210627_185235-min.webp')).default
        goldenLeaves = (await import('$lib/compressed_images/golden_leaves.webp')).default
        violetFlowers = (await import('$lib/compressed_images/Violet_flowers.webp')).default
        modernBuilding = (await import('$lib/compressed_images/Modern_building.jpg')).default
        // const interval = setInterval(() => {
        // }, 1000);
        // return () => clearInterval(interval);
    });
    beforeNavigate(({to, from}) => {
        pageLoaded = false
        // console.log("To: " + to?.url.pathname + ", from: " + from?.url.pathname)
        if ( from?.url.pathname == "/" && to?.url.pathname == undefined ) {
            saveScrollY.updateScrollY(svelte_main_element.scrollTop)
        } else {
            saveScrollY.updateScrollY(0)
        }
    });
    afterNavigate(() => {
        pageLoaded = true
    });

    let sunsetInTheClouds
    let dandelions
    let goldenLeaves
    let violetFlowers
    let modernBuilding

    let svelte_main_element
    let y = 0
    
    let newY = []
    $: oldY = newY[1]
    function updateY(){
        y = svelte_main_element.scrollTop
        if (y % 4 == 0) {
            newY.push(y)
            if(newY.length > 5) {
                newY.shift()
            }
            newY=newY
        }
    }

    const listOfIntersectedElementsSetter = writable(new Set())

    function observeElement() {
        const default_containers = document.querySelectorAll(".default_container")
        const listLenght = default_containers.length
        let amountOfElementsObserved = 0;
        let intersectingElementIndex

        const intersecObserver = new IntersectionObserver( entries => {
            entries.forEach( entry => {
                intersectingElementIndex = entry.target.containerIndex
                
                if (entry.isIntersecting) {
                    listOfIntersectedElementsSetter.update(set => {
                        // entry.target.classList.add("showOnScreen")
                        // console.log(intersectingElementIndex, entry.target, 'is visible');
                        set.add(intersectingElementIndex)
                        return set
                    })
                    amountOfElementsObserved++

                    intersecObserver.unobserve(entry.target)
                    
                    if (amountOfElementsObserved == listLenght - 1) {
                        intersecObserver.disconnect()
                        // console.log("DISCONNECTED")
                    }
                }
                    
            })
        },
            { 
                root: document.querySelector(".svelte_main"),
                threshold: 0.2,
                rootMargin: "0px",
            }
        )
        
        default_containers.forEach( (container, indexOfContainer) => {
            container.containerIndex = indexOfContainer
            if (indexOfContainer > 0) {
                intersecObserver.observe(container)
            }
        })
    }
    
    
    function lazyLoadedImagesFunc() {
        const lazyLoadedImages = document.querySelectorAll(".forLazyLoad")
        let timeOutTime = 0
        lazyLoadedImages.forEach((image) => {
            if (!image.classList.contains("SVG")) {
                timeOutTime = 150
            }
            function isLoaded() {
                image.classList.add("isLoaded")
            }
            image.addEventListener("load", () => {
                setTimeout(function () {
                    isLoaded()
                }, timeOutTime)
            })
        })
    }
    
</script>

<svelte:head> 
    <!-- <link rel="preload" as="style" href="src/lib/styles_and_fonts/fonts.css" crossorigin="anonymous"> -->
    <!-- <link rel="preload" as="font" href="/src/lib/fonts/BrolimoRegular.ttf" type="font/ttf" crossorigin="anonymous">
    <link rel="preload" as="font" href="/src/lib/fonts/NeutralFace.otf" type="font/otf" crossorigin="anonymous"> -->
    <title>Artem Damin - Art's page</title>
    <meta name="description" content="A personal web-portfolio of Artem Damin" />
</svelte:head>

<svelte:window bind:innerHeight />


<main class="svelte_main" on:scroll={updateY} bind:this={svelte_main_element} use:observeElement>
    {#if !pageLoaded}
        <LoadingScreen />
    {/if}
    {#if y > (innerHeight / 1.1) && oldY > y}
        <!-- <ScrollUpButton scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })}/> -->
        <svelte:component this={ScrollUpButtonLazy} scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })} />
    {/if}

    <div class="default_container cyan">
        <Header headerDecorSVG={MainPage_titlePageDecor} />
        <!-- <svelte:component this={Header} headerDecorSVG={MainPage_titlePageDecor} /> -->
        <div class="content_container title_page">
            <div  class="title_page_name">
                <div class="title_name darkgrayText">Art's page</div>
                {#if pageLoaded}
                    <img id="MainPage_titlePageSVG" src={MainPage_titlePageSVG} transition:scale={{ delay: 100, duration: 1500, easing: elasticOut, start: 1.1, opacity: 1 }} alt="MainPage_titlePageSVG">
                {/if}
            </div>
            <Navbar firstLink="About me" secondLink = "Portfolio" thirdLink="Contact"
            linkAddress1="about_me" linkAddress2="portfolio" linkAddress3="contact"/>
            
            <!-- <svelte:component this={Navbar} firstLink="About me" secondLink = "Portfolio" thirdLink="Contact"
            linkAddress1="about_me" linkAddress2="portfolio" linkAddress3="contact"/> -->
        </div>
    </div>
    <div class="default_container greeting">
         {#if $listOfIntersectedElementsSetter.has(1)}
             <div class="content_container greeting_page" use:lazyLoadedImagesFunc>
                <div class="wrapper_greetingSVG" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.1, opacity: 1 }}>
                    <img class="MainPage_greetingPageSVG forLazyLoad SVG" src={MainPage_greetingPageSVG} alt="MainPage_greetingPageSVG">
                </div>
                <div class="text introducing">
                    <p class="lightgrayText">
                        My name is <span>Artem Damin</span> and I am <span>20 years</span> old. <br> I specialize in <span>UI/UX</span> and <span>Graphic</span> design. <br> <br> 
                        I am committed to <span>elegant</span> and <span>easy</span> to understand design and I strive for <span>perfection</span> in this field.
                    </p>
                </div>
            </div>
         {/if}
    </div>
    <div class="default_container greeting dwnCV">
        {#if $listOfIntersectedElementsSetter.has(2)}
            <div class="content_container CV_download_page" use:lazyLoadedImagesFunc>
                <div class="text cvDownload" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.1, opacity: 1 }}>
                    <p class="lightgrayText">Download my <span class="span_CV">CV</span> </p>
                </div>
                <div class="CV_downloadLink">
                    <a href={CV_Artem_Damin} download="CV_Artem_Damin" class="CV_downloadLinkInside" in:fly={{ delay: 500, duration: 1000, easing: elasticOut, y: "1vh", opacity: 0.5 }}>
                         Download <img class="MainPage_cvDownloadDecor forLazyLoad SVG" src={MainPage_cvDownloadDecor} alt=">">
                    </a>
                </div>
            </div>
        {/if}
    </div>
    <div class="default_container cyanSaturated">
        {#if $listOfIntersectedElementsSetter.has(3)}
            <div class="content_container introductionToPhotos_page" use:lazyLoadedImagesFunc>
                <div class="top_part page3" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.05, opacity: 1 }}>
                    <img class="MY forLazyLoad SVG" src={MainPage_MY} alt="MY">
                    <img class="earLikeThing forLazyLoad SVG" src={MainPage_earLikeThingSVG} alt="MainPage_earLikeThingSVG">
                </div>
                <div class="bottom_part page3" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.05, opacity: 1 }}>
                    <img class="copyright_text forLazyLoad SVG" src={MainPage_MyPhotosDecorElement} alt="MainPage_MyPhotosDecorElement">
                    <div class="photo_collection_text lightgrayText">photo <br> collection</div>
                </div>
            </div>
        {/if}
    </div>
    <div class="default_container">
        {#if $listOfIntersectedElementsSetter.has(4)}
            <div class="content_container page4" use:lazyLoadedImagesFunc>
                <div class="left_part page4">
                    <div class="sunsetIMG_box">
                        <img class="sunsetInTheCloudsIMG forLazyLoad" src={sunsetInTheClouds} alt="sunsetInTheCloudsIMG">
                    </div>
                </div>
                <div class="right_part page4">
                    <div class="page4_title_text darkgrayText" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.1, opacity: 1 }}>Gorgeous sunset in the clouds</div>
                </div>
            </div>
        {/if}
    </div>
    <div class="default_container">
        {#if $listOfIntersectedElementsSetter.has(5)}
            <div class="content_container page5" use:lazyLoadedImagesFunc>
                <div class="dandelion_img_box">
                    <img class="dandelion IMG1 forLazyLoad" src={dandelions} alt="dandelionIMG">
                </div>
                <div class="page5_gradient"></div>
                <div class="dandelion_img_box">
                    <img class="dandelion IMG2 forLazyLoad" src={dandelions} alt="dandelionIMG">
                </div>
                <div class="page5_title_text lightgrayText" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.1, opacity: 1 }}>Distinguished <br> dream, <br> pure <br> perfection.</div>
                <div class="page5_title_text lightgrayText blured" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.1, opacity: 1 }}>Distinguished <br> dream, <br> pure <br> perfection.</div>
            </div>
        {/if}
    </div>
    <div class="default_container">
        {#if $listOfIntersectedElementsSetter.has(6)}
            <div class="content_container page6" use:lazyLoadedImagesFunc>
                <div class="left_part img_box">
                    <img class="goldenLeaves forLazyLoad" src={goldenLeaves} alt="goldenLeaves">
                </div>
                <div class="right_part page6" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.1, opacity: 1 }}>
                    <div class="page6_text darkgrayText">Importance <br> of <br> desillusion</div>
                    <img class="MainPage_YellowHighlight forLazyLoad" src={MainPage_YellowHighlight} alt="MainPage_YellowHighlight">
                </div>
            </div>
        {/if}
    </div>
    <div class="default_container">
        {#if $listOfIntersectedElementsSetter.has(7)}
            <div class="content_container page7" use:lazyLoadedImagesFunc>
                <div class="image_wrapper_page7">
                    <img class="Violet_flowers forLazyLoad" src={violetFlowers} alt="Violet_flowers">
                </div>
                
                <div class="text_wrapper_page7 firstLayer lightgrayText" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.1, opacity: 1 }}>
                    <p>Rusty steel, rough concrete</p>
                </div>
                <div class="text_wrapper_page7 secondLayer">
                    <p>Rusty steel, rough concrete</p>
                </div>
            </div>
        {/if}
    </div>
    <div class="default_container">
        {#if $listOfIntersectedElementsSetter.has(8)}
            <div class="content_container page8" use:lazyLoadedImagesFunc>
                <div class="text_wrapper_page8 darkgrayText" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 1.1, opacity: 1 }}>
                    <p>Thoughts transparent as water in the ocean</p>
                </div>
                <div class="image_wrapper_page8">
                    <img class="Modern_building forLazyLoad" src={modernBuilding} alt="Modern_building">
                </div>
            </div>
        {/if}
    </div>
    <!-- <Footer firstLink="About me" secondLink="Portfolio" thirdLink="Contact" 
    linkAddress1="about_me" linkAddress2="portfolio" linkAddress3="contact"
    titleName="Main page" footer_Decor_ID={MainPage_FooterDecor}/> -->
    <div class="default_container ghost">
        {#if $listOfIntersectedElementsSetter.has(9)}
             <svelte:component this={Footer} firstLink="About me" secondLink="Portfolio" thirdLink="Contact" 
            linkAddress1="about_me" linkAddress2="portfolio" linkAddress3="contact"
            titleName="Main page" footer_Decor_ID={MainPage_FooterDecor}/>
        {/if}
    </div>
    
</main>

<style >
    :global(body){
        margin: 0;
        padding: 0;
        background-color: var(--text_color_gray90);
    }
    main.svelte_main{
        overflow-y: scroll;
        height: 100dvh;
        scroll-snap-type: block mandatory;
        /* interpolate-size: allow-keywords; */
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

    .forLazyLoad{
        opacity: 0;
    }
    *:is(.isLoaded){
        opacity: 1;
        transition: opacity 1s cubic-bezier(0.313, 0.158, 0, 0.524);
    }


    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .default_container{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightYellow);
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
        border-bottom: max(6px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        scroll-snap-align: center;
        scroll-snap-stop: always;
    }
    .default_container.ghost{
        height: auto;
        background-color: none;
        box-shadow: none;
        border-bottom: none;
        scroll-snap-align: none;
    }
    .content_container{
        width: 92.5%;
        height: 87.5%;
        /* transition-behavior: allow-discrete; */
    }

    .darkgrayText{
        color: var(--text_color_gray90);
    }
    .lightgrayText{
        color: var(--text_color_gray5);
    }
    .blured{
        filter: blur(max(0.75rem, 1vw));
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
    img{
        max-width: 100%;
    }

    @media (width < 800px){
        main.svelte_main::-webkit-scrollbar {
            display: none;
        }
    }

/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
    .content_container.title_page{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .title_page_name{
        position: relative;
        display: flex;
        height: max-content;
        /* align-items: center; */
        justify-content: center;
    }
    #MainPage_titlePageSVG{
        width: var(--element_size_title_decor_main_page);
        max-height: 100vh;
        position: absolute;
    }
    .title_name{
        font-size: var(--text_size_title_ultrabig);
        font-family: 'Brolimo', system-ui, sans-serif;
        z-index: 999;
        text-wrap: nowrap;
    }

    @media (width < 1200px){
        .content_container.title_page{
            justify-content: space-evenly;
            gap: 8.5vh;
        }
        .title_name{
            text-wrap: balance;
            text-align: center;
        }
    }
    @media (width < 700px){
        #MainPage_titlePageSVG{
            width: 100%;
            top: 14%;
            left: 1.75%;
        }
        .title_name{
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
        background-color: hsl(0, 0%, 0%);
        box-shadow: none;
        border: none;
    }
    .content_container.greeting_page{
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr 1.2fr;
        align-content: center;
        justify-items: center;
    }
    .wrapper_greetingSVG{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .MainPage_greetingPageSVG{
        width: max(10rem, 75%);
        max-height: 70vh;
        align-self: center;
    }
    .text.introducing{
        display: flex;
        flex-direction: column;
        align-self: center;
        width: 80%;
    }
    .text.introducing > p{
        font-family: 'Subjectivity_Medium', Tahoma, Verdana, sans-serif;
        font-size: var(--text_size_medium);
        line-height: var(--text_line_height_medium);
        text-wrap: pretty;
    }
    .text.introducing > p > span{
        font-family: 'Subjectivity_Bold', Tahoma, Verdana, sans-serif;
        background: linear-gradient(-177.5deg, var(--element_background_color_lightestCyan), var(--background_color_darkCyanSaturated));
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: var(--text_size_medium_big);
        text-wrap: nowrap;
    }

    @media (width < 1100px) {
        .content_container.greeting_page{
            grid-auto-flow: row;
            grid-auto-rows: 1fr 2fr;
        }
        .MainPage_greetingPageSVG{
            width: max(27.5rem, 60%);
            max-height: 45vh;
        }
        .text.introducing > p{
            text-align: center;
            text-wrap: pretty;
            font-size: max(2vw, 1.3rem);
            line-height: max(3.5vw, 2rem);
        }
        .text.introducing > p > span{
            font-size: max(2.5vw, 1.5rem);
        }
    }
    @media (width < 500px) {
        .text.introducing{
            width: 100%;
        }
        .MainPage_greetingPageSVG{
            width: 100%;
        }
        .text.introducing{
            padding-inline: max(1rem, 1vw);
        }
        .text.introducing > p{
            font-size: min(4.5vw, 1.3rem);
            line-height: min(7.5vw, 2rem);
        }
        .text.introducing > p > span{
            font-size: min(5.5vw, 1.5rem);
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
        font-family: 'Brolimo', system-ui, sans-serif;
        font-size: max(4vw, 3.5rem);
    }
    .span_CV{
        font-family: 'Subjectivity_Bold', system-ui, sans-serif;
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
        border-radius: max(1rem, 1vw);
        filter: blur(max(7.5rem, 7.5vw));
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
        padding: max(1rem, 1vw) max(4rem, 4vw);
        text-wrap: balance;
        text-decoration: none;
        font-family: "Neutral_Normal", system-ui, sans-serif;
        font-size: max(1.75vw, 1.75rem);
        color: var(--background_color_lightCyan);
        text-shadow: 0rem 0rem 0.75rem var(--background_color_lightCyanSaturated);
        backdrop-filter: blur(max(0.6rem, 0.6vw));
        /* background: radial-gradient(var(--background_color_darkCyan) 1%, var(--background_color_darkGray) 150%); */
        border-radius: max(5rem, 5vw);
        border: max(4px, 0.250vw) var(--background_color_lightCyanSaturated) solid;
        transition: filter 0.15s ease-out, box-shadow 0.15s ease-out, translate 0.75s var(--wiggleTransition);
    }
    .MainPage_cvDownloadDecor{
        height: max(2.25rem, 2.25vw);
        filter: drop-shadow(0 0 max(1rem, 1vw) var(--background_color_lightCyanSaturated));
    }

    .CV_downloadLink > .CV_downloadLinkInside:hover{
        color: var(--text_color_gray5);
        text-shadow: 0rem 0rem max(0.75rem, 0.75vw) var(--text_color_gray5);
        translate: 0 max(0.4rem, 0.35vw);
        box-shadow: inset 0 0 max(1.25rem, 1.25vw) 0.2rem var(--background_color_lightCyanSaturated),
                    0 max(0.5rem, 0.5vw) max(1rem, 1vw) 0.25rem var(--background_color_lightCyanSaturated);
    }

    .CV_downloadLink::before{
        content: '';
        position: absolute;
        top: max(0.6rem, 0.45vw);
        border-radius: max(2rem, 2vw);
        width: 100%;
        height: 115%;
        border: max(4px, 0.250vw) var(--background_color_lightCyanSaturated) solid;
        z-index: -1;

        background-image: radial-gradient(var(--text_color_gray90) 15%, var(--background_color_darkCyanSaturated) 100%);
        background-size: 100% 100%;
        background-position: center top;
        background-repeat: no-repeat;
    }

    @media (width < 670px) {
        .content_container.CV_download_page{
            grid-template-rows: 1fr 1.5fr;
        }
        .text.cvDownload > p{
            font-size: min(9vw, 3.5rem);
        }
        .span_CV{
            font-size: min(12.5vw, 4.5rem);
        }
        .span_CV::before{
            filter: blur(max(17.5vw, 3rem));
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
            font-size: min(6vw, 1.75rem);
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
    }
    .top_part.page3{
        border-block: max(5px, 0.4vw) var(--cyan_outline) solid;
    }
    .bottom_part.page3{
        border-bottom: max(5px, 0.4vw) var(--cyan_outline) solid;
    }
    .MY{
        width: max(50%, 47.5vh);
        height: 100%;
    }
    .earLikeThing{
        height: 100%;
        max-width: 30%;
    }
    .photo_collection_text{
        font-family: 'Brolimo', system-ui, sans-serif;
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
    
    @media (width < 1200px) {
        .earLikeThing{
            width: 40%;
            height: min(17.5rem, 85%);
        }
        .MY{
            height: 60%;
            width: 60%;
        } 
    }
    @media (width < 800px) {
        .MY{
            height: 35%;
            width: 100%;
            min-height: auto;
        } 
        .earLikeThing{
            height: 55%;
            max-height: 20vh;
            width: 50%;
            max-width: none;
        }
        .bottom_part.page3{
            justify-content: center;
        } 
        .photo_collection_text{
            text-align: center;
            font-size: min(19vw, 6rem);
        }
        .copyright_text{
            display: none;
        }
        .top_part.page3{
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5vh;
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
        grid-template-rows: 1fr;
        gap: max(7.5vw, 2rem);
    }
    .left_part.page4, .right_part.page4{
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .sunsetIMG_box{
        width: 100%;
        height: 90%;
        max-height: 75vh;
        z-index: 1;
        background-image: url(/src/lib/compressed_images/sunset_inthe_clouds_HighlyCompressed.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        /* background-color: var(--background_color_alternativeLightYellow); */
        /* background: radial-gradient(var(--background_color_alternativeLightYellow) 55%, var(--background_color_alternativeLightYellow_lowerOpacity) 125%); */
        border-radius: max(1vw, 1rem);
    }
    .sunsetInTheCloudsIMG{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
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
        height: max(4rem, 22.5vh - 12.5%);
        /* height: var(--yellowBox_height); */
        width: 100%;
        bottom: 0;
        /* background-color: var(--background_color_alternativeLightYellow); */
        background: radial-gradient(var(--background_color_alternativeLightYellow) 55%, var(--background_color_alternativeLightYellow_Darker) 125%);
        border-radius: max(1rem, 1vw);
    }
    .page4_title_text{
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        --page4_title_text_size: max(3vw, 2.85rem);
        font-size: var(--page4_title_text_size);
        line-height: var(--page4_title_text_size);
        padding-block-start: min(8vw, 15vh);
    }

    @media (width < 1000px) {
        .content_container.page4{
            grid-template-columns: 1fr;
            grid-auto-rows: 1.65fr;
            gap: max(8vh, 4rem);
        }
        .page4_title_text{
            padding-block-start: max(1rem, 2.5vh);
            --page4_title_text_size: min(9vw, 2.65rem);
            font-size: var(--page4_title_text_size);
            line-height: var(--page4_title_text_size);
        }

        .right_part.page4::before{
            height: min(10vh, 22.5vw);
        }
        .left_part.page4{
            order: 2;
        }
        .sunsetIMG_box{
            height: 87.5%;
            max-height: 50vh;
        }
    }
    @media (width < 1000px) and (height < 690px) {
        .content_container.page4{
            gap: min(6vh, 3rem);
        }
    }
    /* PAGE 5 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.page5{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        position: relative;
        border-radius: max(1rem, 1vw);
        overflow: clip;
    }
    .dandelion_img_box{
        background-image: url(/src/lib/compressed_images/Sunflower_HighlyCompressed.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .dandelion_img_box:has(.dandelion.IMG1){
        scale: -1 1;
    }
    .dandelion{
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
        /* background-color: var(--background_color_alternativeLightYellow); */
        /* background: radial-gradient(var(--background_color_alternativeLightYellow) 55%, var(--background_color_alternativeLightYellow_lowerOpacity) 125%); */
    }
    .page5_title_text{
        font-family: 'Misto', Verdana, sans-serif;
        text-align: center;
        font-size: max(7.5vw, 5rem);
        line-height: max(6.5vw, 4rem);
        position: absolute;
        place-self: center;
    }
    .page5_gradient{
        width: 100%;
        height: 100%;
        opacity: 0.75;
        background: linear-gradient(-25deg, hsl(93, 8%, 40%), hsl(94, 8%, 65%));
    }
    

    @media (width < 800px) {
        .content_container.page5{
            --_central_row: 37.5%;
            --_edge_rows: calc((100% - var(--_central_row)) / 2);
            grid-template-columns: 100%;
            grid-template-rows: var(--_edge_rows) var(--_central_row) var(--_edge_rows);
        }
        .page5_title_text{
            font-size: 9vw;
            line-height: 9vw;
        }
    }

    /* PAGE 6 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.page6{
        display: grid;
        grid-template-columns: 2.5fr 1fr;
        grid-template-rows: 1fr;
        gap: max(3vw, 5vh);
    }
    .right_part.page6{
        width: max(50%, 8.5rem);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        justify-self: flex-end;
    }
    .left_part.img_box{
        min-height: 100%;
        width: 100%;
        background-image: url(/src/lib/compressed_images/golden_leaves_HeavilyCompressed.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        /* background-color: var(--background_color_alternativeLightYellow); */
        /* background: radial-gradient(var(--background_color_alternativeLightYellow) 55%, var(--background_color_alternativeLightYellow_lowerOpacity) 125%); */
        border-radius: max(1vw, 1rem);
    }
    .goldenLeaves{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: max(1rem, 1vw);
    }   
    .MainPage_YellowHighlight{
        width: 100%;
        border-radius: max(1rem, 1vw);
    }
    .page6_text{
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        font-size: 3.75vw;
        line-height: 4.5vw;
        writing-mode: vertical-rl;
    }
    
    @media (width < 1000px) {
        .content_container.page6{
            grid-template-columns: 1fr;
            grid-template-rows: 1.6fr 1fr;
        } 
        .right_part.page6{
            width: 100%;
            align-items: start;
        }
        .goldenLeaves{
            height: 100%;
            max-height: 60svh;
        }
        .MainPage_YellowHighlight{
            width: min(35vw, 12.5rem);
            rotate: 0deg;
        }
        .page6_text{
            --font_size_golden_leaves: min(11vw, 3.65rem);
            font-size: var(--font_size_golden_leaves);
            line-height: var(--font_size_golden_leaves);
            writing-mode: horizontal-tb;
        }
    }

    /* PAGE 7 */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.page7{
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;

        overflow: clip;
        border-radius: max(1vw, 1rem);
        position: relative;
        isolation: isolate;
    }
    .image_wrapper_page7{
        max-width: 100%;
        min-height: 100%;
        background-image: url(/src/lib/compressed_images/Violet_flowers_HighlyCompressed.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        /* background-color: var(--background_color_alternativeLightYellow); */
        /* background: radial-gradient(var(--background_color_alternativeLightYellow) 55%, var(--background_color_alternativeLightYellow_lowerOpacity) 125%); */
    }
    .Violet_flowers{
        width: 100%;
        height: 100%;
        object-fit: cover;
        /* scale: -1 1; */
    }
    
    .text_wrapper_page7{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: 'Misto', Verdana, sans-serif;
        text-align: end;
        text-wrap: balance;
        font-size: max(4.5rem, 8vw);
        line-height: max(6rem, 10vw);
        inset: 5% 10%;
        direction: rtl;
    }
    .text_wrapper_page7.firstLayer{
        z-index: 2;
    }
    .text_wrapper_page7.secondLayer{
        color: var(--background_color_alternativeLightYellow);
        filter: blur(max(0.75rem, 1vw));
        z-index: 1;
    }
    @media (width < 1100px) {
        .text_wrapper_page7{
            font-size: min(4.5rem, 11.5vw);
            line-height: min(6rem, 15vw);
        }
    }

/* ------------------------------------- */
    .content_container.page8{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        gap: max(4vw, 5vh);

        position: relative;
        isolation: isolate;
    }
    .image_wrapper_page8{
        max-width: 100%;
        min-height: 100%;
        background-image: url(/src/lib/compressed_images/Modern_building_compressed.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        /* background-color: var(--background_color_alternativeLightYellow); */
        /* background: radial-gradient(var(--background_color_alternativeLightYellow) 55%, var(--background_color_alternativeLightYellow_lowerOpacity) 125%); */
        border-radius: max(1vw, 1rem);
        overflow: clip;
    }
    .Modern_building{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .text_wrapper_page8{
        display: flex;
        align-items: center;

        font-family: 'Neutral_Normal';
        text-wrap: balance;
        font-size: max(3rem, 3.25vw);
        line-height: max(3rem, 3.25vw);
    }

    @media (width < 1100px) {
        .content_container.page8{
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr;
        }
        .text_wrapper_page8{
            font-size: min(3rem, 10vw);
            line-height: min(3rem, 10vw);
        }
    }

/* ------------------------------------- */
    @media (width < 1100px) {
        .content_container{
            width: 87.5%;
            height: 87.5%;
        }
    }
    @media (width < 1100px) and (height < 690px){ 
        .content_container{
            width: 87.5%;
            height: 90%;
        }
    }
</style>