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
    import AboutMe_EducationSVG from '$lib/svg_files/AboutMe/AboutMe_EducationSVG.svg'
    import AboutMe_BackgroundSVG from '$lib/svg_files/AboutMe/AboutMe_LanguagesDecorSVG.svg'
    import AboutMe_BackgroundLanguagesMobile from '$lib/svg_files/AboutMe/AboutMe_LanguagesDecorMobile.svg'
    import AboutMe_LanguagesYellowHighlight from '$lib/svg_files/AboutMe/AboutMe_LanguagesYellowHighlight.svg'
    import AboutMe_SkillsTitleSVG from '$lib/svg_files/AboutMe/AboutMe_SkillsTitleSVG.svg'
    import AboutMe_SkillsTitleSVG_Mobile from '$lib/svg_files/AboutMe/AboutMe_SkillsTitleSVG_Mobile.svg'
    import AboutMe_Skills from '$lib/svg_files/AboutMe/AboutMe_Skills.svg'
    import AboutMe_Skills_Mobile from '$lib/svg_files/AboutMe/AboutMe_Skills_Mobile.svg'
    import AboutMe_OtherPE_Rounded from '$lib/svg_files/AboutMe/AboutMe_OtherPE_Rounded.svg'
    // import AboutMe_OtherPE_Square from '$lib/svg_files/AboutMe/AboutMe_OtherPE_Square.svg'
    import AboutMe_FooterDecor from '$lib/svg_files/AboutMe/AboutMe_FooterDecor.svg'

    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { sineInOut } from 'svelte/easing';
    
    $: innerWidth = 0
	// $: innerHeight = 0
    let previousScreenHeight = 0;

    let pageLoaded = false;
    onMount(() => {
        const oldScrollY = sessionStorage.getItem("stored_scrollY")
        if (oldScrollY != null) {
            svelte_main_element.scrollTo({ top: oldScrollY, behavior: 'auto' })
        }
        // previousScreenHeight = innerHeight;
        pageLoaded = true;
    });
    beforeNavigate(({to, from}) => {
        pageLoaded = false;
        if ( from?.url.pathname == "/about_me" && to?.url.pathname == undefined ) {
            saveScrollY.updateScrollY(svelte_main_element.scrollTop)
        } else {
            saveScrollY.updateScrollY(0)
        }
    });
    afterNavigate(() => {
        pageLoaded = true;
    });

    $: innerHeight = 0;
    $: y = 0;
    let svelte_main_element;
    
    let newY = [];
    $: oldY = newY[1];
    function updateY(event){
        y = svelte_main_element.scrollTop;
        newY.push(y);
        if(newY.length > 5) {
            newY.shift();
        }
        newY=newY;
    }
    
    let intersectingElementIndex
    let listOfIntersectedElements = []
    $: someshit = 0;
    let intervalForLoading = 100

    function ifExistsInArray(idOfElement) {
        if (listOfIntersectedElements.includes(idOfElement)) {
            return true
        }
        return false
    }

    function observeElement() {
        const default_containers = document.querySelectorAll(".default_container")
        // const listLenght = default_containers.length
        // let amountOfElementsObserved = 0;

        // const intersecObserver = new IntersectionObserver( entries => {
        // entries.forEach( entry => {
        //     intersectingElementIndex = entry.target.containerIndex

        //     if (entry.isIntersecting) {
        //         // entry.target.classList.add("showOnScreen")
        //         // entry.target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
        //         // console.log(intersectingElementIndex, entry.target, 'is visible');
        //         if (!listOfIntersectedElements.includes(intersectingElementIndex)) {
        //             listOfIntersectedElements.push(intersectingElementIndex)
        //         }
        //         // listOfIntersectedElements = listOfIntersectedElements
                
        //         someshit++
        //         amountOfElementsObserved++
        //         intersecObserver.unobserve(entry.target)
        //         if (amountOfElementsObserved == listLenght) {
        //             intersecObserver.disconnect()
        //             // console.log("DISCONNECTED")
        //         }
        //     }
        // })
        // },
        //     { 
        //         root: document.querySelector(".svelte_main"),
        //         threshold: 0.1,
        //         rootMargin: "250px",
        //     }
        // )
        
        default_containers.forEach( (container, indexOfContainer) => {
            // container.containerIndex = indexOfContainer
            // intersecObserver.observe(container)

            setTimeout(function () {
                if (!listOfIntersectedElements.includes(indexOfContainer)) {
                    listOfIntersectedElements.push(indexOfContainer)
                    // console.log(indexOfContainer, 'is visible');
                    someshit++
                }
            }, indexOfContainer * intervalForLoading);
        })
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight  />

<main class="svelte_main" on:scroll={updateY} bind:this={svelte_main_element} use:observeElement>
    {#if !pageLoaded}
        <LoadingScreen />
    {/if}

    {#if y > (innerHeight / 1.1) && oldY > y}
        <ScrollUpButton scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })}/>
    {/if}

    <div class="default_container cyan">
        <Header headerDecorSVG={AboutMe_OutlineTitleDecorSVG} />
        <div class="content_container title_page">
            {#if pageLoaded}
                <div class="title_page_name" transition:fade={{ delay: 200, duration: 400, easing: sineInOut}}>
                    <div class="title_name darkgrayText">About me</div>
                    <img id="AboutMe_titlePageSVG" src={AboutMe_titlePageSVG} alt="AboutMe_titlePageSVG">
                </div>
            {/if}
            <Navbar firstLink="Art's page" secondLink="Portfolio" thirdLink="Contact" 
                    linkAddress1="" linkAddress2="portfolio" linkAddress3="contact"/>
        </div>
    </div>
    <div class="default_container">
        {#if ifExistsInArray(1) && someshit > 0}
            <div class="content_container education_page" transition:fade={{ delay: 0, duration: 500, easing: sineInOut}}>
                <img id="AboutMe_EducationSVG" src={AboutMe_EducationSVG} alt="AboutMe_EducationSVG">
                <div class="text education">
                    <p class="darkgrayText">
                        <span class="time_range grayText65">2020-2024</span> - <span class="university_name">Smíchovská SPSaG</span> <br>
                        | Field - Cybernetic security |<br>
                    
                        <!-- <span class="time_range grayText65">202x-202x</span> - <span class="university_name">... university</span> <br>
                        | Field - ... |<br> -->
                    </p>
                </div>
            </div>
        {/if}
    </div>
    <div class="default_container def_lang">
        {#if innerWidth > 1200}
            <img id="AboutMe_BackgroundSVG" src={AboutMe_BackgroundSVG} alt="AboutMe_BackgroundSVG">
        {:else}
            <img id="AboutMe_BackgroundLanguagesMobile" src={AboutMe_BackgroundLanguagesMobile} alt="AboutMe_BackgroundLanguagesMobile">
        {/if}
        
        {#if ifExistsInArray(2) && someshit > 0}
            <div class="content_container languages_page" transition:fade={{ delay: 0, duration: 500, easing: sineInOut}}>
                <p class="grayText65">LANGUAGES</p>
                <div class="text languages">
                    <img class="AboutMe_LanguagesYellowHighlight" src={AboutMe_LanguagesYellowHighlight} alt="AboutMe_LanguagesYellowHighlight">
                    <p class="darkgrayText">
                        English - B2 / C1 <br>
                        Czech - Fluent <br>
                        Russian - Fluent
                    </p>
                </div>
                <p class="grayText65">LANGUAGES</p>
            </div>
        {/if}
    </div>
    <div class="default_container def_skills_title noBorders">
        {#if ifExistsInArray(3) && someshit > 0}
            <div class="content_container skills_title_page" transition:fade={{ delay: 0, duration: 500, easing: sineInOut}}>
                {#if innerWidth > 1000}
                    <img id="AboutMe_SkillsTitleSVG" src={AboutMe_SkillsTitleSVG} alt="AboutMe_SkillsTitleSVG">
                {:else}
                    <img id="AboutMe_SkillsTitleSVG" src={AboutMe_SkillsTitleSVG_Mobile} alt="AboutMe_SkillsTitleSVG_Mobile">
                {/if}
                
            </div>
        {/if}
    </div>
    <div class="default_container def_skills">
        {#if ifExistsInArray(4) && someshit > 0}
            <div class="content_container skills_page" transition:fade={{ delay: 0, duration: 500, easing: sineInOut}}>
                <div class="skills_box">
                    {#if innerWidth > 800}
                        <img id="AboutMe_Skills" src={AboutMe_Skills} alt="AboutMe_Skills">
                    {:else}
                        <img id="AboutMe_Skills_Mobile" src={AboutMe_Skills_Mobile} alt="AboutMe_Skills_Mobile">
                    {/if}
                </div>
            </div>
        {/if}
    </div>
    <div class="default_container">
        {#if ifExistsInArray(5) && someshit > 0}
            <div class="content_container otherAbilities_page" transition:fade={{ delay: 0, duration: 500, easing: sineInOut}}>
                <p class="altyellowText vt">OTHER ABILITIES</p>
                <div class="text otherAbilities">
                    <p class="rounded darkgrayText">
                        <img class="AboutMe_OtherPE_Rounded" src={AboutMe_OtherPE_Rounded} alt="AboutMe_OtherPE_Rounded">
                        Creative at designing things.
                    </p>
                    <p class="darkgrayText">
                        <img class="AboutMe_OtherPE_Rounded" src={AboutMe_OtherPE_Rounded} alt="AboutMe_OtherPE_Rounded">
                        Willing to learn and develope my skills anytime.
                    </p>
                    <p class="rounded darkgrayText">
                        <img class="AboutMe_OtherPE_Rounded" src={AboutMe_OtherPE_Rounded} alt="AboutMe_OtherPE_Rounded">
                        Aiming for hardwork to achieve the best result possible.
                    </p>
                    <p class="darkgrayText">
                        <img class="AboutMe_OtherPE_Rounded" src={AboutMe_OtherPE_Rounded} alt="AboutMe_OtherPE_Rounded">
                        Effective both on my own and in team.
                    </p>
                </div>
                <p class="altyellowText vt">OTHER ABILITIES</p>
            </div>
        {/if}
    </div>
    <Footer firstLink="Art's page" secondLink="Portfolio" thirdLink="Contact" 
    linkAddress1="" linkAddress2="portfolio" linkAddress3="contact"
    titleName="About me" footer_Decor_ID={AboutMe_FooterDecor}/>
</main>

<style>
    :global(body){
        margin: 0;
        padding: 0;
        background-color: var(--text_color_gray90);
    }
    main.svelte_main{
        overflow-y: scroll;
        height: 100dvh;
        scroll-snap-type: block mandatory;
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
    
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
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
    .content_container{
        width: 92.5%;
        height: 87.5%;
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

    @media (width < 800px){
        /* main.svelte_main{
            scroll-snap-type: block mandatory;
        } */
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
        height: 100%;
    }
    .title_page_name{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        /* outline: 2px red solid; */
    }
    #AboutMe_titlePageSVG{
        width: var(--element_size_title_decor_about_me);
        position: absolute;
        translate: 25% 2.5%;
    }
    .title_name{
        font-size: max(15vw, 5.5rem);
        font-family: 'Brolimo', system-ui, sans-serif;
        text-wrap: nowrap;
        z-index: 999;
    }

    @media (width < 1200px){
        .content_container.title_page{
            justify-content: space-evenly;
            gap: 8.5vh;
        }
        #AboutMe_titlePageSVG{
            width: max(65%, 22rem);
            translate: -1% 5%;
        }
        .title_name{
            text-wrap: balance;
            text-align: center;
            font-size: max(22.5vw, 9rem);
            line-height: max(17.5vw, 7rem);
        }
    }
    @media (width < 575px){
        #AboutMe_titlePageSVG{
            width: 90%;
            translate: 2% 2%;
        }
        .title_name{
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

    /* PAGE 2 EDUCATION */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.education_page{
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr 1.4fr;
        align-content: center;
        align-items: center;
        justify-items: center;
        gap: 3vw;
    }
    #AboutMe_EducationSVG{
        width: max(15rem, 60%);
        max-height: 50vh;
        translate: -2% 0;
    }
    .text.education{
        justify-self: start;
    }
    .text.education > p{
        font-family: 'Subjectivity_Medium', system-ui, sans-serif;
        font-size: max(2vw, 1.55rem);
        line-height: max(2.4vw, 1.85rem);
        letter-spacing: -0.5px;
    }
    .text.education > p > span.university_name{
        font-family: 'Subjectivity_Bold', system-ui, sans-serif;
        background: linear-gradient(-177.5deg, var(--element_background_color_lightestCyan), var(--background_color_darkCyanSaturated));
        background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
    }
    .text.education > p > span.time_range{
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        letter-spacing: 0px;
    }

    @media (width < 1100px) {
        .content_container.education_page{
            grid-auto-flow: row;
            grid-auto-rows: 1fr 1fr;
        }
        #AboutMe_EducationSVG{
            width: min(65%, 20rem);
            max-height: 40vh;
        }
        .text.education > p{
            text-align: center;
            font-size: min(5.75vw, 1.65rem);
            line-height: min(7.5vw, 2.25rem);
        }
        .text.education{
            justify-self: center;
        }
    }
    @media (width < 500px) {
        .content_container.education_page{
            gap: 0;
        }
    }

    /* PAGE 3 LANGUAGES */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .default_container.def_lang{
        overflow: clip;
        position: relative;
        z-index: 0;
    }
    #AboutMe_BackgroundSVG{
        position: absolute;
        width: 100%;
    }
    #AboutMe_BackgroundLanguagesMobile{
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
        color: hsl(171, 22%, 80%);
        font-size: max(3.3vw, 2.25rem);
        text-align: center;
        text-wrap: nowrap;
    }
    .content_container.languages_page > p:not(p:nth-last-child(1)){
        align-self: flex-start;
    }
    .content_container.languages_page > p:nth-last-child(1){
        scale: -1 -1;
        align-self: flex-end;
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
        translate: 130% -5%;
        z-index: -1;
        filter: blur(max(0.5rem, 0.5vw));
        border-radius: max(1rem, 1vw);
    }


    @media (width < 800px) {
        .text.languages > p{
            font-size: min(8vw, 2.25rem);
            line-height: min(11vw, 3rem);
        }
    }
    @media (height < 800px) {
        .content_container.languages_page > p {
            visibility: hidden;
        }
    }

    /* PAGE 4(1) SKILLS TITLE */ 
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.skills_title_page{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #AboutMe_SkillsTitleSVG{
        width: max(40rem, 65%);
    }

    @media (width < 800px) {
        #AboutMe_SkillsTitleSVG{
            width: min(100%, 30rem);
        }
        .default_container.def_skills_title{
            height: 40vh;
            scroll-snap-align: start;
        }
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
    }
    #AboutMe_Skills{
        width: 100%;
        max-height: 85vh;
    }
    #AboutMe_Skills_Mobile{
        width: 100%;
        max-height: 85vh;
    }
    @media (width < 800px) {
        .skills_box{
            width: 100%;
        }
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
        font-size: 9.85vh;
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
        /* font-size: var(--text_size_medium);
        line-height: var(--text_line_height_medium); */
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

    @media (width < 1100px) {
        .content_container.otherAbilities_page > p {
            font-size: min(9vh, 6vw);
        }
    }
    @media (width < 1000px) {
        .content_container.otherAbilities_page{
            flex-direction: column;
        }
        .content_container.otherAbilities_page > p {
            writing-mode: horizontal-tb;
            font-size: 9.25vw;
        }
    }
    @media (width < 800px) {
        .AboutMe_OtherPE_Rounded{
            top: 0;
            translate: -10% -125%;
            opacity: 0.75;
        }
    }

    /* MEDIA for content container */
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