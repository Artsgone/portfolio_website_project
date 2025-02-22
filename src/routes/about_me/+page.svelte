<script>
    import Navbar from '$lib/reusable_components/Navbar.svelte'
    import Header from '$lib/reusable_components/Header.svelte'
    import Footer from '$lib/reusable_components/Footer.svelte'
    import LoadingScreen from '$lib/reusable_components/Loading_screen.svelte'
    import ScrollUpButton from '$lib/reusable_components/ScrollUp_button.svelte'
    import { saveScrollY } from '$lib/saveScrollY'
    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'

    import AboutMe_OutlineTitleDecorSVG from '$lib/svg_files/AboutMe/AboutMe_OutlineTitleDecorSVG.svg'
    import AboutMe_titlePageSVG from '$lib/svg_files/AboutMe/AboutMe_TitleDecorSVG.svg'

    import { onMount } from 'svelte';
    import { writable } from "svelte/store";
    import { scale } from 'svelte/transition';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { elasticOut } from 'svelte/easing';
    
    $: innerWidth = 0
    let showLanguagesDesktop = false
    let showSkillsTitleDesktop = false
    let showSkillsDesktop = false

    let pageLoaded = false
    onMount(() => {
        const oldScrollY = sessionStorage.getItem("stored_scrollY")
        if (oldScrollY != null) {
            svelte_main_element.scrollTo({ top: oldScrollY, behavior: 'auto' })
        }
        
        showLanguagesDesktop = innerWidth > 1200 ? true : false
        showSkillsTitleDesktop = innerWidth > 1000 ? true : false
        showSkillsDesktop = innerWidth > 800 ? true : false
        
        pageLoaded = true
    });
    beforeNavigate(({to, from}) => {
        pageLoaded = false
        if ( from?.url.pathname == "/about_me" && to?.url.pathname == undefined ) {
            saveScrollY.updateScrollY(y)
        } else {
            saveScrollY.updateScrollY(0)
        }
    });
    afterNavigate(() => {
        pageLoaded = true
    });

    $: innerHeight = 0
    let y = 0
    let svelte_main_element
    
    let timeIsOut = false
    let newY = []
    $: oldY = newY[1]

    function updateY(){
        if (!timeIsOut) {
            setTimeout(function () {
                y = svelte_main_element.scrollTop
                newY.push(y)
                if(newY.length > 5) {
                    newY.shift()
                }
                newY=newY
                timeIsOut = false
            }, 150)
            timeIsOut = true
        }
    }

    const pathsToImages = {
        0: 'AboutMe_EducationSVG',
        1: 'AboutMe_LanguagesDecorSVG',
        2: 'AboutMe_LanguagesDecorMobile',
        3: 'AboutMe_LanguagesYellowHighlight',
        4: 'AboutMe_SkillsTitleSVG',
        5: 'AboutMe_SkillsTitleSVG_Mobile',
        6: 'AboutMe_Skills',
        7: 'AboutMe_Skills_Mobile',
        8: 'AboutMe_OtherPE_Rounded',
        9: 'AboutMe_FooterDecor',
    }
    
    const imageStore = writable({})

    const imagesPath = import.meta.glob("/src/lib/svg_files/AboutMe/*.svg")

    async function importAllImages() {
        for (const key in pathsToImages) {
            const pathsToImagesSave = pathsToImages[key]
            const currentPath = `/src/lib/svg_files/AboutMe/${pathsToImagesSave}.svg`
            if (imagesPath[currentPath]) {
                const module = await imagesPath[currentPath]()
                imageStore[pathsToImagesSave] = module.default
                // const img = new Image()
                // img.src = module.default
                // img.onload = () => {
                //     img.decode().then(() => {
                //         imageStore[pathsToImages[key]] = module.default
                //     })
                // }
            }
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
                    entry.target.classList.add("showOnScreen")
                    listOfIntersectedElementsSetter.update(set => {
                        set.add(intersectingElementIndex)
                        
                        amountOfElementsObserved++
                        intersecObserver.unobserve(entry.target)
                        if (amountOfElementsObserved == listLenght - 1) {
                            intersecObserver.disconnect()
                            // console.log("ended")
                        }
                        return set
                    })
                }
                    
            })
        },
            { 
                root: document.querySelector(".svelte_main"),
                threshold: [0.6],
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
        lazyLoadedImages.forEach((image) => {
            function isLoaded() {
                image.removeEventListener("load", isLoaded)
                image.classList.add("isLoaded")
            }
            image.addEventListener("load", isLoaded, {once: true})
        })
    }

    let placeholderSkillsTitle = true
    let placeholderSkillsTitleMobile = true

    let placeholderSkills = true
    let placeholderSkillsMobile = true

    let placeholderEdu = true
</script>

<svelte:head>
    <title>Artem Damin - About me</title>
    <meta name="description" content="About me, Artem Damin." />
</svelte:head>
<svelte:window bind:innerWidth bind:innerHeight  />


<main class="svelte_main" on:scroll={updateY} bind:this={svelte_main_element} use:observeElement use:importAllImages use:lazyLoadedImagesFunc>
    {#if !pageLoaded}
        <LoadingScreen />
    {/if}
    
    {#if y > (innerHeight / 1.1) && oldY > y}
        <ScrollUpButton scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })}/>
    {/if}

    <div class="default_container cyan">
        
        <div class="content_container title_page">
            <Header headerDecorSVG={AboutMe_OutlineTitleDecorSVG} />
            <div class="title_page_name" >
                <div class="title_name darkgrayText">About me</div>
                {#if pageLoaded}
                    <img id="AboutMe_titlePageSVG" src={AboutMe_titlePageSVG} fetchpriority="high" transition:scale={{ delay: 100, duration: 1500, easing: elasticOut, start: 1.1, opacity: 1 }} alt="AboutMe_titlePageSVG">
                {/if}
            </div>
            
            <Navbar firstLink="Art's page" secondLink="Portfolio" thirdLink="Contact" 
                    linkAddress1="" linkAddress2="portfolio" linkAddress3="contact"/>
        </div>
    </div>
    <div class="default_container def_skills_title noBorders">
        <!-- {#if $listOfIntersectedElementsSetter.has(3)} -->
            <div class="content_container skills_title_page">
                <div class="placeholder_SkillsTitle" style:display={showSkillsTitleDesktop ? 'block' : 'none'} class:showPlaceholder={placeholderSkillsTitle} class:hidePlaceholder={!placeholderSkillsTitle}></div>
                <div class="placeholder_SkillsTitle mobile" style:display={!showSkillsTitleDesktop ? 'block' : 'none'} class:showPlaceholder={placeholderSkillsTitleMobile} class:hidePlaceholder={!placeholderSkillsTitleMobile}></div>
                
                <img class="AboutMe_SkillsTitleSVG forLazyLoad" on:transitionstart={() => {placeholderSkillsTitle = false}} style:display={showSkillsTitleDesktop ? 'block' : 'none'} src={($listOfIntersectedElementsSetter.has(1) && showSkillsTitleDesktop) ? imageStore['AboutMe_SkillsTitleSVG'] : ""} alt="AboutMe_SkillsTitleSVG">
                <img class="AboutMe_SkillsTitleSVG forLazyLoad" on:transitionstart={() => {placeholderSkillsTitleMobile = false}} style:display={showSkillsTitleDesktop ? 'none' : 'block'} src={($listOfIntersectedElementsSetter.has(1) && !showSkillsTitleDesktop) ? imageStore['AboutMe_SkillsTitleSVG_Mobile'] : ""} alt="AboutMe_SkillsTitleSVG_Mobile">
            </div>
        <!-- {/if} -->
    </div>
    <div class="default_container def_skills">
        <!-- {#if $listOfIntersectedElementsSetter.has(4)} -->
            <div class="content_container skills_page">
                <div class="skills_box">
                    <div class="placeholder_Skills" style:display={showSkillsDesktop ? 'block' : 'none'} class:showPlaceholder={placeholderSkills} class:hidePlaceholder={!placeholderSkills}></div>
                    <div class="placeholder_Skills mobile" style:display={!showSkillsDesktop ? 'block' : 'none'} class:showPlaceholder={placeholderSkillsMobile} class:hidePlaceholder={!placeholderSkillsMobile}></div>
                    
                    <img class="AboutMe_Skills forLazyLoad" on:transitionstart={() => {placeholderSkills = false}} style:display={showSkillsDesktop ? 'block' : 'none'} src={($listOfIntersectedElementsSetter.has(2) && showSkillsDesktop) ? imageStore['AboutMe_Skills'] : ""} alt="AboutMe_Skills">
                    <img class="AboutMe_Skills_Mobile forLazyLoad" on:transitionstart={() => {placeholderSkillsMobile = false}} style:display={showSkillsDesktop ? 'none' : 'block'} src={($listOfIntersectedElementsSetter.has(2) && !showSkillsDesktop) ? imageStore['AboutMe_Skills_Mobile'] : ""} alt="AboutMe_Skills_Mobile">
                </div>
            </div>
        <!-- {/if} -->
    </div>
    <div class="default_container">
        <!-- {#if $listOfIntersectedElementsSetter.has(5)} -->
            <div class="content_container otherAbilities_page">
                <p class="altyellowText vt">soft skills</p>
                <div class="text otherAbilities">
                    <p class="rounded darkgrayText">
                        <img class="AboutMe_OtherPE_Rounded forLazyLoad" src={$listOfIntersectedElementsSetter.has(3) ? imageStore['AboutMe_OtherPE_Rounded'] : ""} alt="AboutMe_OtherPE_Rounded">
                        Creative at designing things.
                    </p>
                    <p class="darkgrayText">
                        <img class="AboutMe_OtherPE_Rounded forLazyLoad" src={$listOfIntersectedElementsSetter.has(3) ? imageStore['AboutMe_OtherPE_Rounded'] : ""} alt="AboutMe_OtherPE_Rounded">
                        Willing to learn and develope my skills anytime.
                    </p>
                    <p class="rounded darkgrayText">
                        <img class="AboutMe_OtherPE_Rounded forLazyLoad" src={$listOfIntersectedElementsSetter.has(3) ? imageStore['AboutMe_OtherPE_Rounded'] : ""} alt="AboutMe_OtherPE_Rounded">
                        Aiming for hardwork to achieve the best result possible.
                    </p>
                    <p class="darkgrayText">
                        <img class="AboutMe_OtherPE_Rounded forLazyLoad" src={$listOfIntersectedElementsSetter.has(3) ? imageStore['AboutMe_OtherPE_Rounded'] : ""} alt="AboutMe_OtherPE_Rounded">
                        Effective both on my own and in team.
                    </p>
                </div>
                <p class="altyellowText vt">soft skills</p>
            </div>
        <!-- {/if} -->
    </div>
    <div class="default_container def_lang">
        <!-- {#if $listOfIntersectedElementsSetter.has(2)} -->
            <img class="AboutMe_BackgroundSVG forLazyLoad" src={($listOfIntersectedElementsSetter.has(4) && showLanguagesDesktop) ? imageStore['AboutMe_LanguagesDecorSVG'] : ""} alt="AboutMe_BackgroundSVG">
            <img class="AboutMe_BackgroundLanguagesMobile forLazyLoad" src={($listOfIntersectedElementsSetter.has(4) && !showLanguagesDesktop) ? imageStore['AboutMe_LanguagesDecorMobile'] : ""} alt="AboutMe_BackgroundLanguagesMobile">
            <div class="content_container languages_page">
                <p class="grayText65">THE LANGUAGES</p>
                <div class="text languages">
                    <img class="AboutMe_LanguagesYellowHighlight forLazyLoad" src={$listOfIntersectedElementsSetter.has(4) ? imageStore['AboutMe_LanguagesYellowHighlight'] : ""} alt="AboutMe_LanguagesYellowHighlight">
                    <p class="darkgrayText">
                        English - C1 <br>
                        Czech - Fluent <br>
                        Russian - Fluent
                    </p>
                </div>
                <p class="grayText65">...I KNOW</p>
            </div>
        <!-- {/if} -->
    </div>
    <div class="default_container">
        <!-- {#if $listOfIntersectedElementsSetter.has(1)} -->
            <div class="content_container education_page">
                <div class="wrapper_educationSVG">
                    <div class="placeholder_EducationSVG" class:showPlaceholder={placeholderEdu} class:hidePlaceholder={!placeholderEdu}></div>
                    <img class="AboutMe_EducationSVG forLazyLoad" on:transitionstart={() => {placeholderEdu = false}} src={$listOfIntersectedElementsSetter.has(5) ? imageStore['AboutMe_EducationSVG'] : ""} alt="AboutMe_EducationSVG">
                </div>
                <div class="text education">
                    <p class="darkgrayText">
                        <span class="time_range grayText65">2020-2024</span> - <span class="university_name">Smíchovská SPSaG</span> <br>
                        | Field - Cybernetic security |<br>
                    
                        <!-- <span class="time_range grayText65">202x-202x</span> - <span class="university_name">... university</span> <br>
                        | Field - ... |<br> -->
                    </p>
                </div>
            </div>
        <!-- {/if} -->
    </div>
    <Footer firstLink="Art's page" secondLink="Portfolio" thirdLink="Contact" 
    linkAddress1="" linkAddress2="portfolio" linkAddress3="contact"
    titleName="About me" footer_Decor_ID={imageStore['AboutMe_FooterDecor']}/>
</main>

<style>
    :global(body){
        margin: 0;
        padding: 0;
        background-color: var(--background_color_lightYellow);
    }
    :global(body)::-webkit-scrollbar {
        display: none;
    }
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }
    img {
        max-width: 100%;
    }
    
    main.svelte_main{
        overflow-y: scroll;
        height: 100dvh;
        scroll-snap-type: block mandatory;
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
        will-change: opacity;
    }
    .forLazyLoad:is(.isLoaded){
        opacity: 1;
        transition: opacity 0.5s cubic-bezier(0.313, 0.158, 0, 0.524);
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
        overflow-x: clip;
        scroll-snap-align: center;
        scroll-snap-stop: always;
    }
    .content_container{
        height: 87.5%;
        width: 92.5%;
    }
    .default_container:not(.cyan):is(.showOnScreen) > .content_container{
        opacity: 1;
        scale: 1;
        translate: 0 0%;
    }
    .default_container:not(.cyan) > .content_container{
        opacity: 0.75;
        scale: 1.025;
        translate: 0 7.5%;
        transition: opacity 0.75s cubic-bezier(0.313, 0.158, 0, 0.524), scale 1.25s var(--wiggleTransition), translate 1s var(--wiggleTransition);
    }
    .darkgrayText{
        color: var(--text_color_gray90);
    }
    .altyellowText{
        color: var(--background_color_alternativeLightYellow);
    }
    .grayText65{
        color: var(--text_color_gray65);
    }
    .noBorders{
        border: none;
    }
    .default_container.cyan{
        height: 100svh;
        background: radial-gradient(var(--background_color_lightCyan) 55%, var(--background_color_lightCyanSaturated) 125%);
        box-shadow: none;
        border: none;
    }

/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
    .content_container.title_page{
        display: grid;
        grid-template-rows: 0.5fr 1.6fr 1fr;
        align-items: center;
        height: 100%;
        max-height: none;
        max-width: none;
    }
    .title_page_name{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    #AboutMe_titlePageSVG{
        width: var(--element_size_title_decor_about_me);
        position: absolute;
        translate: 25% 2.5%;
    }
    .title_name{
        font-size: var(--text_size_title_ultrabig);
        font-family: 'Brolimo', system-ui, sans-serif;
        text-wrap: nowrap;
        z-index: 999;
    }

    /* PAGE 2 EDUCATION */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.education_page{
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr 1.4fr;
        grid-template-rows: 1fr;
        align-content: center;
        align-items: center;
        justify-items: center;
        gap: 3vw;
    }
    .wrapper_educationSVG{
        width: max(15rem, 60%);
        height: 100%;
        max-height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .AboutMe_EducationSVG{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .placeholder_EducationSVG{
        position: absolute;
        inset: 0;
        background-image: url(/src/lib/svg_files/AboutMe/AboutMe_EducationSVG_Blurred.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
    }
    .placeholder_EducationSVG.showPlaceholder{
        opacity: 1;
    }
    .placeholder_EducationSVG.hidePlaceholder{
        opacity: 0;
        transition: opacity 0.25s var(--bezierTransition);
    }
    .text.education{
        justify-self: start;
    }
    .text.education > p{
        font-family: 'Subjectivity_Medium', system-ui, sans-serif;
        font-size: var(--text_size_medium);
        line-height: var(--text_line_height_medium);
        text-wrap: pretty;
    }
    .text.education > p > span.university_name{
        font-size: max(2.25vw, 2rem);
        font-family: 'Subjectivity_Bold', system-ui, sans-serif;
        background: linear-gradient(-177.5deg, var(--element_background_color_lightestCyan), var(--background_color_darkCyanSaturated));
        background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
    }
    .text.education > p > span.time_range{
        font-family: 'Neutral_Bold', system-ui, sans-serif;
    }

    /* PAGE 3 LANGUAGES */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .default_container.def_lang{
        overflow: clip;
        position: relative;
        z-index: 0;
    }
    .AboutMe_BackgroundSVG{
        position: absolute;
        width: 100%;
    }
    .AboutMe_BackgroundLanguagesMobile{
        width: min(100%, 40rem);
        max-height: 100vh;
        position: absolute;
        translate: 0 -1%;
    }
    .content_container.languages_page{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .content_container.languages_page > p {
        font-family: 'Brolimo', system-ui, sans-serif;
        color: hsl(171, 22%, 85%);
        font-size: max(3.25vw, 2.5rem);
        text-align: center;
        text-wrap: nowrap;
    }
    .text.languages{
        position: relative;
    }
    .text.languages > p{
        font-family: 'Subjectivity_Bold', system-ui, sans-serif;
        font-size: max(2.5vw, 2.25rem);
        line-height: max(3.25vw, 3rem);
        text-wrap: nowrap;
    }
    .AboutMe_LanguagesYellowHighlight{
        position: absolute;
        width: 40%;
        translate: 135% 0%;
        z-index: -1;
        filter: blur(max(0.5rem, 0.5vw));
        border-radius: max(1rem, 1vw);
    }

    /* PAGE 4(1) SKILLS TITLE */ 
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.skills_title_page{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .placeholder_SkillsTitle{
        position: absolute;
        inset: 0;
        background-image: url(/src/lib/svg_files/AboutMe/AboutMe_SkillsTitle_Blurred.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: max(40rem, 65%);
    }
    .placeholder_SkillsTitle.mobile{
        background-image: url(/src/lib/svg_files/AboutMe/AboutMe_SkillsTitleSVG_Mobile_Blurred.png);
        background-size: min(100%, 30rem);
    }
    .placeholder_SkillsTitle.showPlaceholder{
        opacity: 1;
    }
    .placeholder_SkillsTitle.hidePlaceholder{
        opacity: 0;
        transition: opacity 0.5s var(--bezierTransition);
    }
    .AboutMe_SkillsTitleSVG{
        width: max(40rem, 65%);
        max-height: 80vh;
    }

    /* PAGE 4(2) SKILLS */ 
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.skills_page{
        display: flex;
        align-items: center;
        justify-content: center;       
    }
    .skills_box{
        display: flex;
        justify-content: center;
        align-items: center;
        width: max(50rem, 65%);
        height: 100%;
        max-height: 85vh;
        position: relative;
    }
    .AboutMe_Skills{
        width: 100%;
        height: 100%;
    }
    .AboutMe_Skills_Mobile{
        width: 100%;
        height: 100%;
    }
    .placeholder_Skills{
        position: absolute;
        inset: 0;
        background-image: url(/src/lib/svg_files/AboutMe/AboutMe_Skills_Blurred.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
    }
    .placeholder_Skills.mobile{
        background-image: url(/src/lib/svg_files/AboutMe/AboutMe_Skills_Mobile_Blurred.png);
        background-size: min(100%, 25rem) 100%;
        max-height: 85vh;
    }
    .placeholder_Skills.showPlaceholder{
        opacity: 1;
    }
    .placeholder_Skills.hidePlaceholder{
        opacity: 0;
        transition: opacity 0.5s var(--bezierTransition);
    }

    /* PAGE 5 OTHER INFOs */ 
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.otherAbilities_page{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .content_container.otherAbilities_page > p {
        font-family: 'Misto', system-ui, sans-serif;
        font-size: 10vh;
        height: 100%;
        text-align: center;
        text-wrap: nowrap;
        writing-mode: vertical-rl;
    }
    .content_container.otherAbilities_page > p:nth-last-child(1){
        scale: -1 -1;
    }
    .text.otherAbilities{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: max(2.5rem, 4vw);
    }
    .text.otherAbilities > p{
        font-family: 'Subjectivity_Medium', system-ui, sans-serif;
        text-wrap: pretty;
        font-size: max(1.8vw, 1.25rem);
        line-height: max(2.25vw, 1.55rem);
        position: relative;
    }

    .AboutMe_OtherPE_Rounded{
        position: absolute;
        top: 50%;
        translate: -140% -62.5%;
    }

    /* .AboutMe_OtherPE_Square{
        width: max(2.5vw, 1.75rem);
    } */
    .AboutMe_OtherPE_Rounded{
        width: max(2.25vw, 1.5rem);
    }

    /* Global media querries ----------------------------------------------------------- */

    @media (width < 1100px) {
        /* Soft skills */
        .content_container.otherAbilities_page > p {
            font-size: min(9vh, 12vw);
            writing-mode: horizontal-tb;
        }
        .content_container.otherAbilities_page{
            flex-direction: column;
        }
        /* Education */
        .content_container.education_page{
            grid-auto-flow: row;
            grid-auto-rows: 1fr 1fr;
        }
        .wrapper_educationSVG{
            width: min(65%, 20rem);
        }
        .AboutMe_EducationSVG{
            max-height: 40vh;
        }
        .text.education{
            padding-inline: 0.5rem;
        }
        .text.education > p{
            text-align: center;
            font-size: min(5.5vw, 1.8rem);
            line-height: min(8vw, 2.5rem);
        }
        .text.education{
            justify-self: center;
        }
        /* General */
        .content_container{
            width: 87.5%;
            height: 87.5%;
        }
    }
    @media (width < 850px){
        main.svelte_main::-webkit-scrollbar {
            display: none;
        }
        /* Title page */
        .content_container.title_page{
            grid-template-rows: auto 1fr 1.15fr;
        }
        .title_name{
            text-wrap: balance;
            text-align: center;
        }
        /* Skills title */
        .AboutMe_SkillsTitleSVG{
            width: min(100%, 30rem);
        }
        .default_container.def_skills_title{
            height: 60vh;
            scroll-snap-align: start;
        }
        /* Skills */
        .skills_box{
            width: 100%;
        }
        /* Soft skills */
        .AboutMe_OtherPE_Rounded{
            top: 0;
            translate: -10% -125%;
            opacity: 0.75;
        }
        /* Languages */
        .content_container.languages_page > p {
            font-size: min(11vw, 2.5rem);
        }
        .text.languages > p{
            font-size: min(8vw, 2.25rem);
            line-height: min(11vw, 3rem);
        }
    }
    @media (width < 600px){
        #AboutMe_titlePageSVG{
            width: 90%;
            translate: 2% 2%;
        }
        .title_name{
            font-size: 30vw;
            line-height: 22.5vw;
        }
        /* Education */
        .content_container.education_page{
            gap: 0;
        }
        .text.education > p > span.university_name{
            font-size: min(6.5vw, 2rem);
        }
    }
    @media (width < 1100px) and (height < 700px){ 
        .content_container{
            width: 87.5%;
            height: 90%;
        }
    }
</style>