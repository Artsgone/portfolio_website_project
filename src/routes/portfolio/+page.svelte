<script>
    import Navbar from '$lib/reusable_components/+navbar.svelte'
    import Header from '$lib/reusable_components/+header.svelte'
    import Footer from '$lib/reusable_components/+footer.svelte'
    import LoadingScreen from '$lib/reusable_components/+loading_screen.svelte'
    import ScrollUpButton from '$lib/reusable_components/+scrollUp_button.svelte'

    import WorkPresent from '$lib/reusable_components/+portfolio_work_item.svelte'
    import WorkPresentAlt from '$lib/reusable_components/+portfolio_work_item_alt.svelte'
    import WorkItemDetailed from '$lib/reusable_components/+portfolio_item_detailed.svelte'
    import Portfolio_TitleDecor from '$lib/svg_files/Portfolio/Portfolio_TitleDecor.svg'

    // image to left
    import Portfolio_workPreviewElement_ART from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_ART.svg'
    import Portfolio_workPreviewElement_Omic from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Omic.svg'
    import Portfolio_workPreviewElement_Roe from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Roe.svg'
    import Portfolio_workPreviewElement_Architect from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Architect.svg'
    import Portfolio_workPreviewElement_Artsgone from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Artsgone.svg'
    import Portfolio_workPreviewElement_LXY from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_LXY.svg'
    import Portfolio_workPreviewElement_Lexi_alternate from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi_alternate.svg'
    import Portfolio_workPreviewElement_Museum from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Museum.svg'
    import Portfolio_workPreviewElement_Nameless from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Nameless.svg'
    import Portfolio_workPreviewElement_Bena from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Bena.svg'
    import New_LOGO_AR from '$lib/svg_files/New_LOGO_AR.svg'
    // image to right
    import Portfolio_workPreviewElement_Logo_Ww from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Logo_Ww.svg'
    import Portfolio_workPreviewElement_Ww_additional from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Ww_additional.svg'
    import Portfolio_workPreviewElement_Logo_Tt from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Logo_Tt.svg'
    import Portfolio_workPreviewElement_Lexi from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi.svg'
    import Portfolio_workPreviewElement_Lexi_V2 from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi_V2.svg'
    import Portfolio_workPreviewElement_LXY_alt from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_LXY_alt.svg'
    import Portfolio_workPreviewElement_Anata from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Anata.svg'
    import Portfolio_workPreviewElement_MrGummy from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_MrGummy.svg'
    import Portfolio_workPreviewElement_Dd_NEW from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Dd_NEW.svg'

    import Portfolio_WorksPreviewDecor from '$lib/svg_files/Portfolio/Portfolio_WorksPreviewDecor.svg'
    import Global_closeIcon from '$lib/svg_files/GlobalSVGs/Global_closeIcon.svg'

    import { onMount } from "svelte";
    import { fade, slide, fly } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    
    let works_preview_grid;
    let pageLoaded = false;
    onMount(() => {
        pageLoaded = true;
    });
    beforeNavigate(() => {
        pageLoaded = false;
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
        if(newY.length > 50) {
            newY.shift();
        }
        newY=newY;
    }
    
    let workPresent_Visibility = 'hidden';
    let workPresent_Display = 'none';
    let close_button_scale = '0.85'

    function openInLargeList(){
        workPresent_Visibility = 'visible';
        workPresent_Display = "flex";
        close_button_scale = '1';
    }
    function closeInLargeList(){
        workPresent_Visibility = 'hidden';
        workPresent_Display = "none";
        close_button_scale = '0.85';
    }

</script>

<svelte:window bind:innerHeight />

<main class="svelte_main" on:scroll={updateY} bind:this={svelte_main_element}>
    {#if !pageLoaded}
        <LoadingScreen />
    {/if}

    {#if y > (innerHeight / 1.75) && (oldY - 40) > y}
        <ScrollUpButton scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })}/>
    {/if}

    <div class="default_container cyan">
        <Header title_Decor_ID = "portfolio"/>
        <div class="content_container title_page">
            {#if pageLoaded}
                <div class="title_page_name" transition:fade={{ delay: 200, duration: 400, easing: sineInOut}}>
                    <div class="title_name darkgrayText">Portfolio</div>
                    <img id="Portfolio_TitleDecor" src={Portfolio_TitleDecor} alt="Portfolio_TitleDecor">
                </div>
            {/if}
            <Navbar firstLink="Art's page" secondLink="About me" thirdLink="Contact" 
                    linkAddress1="" linkAddress2="about_me" linkAddress3="contact"/>
        </div>
    </div>
    <div class="default_container endless">
        <div class="content_container work_summary_page">
            <p class="text_corner_previewOfWorks tcp1">portfolio <br> - logos</p>
            <p class="text_corner_previewOfWorks tcp2">portfolio <br> - logos</p>
            <div class="works_preview_grid" bind:this={works_preview_grid}>

                <a data-sveltekit-preload-data="viewport" href="/portfolio" role="button" tabindex="0" class="work_element_preview_box wep_box1 top rounded" on:click={openInLargeList} on:keypress={openInLargeList}>
                    <img src={Portfolio_workPreviewElement_ART} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </a>
                    <!-- blank -->
                        <div class="work_element_preview_box blank mobileBlank"></div>
                    <!-- blank -->
                <div role="button" tabindex="0" class="work_element_preview_box wep_box2 top mobile_rounded" on:click={openInLargeList} on:keypress={openInLargeList}>
                    <img src={Portfolio_workPreviewElement_LXY} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div role="button" tabindex="0" class="work_element_preview_box wep_box3 top rounded mobile_left" >
                    <img src={Portfolio_workPreviewElement_Architect} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                    <!-- blank -->
                        <div class="work_element_preview_box blank"></div>
                    <!-- blank -->
                <div class="work_element_preview_box blank">
                    <img src={Portfolio_WorksPreviewDecor} alt="MainPage_MyPhotosDecorElement" class="work_element_preview">
                </div>
                <div role="button" tabindex="0" class="work_element_preview_box wep_box4 bottom rounded" >
                    <img src={Portfolio_workPreviewElement_Artsgone} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div role="button" tabindex="0" class="work_element_preview_box wep_box5 bottom mobile_rounded mobile_left">
                    <img src={Portfolio_workPreviewElement_Omic} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div role="button" tabindex="0" class="work_element_preview_box wep_box6 bottom rounded mobile_rounded" >
                    <img src={Portfolio_workPreviewElement_Lexi_alternate} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>

                    <!-- next couple -->

                <div role="button" tabindex="0" class="work_element_preview_box wep_box7 top rounded mobile_left" >
                    <img src={Portfolio_workPreviewElement_Anata} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div role="button" tabindex="0" class="work_element_preview_box wep_box8 top" >
                    <img src={Portfolio_workPreviewElement_Bena} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div role="button" tabindex="0" class="work_element_preview_box wep_box9 top rounded mobile_left mobile_rounded " >
                    <img src={Portfolio_workPreviewElement_MrGummy} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div class="work_element_preview_box blank">
                     <img src={Portfolio_WorksPreviewDecor} alt="MainPage_MyPhotosDecorElement" class="work_element_preview">
                </div>
                    <!-- blank -->
                        <div class="work_element_preview_box blank"></div>
                    <!-- blank -->
                <div role="button" tabindex="0" class="work_element_preview_box wep_box10 bottom rounded mobile_rounded" >
                    <img src={Portfolio_workPreviewElement_LXY_alt} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div role="button" tabindex="0" class="work_element_preview_box wep_box11 bottom mobile_left" >
                    <img src={Portfolio_workPreviewElement_Museum} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                    <!-- blank -->
                        <div class="work_element_preview_box blank mobileBlank"></div>
                    <!-- blank -->
                <div role="button" tabindex="0" class="work_element_preview_box wep_box12 bottom mobile_left rounded mobile_rounded" >
                    <img src={Portfolio_workPreviewElement_Nameless} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>

            </div>
        </div>
    </div>
    
    {#if workPresent_Visibility == 'visible'}
        <button transition:fade={{ delay: 0, duration: 400, easing: sineInOut}} class="close_button" on:click={closeInLargeList} style="scale: {close_button_scale};"><img src={Global_closeIcon} class="Global_closeIcon" alt="Global_closeIcon"> </button>
    {/if}

    {#if workPresent_Visibility == 'visible'}
        <div class="workPresent_wrapper" in:fly={{ y: -200 }} out:fade>
            <WorkPresent workElementImage={Portfolio_workPreviewElement_ART} workElementTitle="ART" workElementText="" workElementVisibility={workPresent_Visibility}> &nbsp&nbsp&nbsp&nbsp&nbsp The logo features a sleek, minimalist design with clean lines and simple shapes.
                <br><br> &nbsp&nbsp&nbsp&nbsp&nbsp The museum's name is made in bold, uppercase letters, with the word ART emphasized in a contrasting color.  
                <br> &nbsp&nbsp&nbsp&nbsp&nbsp It is made up of overlapping shapes in a range of vibrant colors, suggesting the museum's commitment to showcasing a diverse array of artwork and artists. The symbol also evokes a sense of movement and fluidity, hinting at the dynamic and ever-evolving nature of contemporary art.  
                <br><br> &nbsp&nbsp&nbsp&nbsp&nbsp Overall, the logo conveys a sense of modernity, creativity, and inclusivity, positioning the museum as a cutting-edge institution that welcomes artists and audiences from all backgrounds.
            </WorkPresent>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Dd_NEW} workElementTitle="Dajy" workElementText="Some logo that has no use yet It is made up of overlapping shapes in a range of vibrant colors, suggesting the museum's commitment to showcasing a diverse array of artwork and artists.
                 It is made up of overlapping shapes in a range of vibrant colors, suggesting the museum's commitment to showcasing a diverse array of artwork and artists.
                  It is made up of overlapping shapes in a range of vibrant colors, suggesting the museum's commitment to showcasing a diverse array of artwork and artists.
                   It is made up of overlapping shapes in a range of vibrant colors, suggesting the museum's commitment to showcasing a diverse array of artwork and artists.
                    It is made up of overlapping shapes in a range of vibrant colors, suggesting the museum's commitment to showcasing a diverse array of artwork and artists." workElementVisibility={workPresent_Visibility} />
                
            <WorkPresent workElementImage={Portfolio_workPreviewElement_Roe} workElementTitle="Roe" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Logo_Ww} workElementTitle="Wappa" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

            <WorkPresent workElementImage={Portfolio_workPreviewElement_Architect} workElementTitle="Architect" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Logo_Tt} workElementTitle="Toreno" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

            <WorkPresent workElementImage={Portfolio_workPreviewElement_Artsgone} workElementTitle="Artsgone" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Lexi} workElementTitle="Lexi" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

            <WorkPresent workElementImage={Portfolio_workPreviewElement_LXY} workElementTitle="LXY" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Lexi_V2} workElementTitle="Lanobi" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

            <WorkPresent workElementImage={Portfolio_workPreviewElement_Lexi_alternate} workElementTitle="Lexi - alt" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_LXY_alt} workElementTitle="LXY - alt" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

            <WorkPresent workElementImage={Portfolio_workPreviewElement_Museum} workElementTitle="Antic Museum" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Anata} workElementTitle="Anata" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

            <WorkPresent workElementImage={New_LOGO_AR} workElementTitle="A/R" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Omic} workElementTitle="Omic" workElementText="" workElementVisibility={workPresent_Visibility}> &nbsp&nbsp&nbsp&nbsp&nbsp The logo for the imaginary brand Omic is designed in a modern and minimalist style. The main element of the logo is a large orange letter "O." It is bright and bold, catching the eye and symbolizing energy and creativity. <br> &nbsp&nbsp&nbsp&nbsp&nbsp Below the letter "O" the word "Omic" is written in a clean black font. This contrast between the vibrant orange letter and the black text creates a dynamic and memorable image that is easily recognizable and associated with the brand. The logo is ideal for a company looking to stand out and make a lasting impression on its audience. </WorkPresentAlt>

            <WorkPresent workElementImage={Portfolio_workPreviewElement_Nameless} workElementTitle="Nameless sadas" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_MrGummy} workElementTitle="MR. Gummy" workElementText="This piece of art is a piece of ... art" workElementVisibility={workPresent_Visibility}/>

            <WorkPresent workElementImage={Portfolio_workPreviewElement_Bena} workElementTitle="Bena" workElementText="" workElementVisibility={workPresent_Visibility}> &nbsp&nbsp&nbsp&nbsp&nbsp The "Bena" logo features a whimsical and friendly design, capturing the essence of a specialty shop for dogs and cats. It blends playful elements with a touch of elegance, reflecting the variety of high-quality clothing, toys, and accessories offered. The logo's warm and inviting colors emphasize the joy and care Bena brings to pet owners and their furry companions. </WorkPresent>

                <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Ww_additional} workElementTitle="W(in) logo" workElementText="This piece of art is a piece of W" workElementVisibility={workPresent_Visibility}/>
        </div>
    {/if}
    
    
    
        <Footer firstLink="Art's page" secondLink="About me" thirdLink="Contact" 
    linkAddress1="" linkAddress2="about_me" linkAddress3="contact"
    titleName = "Portfolio" footer_Decor_ID = "portfolio" />
</main>

<style>
    :global(body){
        margin: 0;
        padding: 0;
        background-color: var(--background_color_lightCyan);
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
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }
    .default_container{
        width: 100%;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightYellow);
        border-bottom: max(6px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
        position: relative;
        z-index: 0;
        scroll-snap-align: start;
        scroll-snap-stop: always;
    }
    .endless{
        height: auto;
    }
    .content_container{
        width: 92.5%;
        height: 87.5%;
    }
    .darkgrayText{
        color: var(--text_color_gray90);
    }
    .default_container.cyan{
        height: 100svh;
        background: radial-gradient(var(--background_color_lightCyan) 55%, var(--background_color_lightCyanSaturated) 125%);
        box-shadow: none;
        border-bottom: none;
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
    #Portfolio_TitleDecor{
        width: var(--element_size_title_decor_portfolio);
        position: absolute;
        translate: 0 2%;
    }
    .title_name{
        font-size: max(15vw, 6.25rem);
        font-family: 'Brolimo';
        z-index: 999;
    }

    @media (width < 942px){
        #Portfolio_TitleDecor{
            width: 65%;
        }
        .title_name{
            font-size: max(18vw, 6.5rem);
        }
    }
    @media (width < 500px){
        .content_container.title_page{
            justify-content: center;
            gap: 15vh;
        }
        #Portfolio_TitleDecor{
            width: 95%;
            translate: 0% 7%;
        }
        .title_name{
            visibility: hidden;
            position: relative;
            word-break: break-all;
            text-align: center;
            font-size: 30vw;
            line-height: 25vw;
        }
        .title_name::after{
            content: "Port-folio";
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

    /* PREVIEW OF WORKS */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .default_container.endless{
        padding-block: max(10vh, 5rem);
    }
    .content_container.work_summary_page{
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        position: relative;
    }
    .text_corner_previewOfWorks{
        position: absolute;
        font-family: 'Subjectivity_Regular';
        font-size: var(--text_size_medium_small);
        letter-spacing: -0.5px;
    }
    .tcp1{
        top: 0;
        right: 0;
        text-align: end;
    }
    .tcp2{
        bottom: 0;
        left: 0;
    }
    .works_preview_grid{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr;
        grid-auto-rows: 1fr;
        gap: max(0.75rem, 0.75vw) max(1rem, 1vw);
    }
    .work_element_preview_box{
        aspect-ratio: 1;
        border: max(5px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        background-color: var(--background_color_lightYellow);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        
    }
    .work_element_preview_box:not(.blank){
        cursor: pointer;
    }
    .work_element_preview_box::after{
        content: '- view more -';
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: max(1.75vw, 1.25rem);
        font-family: 'Brolimo';
        color: white;
        background: radial-gradient(var(--background_color_alternativeLightYellow_Darker) 25%, hsla(35, 39%, 88%, 0.35) 95%);
        backdrop-filter: blur(1rem) opacity(0.9);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.75s ease, visibility 0s ease 0.75s, scale 0.75s ease, filter 0.75s ease;
        scale: 0.95;
        filter: blur(2rem);
    }
    .work_element_preview_box.rounded::after{border-radius: 32.5%;}
    /* .work_element_preview_box:not(.rounded)::after{} */
    .work_element_preview_box:not(.blank):hover::after{
        opacity: 1;
        visibility: visible;
        scale: 1;
        filter: blur(0rem);
        transition: opacity 0.25s ease, visibility 0s ease 0s, scale 0.25s ease, filter 0.1s ease;
    }
    .work_element_preview_box:focus-visible{
        outline: max(0.25rem, 0.25vw) var(--background_color_lightCyan) solid;
    }
    /* .work_element_preview_box.show{
        animation: intersected 2s ease-out forwards;
        visibility: visible;
    } */
    .work_element_preview{
        width: 80%;
        max-height: 80%;
    }

    .work_element_preview_box.rounded > .work_element_preview{
        width: 75%;
        max-height: 65%;
    }

    .works_preview_grid > .blank{
        border: none;
        background-color: transparent;
    }
    .mobileBlank{
        display: none;
    }

    .works_preview_grid > :not(.rounded, .blank)::before, .rounded::before{
        content: '';
        box-sizing: content-box;
        position: absolute;
        width: 100%;
        height: 112%;
        background-color: var(--background_color_alternativeLightYellow);
        border: max(5px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        z-index: -1;
    }
    .works_preview_grid > :not(.rounded)::before{
        content: '';
    }
    .rounded, .rounded::before{
        border-radius: 35%;
    }

    .close_button{
        position: fixed;
        cursor: pointer;
        width: max(3.3rem, 3vw);
        aspect-ratio: 1;
        z-index: 9999;
        top: min(5%, 1rem + 2vw);
        right: min(7.5%, 3rem + 2vw);
        outline: max(0.25rem, 0.25vw) var(--background_color_lightCyan) solid;
        border: none;
        border-radius: 30%;
        overflow: clip;
        backdrop-filter: blur(5px) invert(25%);
        background-color: var(--background_color_lightCyan_lowerOpacity);
        box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated);

        transition: scale 0.15s ease-out, box-shadow 0.2s ease-in-out;
    }
    
    .Global_closeIcon{
        width: 60%;
        aspect-ratio: 1;
        filter: drop-shadow(0 0 max(.4rem, .4vw) var(--background_color_darkCyanSaturated));
    }
    /* .close_button:hover > .Global_closeIcon{
        scale: 1.065;
    } */
    .close_button:hover > .Global_closeIcon{
        animation: arrowIcon_animation .5s ease-in-out;
    }
    .close_button:hover{
        animation: scrollUp_button_animation .5s ease-in-out;
    }

    @keyframes arrowIcon_animation{
        0%, 100% {
            rotate: 0deg;
            scale: 1;
        }
        25%{
            rotate: 5deg;
            scale: 0.85;
        }
        65%{
            rotate: -10deg;
            scale: 0.85;
        }
    }
    @keyframes scrollUp_button_animation{
        0%, 100% {
            box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated);
        }
        50%{
            box-shadow: 0 0 max(1.5rem, 1.5vw) max(0.15rem, 0.15vw) var(--background_color_lightCyanSaturated);
        }
    }
    .workPresent_wrapper{
        display: flex;
        flex-direction: column;
        position: fixed;
        overflow-y: scroll;
        scroll-snap-type: block mandatory;
        z-index: 9990;
        inset: 0;
    }
    .workPresent_wrapper::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    .workPresent_wrapper::-webkit-scrollbar-track {
        background-color: var(--background_color_lightCyan);
    }
    .workPresent_wrapper::-webkit-scrollbar-thumb {
        background-color: var(--background_color_alternativeLightYellow);
        border-radius: 5rem;
    }

    @media (width < 900px) {
        .works_preview_grid{
            grid-template-columns: repeat(2, 50%);
            grid-template-rows: repeat(7, 42.5vw);
            gap: max(1.5rem, 7.5vw) 0;
        }
        .works_preview_grid > .work_element_preview_box.blank:not(.mobileBlank){
            display: none;
        }
        .mobileBlank{
            display: block;
        }
        .work_element_preview_box{
            height: 100%;
            align-self: center;
        }
        .work_element_preview{
            width: 80%;
        }
        .work_element_preview_box::after{
            display: none;
        }
        .rounded, .rounded::before{
            border-radius: 0%;
        }
        .mobile_rounded, .mobile_rounded::before{
            border-radius: 25%;
        }
        .mobile_rounded::before{
            rotate: 90deg;
        }
    }
    @media (width < 475px) {
        .work_element_preview{
            width: 85%;
            max-height: 85%;
        }
    }

    /* General media ------------------------------------------------------------------------------------------------------------*/
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