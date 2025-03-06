<script>
    import Navbar from '$lib/reusable_components/Navbar.svelte'
    import Header from '$lib/reusable_components/Header.svelte'
    import Footer from '$lib/reusable_components/Footer.svelte'
    import LoadingScreen from '$lib/reusable_components/Loading_screen.svelte'
    import { saveScrollY } from '$lib/saveScrollY'
    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'

    import Contact_OutlineTitleDecor from '$lib/svg_files/Contact/Contact_OutlineTitleDecor.svg'
    import Contact_TitleDecor from '$lib/svg_files/Contact/Contact_TitleDecor.svg'
    import Global_arrowDropdownMenu from '$lib/svg_files/GlobalSVGs/Global_arrowDropdownMenu.svg'
    import submitButtonArrow from '$lib/svg_files/GlobalSVGs/Global_arrowBack.svg'

    import { onMount, tick } from "svelte";
    import { fly, scale } from 'svelte/transition';
    import { elasticOut, sineInOut } from 'svelte/easing';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { writable } from "svelte/store";
    
    let pageLoaded = false;
    onMount(async() => {
        const oldScrollY = sessionStorage.getItem("stored_scrollY")
        if (oldScrollY != null) {
            svelte_main_element.scrollTo({ top: oldScrollY, behavior: 'auto' })
        }
        pageLoaded = true;
        importAllImages()
        lazyLoadedImagesFunc()
        ScrollUpButton = (await import('$lib/reusable_components/ScrollUp_button.svelte')).default
        Info_screen = (await import('$lib/reusable_components/Info_screen.svelte')).default
    });
    beforeNavigate(({to, from}) => {
        pageLoaded = false;
        if ( from?.url.pathname == "/contact" && to?.url.pathname == undefined ) {
            saveScrollY.updateScrollY(y)
        } else {
            saveScrollY.updateScrollY(0)
        }
    });
    afterNavigate(() => {
        pageLoaded = true;
    });

    let ScrollUpButton = ""
    let Info_screen = ""

    const pathsToImages = {
        0: 'Contact_BackgroundDecor',
        1: 'Contact_BackgroundDecor_Mobile',
        2: 'AboutMe_LanguagesDecorMobile',
        3: 'Contact_BackgroundDecor_Mobile_Small',
        4: 'Contact_Insta_Icon',
        5: 'Contact_Telegram_Icon',
        6: 'Contact_ArrowForLinks',
        7: 'Contact_FooterDecor',
    }
    
    const imageStore = writable({})

    const imagesPath = import.meta.glob("/src/lib/svg_files/Contact/*.svg")

    async function importAllImages() {
        for (const key in pathsToImages) {
            const pathsToImagesSave = pathsToImages[key]
            const currentPath = `/src/lib/svg_files/Contact/${pathsToImagesSave}.svg`
            if (imagesPath[currentPath]) {
                const module = await imagesPath[currentPath]()
                imageStore.update(store => {
                    store[pathsToImagesSave] = module.default
                    return store
                })
                // imageStore[pathsToImagesSave] = module.default
            }
        }
    }

    $: innerWidth = 0
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
    
    let optionMenuShow = false;
    let infoScreenShow = false;
    let border_radius = "inherit"
    let arrow_rotation = "1"

    async function optionMenuDisplay() {
        if (!optionMenuShow) {
            border_radius = "border-radius: max(1.7rem, 2.1vw) max(1.7rem, 2.1vw) 0 0; filter: drop-shadow(0 0 max(.4rem, .4vw) var(--background_color_lightCyan_lowerOpacity));"
            arrow_rotation = "180deg"
            optionMenuShow = true
        }
    }
    function optionMenuHide() {
        if (optionMenuShow) {
            border_radius = "inherit"
            if (optionChosenIs) {
                arrow_rotation = "270deg"
            } else {
                arrow_rotation = "0deg"
            }
            optionMenuShow = false
        }
    }
    

    let optionText = "Not specified"
    const typeOfWorkList = ["Web design", "Logo design", "Poster design", "Visual identity", "Product design", "Other type of project"]
    let optionMenu
    let afterClose = false
    let optionChosenIs = false
    $: userInput = ''
    let mouseEnteredButton = false

    function optionClicked() {
        const options = document.querySelectorAll(".tow_option")
        
        options.forEach( (option, index) => {
            option.addEventListener("click", (e) => {
                optionText = typeOfWorkList[index]
                optionChosenIs = true
                optionMenuHide()
                afterClose = true
            })
            option.addEventListener("keydown", (e) => {
                const keyName = e.key
                if (keyName === "Enter") {
                    optionText = typeOfWorkList[index]
                    optionChosenIs = true
                    optionMenuHide()
                    afterClose = true
                }
            })
        })
    }
    function clickedOptionMenuOutside() {
        const itemtypeOfWork = document.querySelector(".itemtypeOfWork")

        window.addEventListener("click", (e) => {
            if (optionMenuShow) {
                if (!optionMenu?.contains(e.target) && !itemtypeOfWork.contains(e.target)) {
                    optionMenuHide()
                }
                afterClose = false
            }
        })
        window.addEventListener("keydown", (e) => {
            if (!optionMenu?.contains(e.target) && !itemtypeOfWork.contains(e.target)) {
                optionMenuHide()
            }
            afterClose = false
        })
    }
    
    function clickedOptionMenu() {
        const itemtypeOfWork = document.querySelector(".itemtypeOfWork")

        itemtypeOfWork.addEventListener("click", (e) => {
            if (!afterClose && !optionMenuShow) {
                optionMenuDisplay()
            } else if (optionMenuShow) {
                optionMenuHide()
            }
            afterClose = false
        })
        itemtypeOfWork.addEventListener("keydown", (e) => {
            const keyName = e.key;
            if (keyName === "Enter") {
                if (!afterClose && !optionMenuShow) {
                    optionMenuDisplay()
                } else if (optionMenuShow) {
                    optionMenuHide()
                }
                afterClose = false
            }
        })
    }

    let status = "";
    const handleSubmit = async data => {
        submitEmail()
        status = 'Submitting...'
        const formData = new FormData(data.currentTarget)
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json
        });
        const result = await response.json();
        if (result.success) {
            // console.log(result);
            status = result.message || "Success"
            document.querySelector(".contact_form_grid").reset()
            optionText = "Not specified"
            // const interval = setInterval(() => {
                
            // }, 1000)
            // return () => clearInterval(interval)
            setTimeout(function () {
                closeSubmitInfo()
            }, 1000)
            // reloadPage()
            // goto_pageReload = true
        }
    }
    function submitEmail() {
        infoScreenShow = true
    }
    function closeSubmitInfo() {
        infoScreenShow = false
    }
    // function resetform() {
    //     document.querySelector(".contact_form_grid").reset()
    // }

    // let goto_pageReload = false
    // function reloadPage() {
    //     if (!goto_pageReload) {
    //         const thisPage = window.location.pathname;
    //         // console.log('goto ' + thisPage);
    //         const interval = setInterval(() => {
    //             goto('/').then( () => goto(thisPage + '#contactForm_container'))
    //         }, 2000)
    //         return () => clearInterval(interval)
    //     }
    // }
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
</script>

<svelte:head>
    <title>Artem Damin - Contact me</title>
    <meta name="description" content="Contact me, Artem Damin." />
</svelte:head>
<svelte:window bind:innerWidth bind:innerHeight />


<main class="svelte_main" on:scroll={updateY} bind:this={svelte_main_element}>
    {#if !pageLoaded}
        <LoadingScreen />
    {/if}
    <!-- closeInfoScreen={() => {infoScreenShow = false}} -->
    {#if infoScreenShow}
        <!-- <Info_screen statusCode={status} /> -->
        <svelte:component this={Info_screen} statusCode={status} />
    {/if}

    {#if y > (innerHeight / 1.1) && oldY > y}
        <!-- <ScrollUpButton scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })}/> -->
        <svelte:component this={ScrollUpButton} scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })}/>
    {/if}

    <div class="default_container cyan">
        
        <div class="content_container title_page">
            <Header headerDecorSVG={Contact_OutlineTitleDecor} />
            <div class="title_page_name">
                <div class="title_name darkgrayText">Contact</div>
                {#if pageLoaded}
                    <img id="Contact_TitleDecor" src={Contact_TitleDecor} fetchpriority="high" transition:scale={{ delay: 100, duration: 1500, easing: elasticOut, start: 1.1, opacity: 1 }} alt="Contact_TitleDecor">
                {/if}
            </div>
            
            <Navbar firstLink="Art's page" secondLink="About me" thirdLink="Portfolio" 
                    linkAddress1="" linkAddress2="about_me" linkAddress3="portfolio"/>
        </div>
    </div>
    <div class="default_container" id="contactForm_container">
        
        <!-- <object class="Contact_BackgroundDecor forLazyLoad" data={innerWidth > 1000 ? imageStore['Contact_BackgroundDecor'] : ""} type="image/svg+xml" aria-label="Contact_BackgroundDecor"></object>
        <object class="Contact_BackgroundDecor forLazyLoad" data={innerWidth < 600 ? imageStore['Contact_BackgroundDecor_Mobile_Small'] : ""} type="image/svg+xml" aria-label="Contact_BackgroundDecor"></object>
        <object class="Contact_BackgroundDecor forLazyLoad" data={(innerWidth <= 1000 && innerWidth >= 600) ? imageStore['Contact_BackgroundDecor_Mobile'] : ""} type="image/svg+xml" aria-label="Contact_BackgroundDecor"></object> -->
        <img class="Contact_BackgroundDecor forLazyLoad" src={innerWidth > 1000 ? $imageStore['Contact_BackgroundDecor'] : ""} alt="">
        <img class="Contact_BackgroundDecor forLazyLoad" src={innerWidth < 600 ? $imageStore['Contact_BackgroundDecor_Mobile_Small'] : ""} alt="">
        <img class="Contact_BackgroundDecor forLazyLoad" src={(innerWidth <= 1000 && innerWidth >= 600) ? $imageStore['Contact_BackgroundDecor_Mobile'] : ""} alt="">
        <div class="content_container contact_page" use:clickedOptionMenu use:clickedOptionMenuOutside>
            <p class="contact_title darkgrayText">Contact me</p>
            <form class="contact_form_grid" on:submit|preventDefault={handleSubmit}>
                <input type="hidden" name="access_key" value="b8420fdb-0274-431b-b438-8f96dad35660">
                <!-- Name _____ -->
                <input name="name" type="text" minlength="2" maxlength="25" autocomplete="name" required class="form_item itemName" placeholder="Your name:" bind:value={userInput}>
                <!-- Type of work _____ -->
                <input name="type" type="hidden" value={optionText}>
                <div tabindex="0" role="button" class="form_item itemtypeOfWork" style={border_radius} class:optionChosen={optionChosenIs}>
                    {#if optionText == "Not specified"}
                        Type of work: -
                    {:else}
                        {optionText}
                    {/if}
                    
                    <img class="Global_arrowDropdownMenu" src={Global_arrowDropdownMenu} alt="Global_arrowDropdownMenu" style="rotate: {arrow_rotation};"> 
                    {#if optionMenuShow}
                        <div class="typeOfWork_optionMenu" role="menu" in:fly={{ delay: 0, duration: 2000, easing: elasticOut, y: '-3vh'}} out:fly={{ delay: 0, duration: 100, easing: sineInOut, y: '-5vh' }} use:optionClicked bind:this={optionMenu}>
                            {#each typeOfWorkList as item,i}
                                <div tabindex="0" class="tow_option" in:fly|global={{ delay: (i+1)*100, duration: 1750, easing: elasticOut, y: '-1vh', opacity: 1 }} role="menuitem">0{i + 1}. {item}</div>
                            {/each}
                        </div>
                    {/if}
                </div>
                <!-- email _____ -->
                <input name="email" type="email" autocomplete="email" required class="form_item itemEmail" placeholder="Your email:">
                <!-- text from client _____ -->
                <textarea name="message" minlength="25" rows="3" required class="form_item itemUserText" placeholder="What could I do for you?"></textarea>
                <!-- submit _____ -->
                <!-- on:click={resetform} -->
                <button type="submit" class="submitButton" on:mouseenter={() => (mouseEnteredButton = true)} class:animateButton={mouseEnteredButton} disabled={!userInput}><img class="submitButtonArrow" src={submitButtonArrow} alt="submitButtonArrow"></button>
            </form>
            <div class="links_bottom_part">
                <div class="links">
                    <a href="https://web.telegram.org/" data-sveltekit-reload rel="external" class="link lightgrayText"> <img class="Telegram_Icon forLazyLoad" src={$imageStore['Contact_Telegram_Icon']} alt="Telegram_Icon"> 
                        <img class="Contact_ArrowForLinks forLazyLoad" src={$imageStore['Contact_ArrowForLinks']} alt="Contact_ArrowForLinks">
                    </a>
                    <a href="https://www.instagram.com/" data-sveltekit-reload rel="external" class="link lightgrayText"> <img class="Instagram_Icon forLazyLoad" src={$imageStore['Contact_Insta_Icon']} alt="Instagram_Icon"> 
                        <img class="Contact_ArrowForLinks forLazyLoad" src={$imageStore['Contact_ArrowForLinks']} alt="Contact_ArrowForLinks">
                    </a>
                </div>
                <a target="_blank" class="emailAdress_Text" href="mailto:artemdamin.contact@gmail.com">artemdamin.contact@gmail.com</a>
            </div>
        </div>
    </div>
    <Footer firstLink="Art's page" secondLink="About me" thirdLink="Portfolio"
    linkAddress1="" linkAddress2="about_me" linkAddress3="portfolio"
    titleName="Contact" footer_Decor_ID={$imageStore['Contact_FooterDecor']} />
</main>

<style>
    :global(body){
        margin: 0;
        padding: 0;
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
    img{
        max-width: 100%;
    }
    img[src=""] {
        visibility: hidden;
    }
    
    main.svelte_main{
        overflow-y: scroll;
        height: 100svh;
        scroll-snap-type: block mandatory;
        /* background-color: var(--background_color_lightYellow); */
    }
    
    main.svelte_main::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    main.svelte_main::-webkit-scrollbar-track {
        background-color: var(--cyan_outline_bright);
    }
    main.svelte_main::-webkit-scrollbar-thumb {
        background-color: var(--background_color_lightYellow_middlealternative);
        border-radius: 0 5rem 5rem 0;
    }
    button:disabled{
        background: radial-gradient(var(--text_color_gray50) 25%, var(--text_color_gray65) 100%);
    }
    .forLazyLoad{
        opacity: 0;
        will-change: opacity;
    }
    .forLazyLoad:is(.isLoaded){
        opacity: 1;
        /* visibility: visible; */
        transition: opacity 0.5s cubic-bezier(0.313, 0.158, 0, 0.524);
    }

    .default_container{
        width: 100%;
        height: 100svh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightYellow);
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
        overflow-x: clip;
        position: relative;
        z-index: 0;
        scroll-snap-stop: always;
        scroll-snap-align: center;
    }
    .content_container{
        height: 87.5%;
        width: 92.5%;
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
        flex-direction: column;
        position: relative;
    }
    #Contact_TitleDecor{
        width: var(--element_size_title_decor_contact);
        position: absolute;
        translate: 25% 7.5%;
    }
    .title_name{
        font-size: var(--text_size_title_ultrabig);
        font-family: 'Brolimo', system-ui, sans-serif;
        z-index: 999;
    }

    /* CONTACT */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */
    input {
        all: unset;
    }
    .content_container.contact_page{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }
    .Contact_BackgroundDecor{
        width: 100%;
        position: absolute;
        z-index: -1;
        translate: 0% 15%;
    }
    .contact_title{
        font-family: 'Brolimo', system-ui, sans-serif;
        font-size: max(10vw, 7.5rem);
        margin: 0;
        align-self: flex-start;
        text-wrap: nowrap;
    }
    .contact_form_grid{
        width: 100%;
        display: grid;
        grid-template-columns: 3fr 2.5fr 3.5fr;
        grid-template-rows: repeat(2, 1fr);
        grid-auto-rows: 0.5fr;
        gap: 1.7vw 0.85vw;

        position: relative;
    }
    .form_item{
        color: var(--text_color_gray90);
        font-family: 'Subjectivity_Regular', system-ui, sans-serif;
        letter-spacing: max(0.05vw, 0.07rem);
        font-size: max(1.25vw, 1.25rem);
        padding: max(1.25vw, 1.1rem) max(2vw, 1.75rem);
        border-radius: max(1.9rem, 2.1vw);
        border: max(4px, 0.250vw) var(--cyan_outline_bright) solid;
        background-color: var(--background_color_lightYellow);
    }
    .form_item:focus-visible{
        outline: max(0.2rem, 0.2vw) var(--background_color_lightCyan) solid;
    }
    .form_item:not(:focus-visible):user-invalid{
        outline: max(0.2rem, 0.2vw) hsl(0, 50%, 55%) solid;
    }
    .form_item.itemUserText{
        grid-area: 2 / 1 / 5 / 4;
        line-height: max(1.5rem, 3vh);
        padding-inline-end: max(5vw, 3.5rem);
        resize: none;
    }
    .form_item.itemUserText::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    .form_item.itemUserText::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .form_item.itemUserText::-webkit-scrollbar-thumb {
        background-color: var(--background_color_lightCyan_lowerOpacity);
        border-radius: 5rem;
    }

    .form_item.itemtypeOfWork{
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        
        color: var(--text_color_gray40);
        transition: border-radius 0.15s ease-in-out, filter 0.15s ease-in-out;
    }
    .form_item.itemtypeOfWork:is(.optionChosen){
        color: var(--text_color_gray90);
    }

    .Global_arrowDropdownMenu{
        position: absolute;
        height: 50%;
        right: max(1.3rem, 1.75vw);
        transition: rotate 1s var(--wiggleTransition), scale 1s var(--wiggleTransition);
    }
    @media (hover: hover) {
        .form_item.itemtypeOfWork:not(.optionChosen):hover > .Global_arrowDropdownMenu{
            scale: 1.1;
        }
    }
    
    .typeOfWork_optionMenu{
        box-sizing: border-box;
        position: absolute;
        z-index: 500;
        inset: calc(100% + max(4px, 0.250vw)) 0 auto 0;
        width: 100%;
        background-color: var(--background_color_lightYellow);
        color: var(--text_color_gray90);
        border-radius: 0 0 max(1.5rem, 2vw) max(1.5rem, 2vw);
        outline: max(4px, 0.250vw) var(--cyan_outline_bright) solid;
        /* filter: drop-shadow(0 0 max(.4rem, .4vw) var(--background_color_lightCyan_lowerOpacity)); */

        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: max(3.75vw, 7vh);
        align-items: center;
        min-height: 7.5vh;
        max-height: 375%;
        overflow-y: scroll;
        overflow-x: clip;
        overscroll-behavior: none;
    }
    .typeOfWork_optionMenu::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    .typeOfWork_optionMenu::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .typeOfWork_optionMenu::-webkit-scrollbar-thumb {
        background-color: var(--background_color_lightCyan_lowerOpacity);
        border-radius: 5rem;
    }
    .tow_option{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 7.5%;
        height: 100%;
        z-index: 999;
        cursor: pointer;
        border-radius: max(1rem, 1vw);
        transition: background-color 0.1s ease, color 0.05s ease, scale 1s var(--wiggleTransition);
    }
    .tow_option:nth-child(2n){
        background-color: var(--background_color_lightCyan_lowerOpacity025);
    }
    .tow_option:hover{
        scale: 0.95;
        background-color: var(--cyan_outline_bright);
        color: var(--text_color_gray5);
    }
    .tow_option:focus-visible{
        scale: 0.95;
        background-color: var(--cyan_outline_bright);
        color: var(--text_color_gray5);
    }

    .submitButton{
        position: absolute;
        width: max(4vw, 3.25rem);
        aspect-ratio: 1;
        border-radius: 50%;
        inset: auto min(0.9rem, 2.5vw) min(0.9rem, 2.5vw) auto;

        display: flex;
        align-items: center;
        justify-content: center;

        background: radial-gradient(var(--background_color_lightCyanSaturated) 25%, var(--cyan_outline_bright) 100%);
        /* border: max(4px, 0.250vw) var(--cyan_outline) solid; */
        border: none;
        cursor: pointer;
        transition: scale 1s var(--wiggleTransition), filter 0.15s ease-in-out;
        z-index: 50;
    }
    .submitButtonArrow{
        height: 50%;
        /* aspect-ratio: 1; */
        rotate: 180deg;
        transition: translate 1s var(--wiggleTransition), scale 1s var(--wiggleTransition);
    }
    .submitButton:not(:disabled):hover > .submitButtonArrow{
        translate: 10% 0;
        scale: 1.05;
    }
    .submitButton:not(:disabled):hover{
        scale: 1.05;
        filter: drop-shadow(0 max(.1rem, .1vw) max(.35rem, .35vw) var(--cyan_outline_bright))
    }
    .submitButton.animateButton:is(:disabled) > .submitButtonArrow{
        animation: arrowIcon_animation_Disabled 2s ease-in-out;
    }
    @keyframes arrowIcon_animation{
        0%, 100% {
            translate: 0% 0;
        }
        50%{
            translate: 10% 0;
        }
        60%{
            translate: 15% 0;
        }
        90%{
            translate: -5% 0;
        }
    }
    @keyframes arrowIcon_animation_Disabled{
        0%, 100% {
            rotate: 0;
            translate: 0;
        }
        25%{
            rotate: 0deg;
            translate: max(-0.25rem, -0.25vw) max(-0.25rem, -0.25vw);
        }
        50%{
            rotate: 90deg;
        }
        75%{
            rotate: 0deg;
        }
    }

    /* Bottom part -------------------------------------------------------------------------------------------------- */
    .links_bottom_part{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .emailAdress_Text{
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        font-size: var(--text_size_small);
        background-image: linear-gradient(hsl(169, 20%, 90%) 0%, hsl(169, 20%, 90%) 65%, var(--background_color_lightCyan) 100%);
        background-size: 0% 100%;
        background-position: left bottom;
        background-repeat: no-repeat;
        transition: background-size 0.5s linear(0, 0.5 23.1%, 1 44.7%, 0.892 51.9%, 0.866 55.2%, 0.858 58.5%, 0.864 61.4%, 0.883 64.5%, 1 77.4%, 0.983 81%, 0.978 84.5%, 1);
        text-decoration: none;
        color: var(--text_color_gray90);
    }
    .emailAdress_Text:hover{
        background-size: 100% 100%;
    }
    .links{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: max(1vw, 0.75rem);
    }
    
    .links > a{
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        text-decoration: none;
        font-size: var(--text_size_extra_small);
        /* letter-spacing: 0.05rem; */
        background-color: var(--background_color_lightCyanSaturated);
        box-shadow: inset -0.2rem 0.2rem max(1rem, 1vw) max(0.75rem, 0.5vw) var(--cyan_outline_bright);
        border-radius: 25rem;
        padding: max(1.25vw, 1.15rem) max(2vw, 1.75rem);

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: max(1.5rem, 1.75vw);
        transition: translate 0.75s var(--wiggleTransition), box-shadow 0.2s ease-in-out, background-color 0.3s ease-in-out;
        position: relative;
    }
    .links > a:hover{
        translate: 3% -9%;
        background-color: var(--background_color_lightCyan);
    }
    .links > a:focus-visible{
        translate: 3% -9%;
        background-color: var(--background_color_lightCyan);
    }
    a::after{
        content: "";
        position: absolute;
        background-color: transparent;
        border-radius: 5rem;
        width: 100%;
        height: 100%;
        inset: 0 0 0 0;
        z-index: -100;
    }
    .links > a:is(:hover)::after{
        translate: -3% 9%;
    }
    .Contact_ArrowForLinks{
        width: max(1.25vw, 1rem);
        rotate: 0;
    }
    .Telegram_Icon{
        width: max(1.5vw, 1.25rem);
    }
    .Instagram_Icon{
        width: max(1.5vw, 1.25rem);
    }
    .links > a:not(:hover) > .Contact_ArrowForLinks, .links > a:not(:focus-visible) > .Contact_ArrowForLinks{
        rotate: 0deg;
        transition: rotate 0.75s var(--wiggleTransition)
    }
    .links > a:is(:hover) > .Contact_ArrowForLinks, .links > a:is(:focus-visible) > .Contact_ArrowForLinks{
        rotate: 45deg;
        transition: rotate 0.75s var(--wiggleTransition)
    }
    
/* --------------------------------------------------------------- */

    @media (width < 1200px) {
        .content_container{
            width: 87.5%;
            height: 90%;
        }
        /* --- */
        .contact_form_grid{
            grid-template-columns: 3fr 2.5fr;
            grid-template-rows: repeat(3, 1fr);
            gap: 2.5vw 1vw;
        }
        .form_item.itemUserText{
            grid-area: 3 / 1 / 6 / 3;
        }
        .form_item.itemEmail{
            grid-area: 2 / 1 / 3 / 3;
        } 
        .links > a{
            font-size: var(--text_size_extra_small);
        }
        .emailAdress_Text{
            font-size: var(--text_size_extra_small);
            font-size: min(1.35rem, 4.25vw);
        }
    }
    @media (width < 1100px) and (height < 700px){ 
        .content_container{
            width: 87.5%;
            height: 90%;
        }
    }
    @media (width < 850px) {
        .content_container.title_page{
            grid-template-rows: auto 1fr 1.15fr;
        }
        main.svelte_main::-webkit-scrollbar {
            display: none;
        }
        /* --- */
        .contact_form_grid{
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, 1fr);
            grid-auto-rows: 1.5fr;
            gap: 2.5vw 1vw;
        }
        .Contact_BackgroundDecor{
            translate: 0% 0%;
        }
        
        .form_item{
            font-size: min(4.35vw, 1.25rem);
            padding: max(1vw, 0.9rem) max(2vw, 1.75rem);
        }
        .form_item.itemUserText{
            grid-area: 4 / auto / 6 / auto;
        }
        .form_item.itemEmail{
            grid-area: auto;
        } 
        
        .typeOfWork_optionMenu{
            max-height: 425%;
            grid-auto-rows: max(3.25rem, 5.5vh);
        }
        /* --- */
        .content_container.contact_page{
            gap: 3vh;
        }
        .contact_title{
            align-self: center;
            font-size: min(23vw, 6.5rem);
            text-align: center;
            text-wrap: wrap;
            line-height: min(16vw, 5rem);
        }
        .contact_form_grid{
            gap: 1.5vh;
            grid-template-columns: 100%;
        }
        .links_bottom_part{
            flex-direction: column-reverse;
            align-items: center;
            gap: 4vh;
        }
        .links{
            gap: max(1vw, 0.75rem);
        }
        .links > a {
            gap: min(1.5rem, 5vw);
            padding: max(1.25vw, 1.15rem) max(1.5vw, 1.5rem); 
        }
        .Contact_ArrowForLinks{
            width: max(1.25vw, 1rem);
        }
        .emailAdress_Text{
            margin: 0;
        }
    }
    @media (height < 700px) and (width < 800px) {
        .contact_form_grid{
            grid-auto-rows: 0.8fr;
        }
    }
    @media (width < 600px){
        #Contact_TitleDecor{
            width: 85%;
            translate: 0% 10%;
        }
        .title_name{
            visibility: hidden;
            position: relative;
            word-break: break-all;
            text-wrap: balance;
            text-align: center;
            font-size: 30vw;
            line-height: 25vw;
        }
        .title_name::after{
            content: "Con-tact";
            inset: 0 0 0 0;
            visibility: visible;
            position: absolute;
        }
    }
     
</style>