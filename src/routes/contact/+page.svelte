<script>
    import Navbar from '$lib/reusable_components/Navbar.svelte'
    import Header from '$lib/reusable_components/Header.svelte'
    import Footer from '$lib/reusable_components/Footer.svelte'
    import LoadingScreen from '$lib/reusable_components/Loading_screen.svelte'
    import ScrollUpButton from '$lib/reusable_components/ScrollUp_button.svelte'
    import { saveScrollY } from '$lib/saveScrollY'
    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'

    import Contact_TitleDecor from '$lib/svg_files/Contact/Contact_TitleDecor.svg'
    import Contact_BackgroundDecor from '$lib/svg_files/Contact/Contact_BackgroundDecor.svg'
    import Contact_BackgroundDecor_Mobile from '$lib/svg_files/Contact/Contact_BackgroundDecor_Mobile.svg'
    import Contact_BackgroundDecor_Mobile_Small from '$lib/svg_files/Contact/Contact_BackgroundDecor_Mobile_Small.svg'
    import Instagram_Icon from '$lib/svg_files/Contact/Contact_Insta_Icon.svg'
    import Telegram_Icon from '$lib/svg_files/Contact/Contact_Telegram_Icon.svg'
    import Contact_ArrowForLinks from '$lib/svg_files/Contact/Contact_ArrowForLinks.svg'
    import Global_arrowDropdownMenu from '$lib/svg_files/GlobalSVGs/Global_arrowDropdownMenu.svg'
    import submitButtonArrow from '$lib/svg_files/GlobalSVGs/Global_arrowBack.svg'

    import { onMount } from "svelte";
    import { fade, fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    
    let pageLoaded = false;
    onMount(() => {
        const oldScrollY = sessionStorage.getItem("stored_scrollY")
        if (oldScrollY != null) {
            svelte_main_element.scrollTo({ top: oldScrollY, behavior: 'auto' })
        }
        pageLoaded = true;
    });
    beforeNavigate(({to, from}) => {
        pageLoaded = false;
        if ( from?.url.pathname == "/contact" && to?.url.pathname == undefined ) {
            saveScrollY.updateScrollY(svelte_main_element.scrollTop)
        } else {
            saveScrollY.updateScrollY(0)
        }
    });
    afterNavigate(() => {
        pageLoaded = true;
    });

    let numberOfRows = 1
    $: innerWidth = 0

    if (innerWidth < 600){
        numberOfRows = 2
    }

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
    
    let optionMenuShow = false;
    let border_radius = "inherit"
    let arrow_rotation = "1"

    function optionMenuShowToggle() {
        if (!optionMenuShow) {
            border_radius = "border-radius: max(1.9rem, 2.1vw) max(1.9rem, 2.1vw) 0 0;"
            arrow_rotation = "-1"
            optionMenuShow = true
        } else{
            border_radius = "inherit"
            arrow_rotation = "1"
            optionMenuShow = false
        }
    }
    

    let optionText = ""
    const typeOfWorkList = ["Web design", "Logo design", "Poster design", "Visual identity", "Product design"]

    function optionClicked() {
        const options = document.querySelectorAll(".tow_option")

        options.forEach( (option, index) => {
            option.addEventListener("click", (e) => {
                optionText = typeOfWorkList[index]
            })
        });
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<main class="svelte_main" on:scroll={updateY} bind:this={svelte_main_element}>
    {#if !pageLoaded}
        <LoadingScreen />
    {/if}

    {#if y > (innerHeight / 1.1) && oldY > y}
    <ScrollUpButton scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })}/>
    {/if}

    <div class="default_container cyan">
        <Header title_Decor_ID = "contact" />
        <div class="content_container title_page">
            {#if pageLoaded}
                <div class="title_page_name" transition:fade={{ delay: 200, duration: 400, easing: sineInOut}}>
                    <div class="title_name darkgrayText">Contact</div>
                    <img id="Contact_TitleDecor" src={Contact_TitleDecor} alt="Contact_TitleDecor">
                </div>
            {/if}
            <Navbar firstLink="Art's page" secondLink="About me" thirdLink="Portfolio" 
                    linkAddress1="" linkAddress2="about_me" linkAddress3="portfolio"/>
        </div>
    </div>
    <div class="default_container">
        {#if innerWidth > 1000}
            <img id="Contact_BackgroundDecor" src={Contact_BackgroundDecor} alt="Contact_BackgroundDecor">
        {:else if innerWidth < 600}
            <img id="Contact_BackgroundDecor" src={Contact_BackgroundDecor_Mobile_Small} alt="Contact_BackgroundDecor_Mobile_Small">
        {:else}
            <img id="Contact_BackgroundDecor" src={Contact_BackgroundDecor_Mobile} alt="Contact_BackgroundDecor_Mobile">
        {/if}
        <div class="content_container contact_page">
            <p class="contact_title darkgrayText">Contact me</p>
            <div class="contact_form_grid">
                <input type="text" class="form_item itemName" placeholder="Your name:">
                <div tabindex="0" role="option" aria-selected="false" class="form_item itemtypeOfWork" style={border_radius} on:keypress={optionMenuShowToggle} on:click={optionMenuShowToggle}>
                    {#if optionText == ""}
                        Type of work
                    {:else}
                        {optionText}
                    {/if}
                    
                    <img class="Global_arrowDropdownMenu" src={Global_arrowDropdownMenu} alt="Global_arrowDropdownMenu" style="scale: {arrow_rotation};"> 
                    {#if optionMenuShow}
                        <div class="typeOfWork_optionMenu" in:fly={{ delay: 0, duration: 200, easing: sineInOut, y: '-25'}} out:fade={{ delay: 0, duration: 200, easing: sineInOut}} use:optionClicked>
                            <div class="tow_option">Web design</div>
                            <div class="tow_option">Logo design</div>
                            <div class="tow_option">Poster design</div>
                            <div class="tow_option">Visual identity</div>
                            <div class="tow_option">Product design</div>
                        </div>
                    {/if}
                </div>
                <!-- <select name="Type of work" class="form_item itemtypeOfWork">
                    <option value="0">Type of work</option>
                    <option value="web_design">Web design</option>
                    <option value="logo_design">Logo design</option>
                    <option value="poster_design">Poster design</option>
                    <option value="visual_identity">Visual identity</option>
                </select> -->
                <input type="text" class="form_item itemEmail" placeholder="Your email:">
                <textarea rows={numberOfRows} class="form_item itemUserText" placeholder="What could I do for you?"></textarea>
                <button type="submit" class="submitButton"><img class="submitButtonArrow" src={submitButtonArrow} alt="submitButtonArrow"></button>
            </div>
            <div class="links_bottom_part">
                <div class="links">
                    <a href="https://web.telegram.org/" class="link lightgrayText"> <img class="Telegram_Icon" src={Telegram_Icon} alt="Telegram_Icon"> 
                        <img class="Contact_ArrowForLinks" src={Contact_ArrowForLinks} alt="Contact_ArrowForLinks">
                    </a>
                    <a href="https://web.telegram.org/" class="link lightgrayText"> <img class="Instagram_Icon" src={Instagram_Icon} alt="Instagram_Icon"> 
                        <img class="Contact_ArrowForLinks" src={Contact_ArrowForLinks} alt="Contact_ArrowForLinks">
                    </a>
                </div>
                <a target="_blank" class="emailAdress_Text" href="mailto:artemdamin@gmail.com">artemdamin@gmail.com</a>
            </div>
        </div>
    </div>
    <Footer firstLink="Art's page" secondLink="About me" thirdLink="Portfolio" 
    linkAddress1="" linkAddress2="about_me" linkAddress3="portfolio"
    titleName = "Contact" footer_Decor_ID = "contact"/>
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
    @media (width < 800px){
        /* main.svelte_main{
            scroll-snap-type: block mandatory;
        } */
        main.svelte_main::-webkit-scrollbar {
            display: none;
        }
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
        position: relative;
        z-index: 0;
        scroll-snap-stop: always;
        scroll-snap-align: start;
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
        font-size: max(15vw, 7rem);
        font-family: 'Brolimo', system-ui, sans-serif;
        z-index: 999;
    }

    @media (width < 942px){
        /* .content_container.title_page{
            justify-content: center;
            gap: 15vh;
        } */
        #Contact_TitleDecor{
            width: max(55%, 18rem);
            translate: 15% 10%;
        }
        .title_name{
            font-size: max(18vw, 7.5rem);
        }
    }
    @media (width < 500px){
        .content_container.title_page{
            justify-content: space-evenly;
            gap: 8.5vh;
        }
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
    @media (width < 500px) and (height < 750px){
        .content_container.title_page{
            justify-content: space-evenly;
            gap: 2rem;
        }
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
    #Contact_BackgroundDecor{
        width: 100%;
        position: absolute;
        z-index: -1;
        translate: 0% 15%;
    }
    .contact_title{
        font-family: 'Brolimo', system-ui, sans-serif;
        font-size: max(12.5vw, 7.5rem);
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
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        letter-spacing: max(0.05vw, 0.07rem);
        font-size: max(1vw, 0.9rem);
        padding: max(1.25vw, 1.1rem) max(2vw, 1.75rem);
        border-radius: max(1.9rem, 2.1vw);
        border: max(4px, 0.250vw) var(--cyan_outline_bright) solid;
        background-color: var(--background_color_lightYellow);
    }
    .form_item:focus-visible{
        outline: max(0.2rem, 0.2vw) var(--background_color_lightCyan) solid;
    }
    .form_item.itemUserText{
        grid-area: 2 / 1 / 4 / 4;
        line-height: max(1.5rem, 2vh);
        resize: none;
    }
    .form_item.itemUserText::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    .form_item.itemUserText::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .form_item.itemUserText::-webkit-scrollbar-thumb {
        background-color: var(--background_color_lightCyanSaturated);
        border-radius: 5rem;
    }

    .form_item.itemtypeOfWork{
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        
        color: var(--text_color_gray90);
        transition: border-radius 0.15s ease-in-out;
    }

    .Global_arrowDropdownMenu{
        position: absolute;
        height: 50%;
        right: 6%;
        transition: scale 0.25s ease;
    }
    .typeOfWork_optionMenu{
        box-sizing: border-box;
        position: absolute;
        inset: calc(100% + max(4px, 0.250vw)) 0 auto 0;
        width: 100%;
        background-color: var(--background_color_lightYellow);
        color: var(--text_color_gray90);
        border-radius: 0 0 max(1.5rem, 2vw) max(1.5rem, 2vw);
        outline: max(4px, 0.250vw) var(--cyan_outline_bright) solid;

        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: max(3.75vw, 6vh);
        align-items: center;
        max-height: 350%;
        overflow-y: scroll;
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
    }
    .tow_option:nth-child(2n){
        background-color: var(--background_color_lightCyan_lowerOpacity025);
    }
    .tow_option:hover{
        background-color: var(--cyan_outline_bright);
        color: var(--text_color_gray5);
    }

    .submitButton{
        position: absolute;
        width: max(4vw, 3.5rem);
        aspect-ratio: 1;
        border-radius: 50%;
        inset: auto min(0.9rem, 2.5vw) min(0.9rem, 2.5vw) auto;

        background: radial-gradient(var(--background_color_lightCyanSaturated) 25%, var(--background_color_lightCyan) 100%);
        /* border: max(4px, 0.250vw) var(--cyan_outline) solid; */
        border: none;
        cursor: pointer;
    }
    .submitButtonArrow{
        height: 45%;
        aspect-ratio: 1;
        rotate: 180deg;
        
    }
    .submitButton:hover > .submitButtonArrow{
        animation: arrowIcon_animation .5s ease-in-out;
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
        background-image: linear-gradient(hsl(169, 14%, 85%) 0%, hsl(169, 14%, 85%) 65%, var(--background_color_lightCyan) 100%);
        background-size: 0% 100%;
        background-position: left bottom;
        background-repeat: no-repeat;
        transition: background-size 0.2s ease-out;
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
        letter-spacing: 0.07rem;
        background-color: var(--background_color_lightCyanSaturated);
        box-shadow: inset -0.2rem 0.2rem max(1rem, 1vw) max(0.75rem, 0.75vw) var(--background_color_lightCyan);
        border-radius: 50rem;
        width: 100%;
        padding: max(1.25vw, 1.15rem) max(2vw, 1.75rem);   

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: max(1.5rem, 1.75vw);
        transition: translate 0.15s ease-out, box-shadow 0.2s ease-in-out;
        position: relative;
    }
    .links > a:hover{
        translate: 3% -9%;
    }
    .links > a:focus-visible{
        translate: 3% -9%;
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
        transition: rotate 0.15s ease-out;
    }
    .Telegram_Icon{
        width: max(1.5vw, 1.25rem);
    }
    .Instagram_Icon{
        width: max(1.5vw, 1.25rem);
    }
    .links > a:is(:hover) > .Contact_ArrowForLinks{
        rotate: 45deg;
    }
    /* ---------------------------------------------------------------------------------------------------------------------- */

    @media (width < 1100px) {
        .contact_form_grid{
            grid-template-columns: 3fr 2.5fr;
            grid-template-rows: repeat(3, 1fr);
            gap: 2.5vw 1vw;
        }
        .form_item.itemUserText{
            grid-area: 3 / 1 / 5 / 3;
        }
        .form_item.itemEmail{
            grid-area: 2 / 1 / 3 / 3;
        } 
        .links > a{
            font-size: var(--text_size_extra_small);
        }
        .emailAdress_Text{
            font-size: var(--text_size_extra_small);
            font-size: max(1.15rem, 1.25vw);
        }
    }  
    @media (width < 950px) {
        .contact_title{
            font-size: max(14vw, 5rem);
            align-self: center;
        }
    }
    @media (width < 815px) {
        .contact_form_grid{
            grid-template-columns: 1fr;
            grid-template-rows: repeat(4, 1fr);
            grid-auto-rows: 1.5fr;
            gap: 2.5vw 1vw;
        }
        #Contact_BackgroundDecor{
            translate: 0% 0%;
        }
        
        .form_item{
            font-size: max(1vw, 0.85rem);
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
    }
    @media (width < 650px) {
        .content_container.contact_page{
            gap: 3vh;
        }
        .contact_title{
            font-size: 23vw;
            text-align: center;
            text-wrap: wrap;
            line-height: max(8vh, 17vw);
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
            gap: 5vw;
            padding: max(1.25vw, 1.15rem) max(1.5vw, 1.5rem); 
        }
        .Contact_ArrowForLinks{
            width: max(1.25vw, 1rem);
        }
        .emailAdress_Text{
            margin: 0;
        }
    }
    @media (height < 800px) {
        .contact_form_grid{
            grid-auto-rows: 0.8fr;
        }
    }
/* --------------------------------------------------------------- */
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