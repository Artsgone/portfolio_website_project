<script>
    export let workElementTitle = "Title area: no data"
    export let workElementText = "Text area: not data"
    export let workElementImage = ''
    // export let workElementVisibility = 'hidden';
    import Global_tapIcon from '$lib/svg_files/GlobalSVGs/Global_tapIcon.svg'

    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';

    let imageHeight;

    $: innerWidth = 0;

    onMount(() => {;
        imageHeight = imageHeight;
        if ((work_description_container_height - description_box_height) < 0) {
        position = "start";
        } else {
            position = "center";
        }
    });

    $: work_presentation_page_height = 0;
    $: work_description_container_height = 0;
    $: description_box_height = 0;

    let position = "center";

    let fadeBar_DisplayTop = "none";
    let fadeBar_DisplayTopMobile = "none";

    let fadeBar_display = "block";
    let fadeBar_displayMobile = "block";

    let work_description_container;
    let work_presentation_page;
    let scrollYMobile = 0;
    let scrollY = 0;

    let enableScrollAllow = true;
    let enableScrollToggle = "clip"
    
    function scrollCounter(){
        scrollY = work_description_container.scrollTop;
        // console.log(scrollY + "scrolled")
    }
    function scrollCounterMobile(){
        scrollYMobile = work_presentation_page.scrollTop;
        // console.log(scrollYMobile + "scrolled")
    }
    function enableScroll(){
        if (enableScrollAllow && innerWidth <= 1000 && description_box_height > 300) {
            enableScrollToggle = "scroll"
            enableScrollAllow = false;
        } else {
            enableScrollToggle = "clip"
            enableScrollAllow = true;
            scrollYMobile = 0;
            work_presentation_page.scrollTo({ top: 0, behavior: 'auto' })
        }
    }

    $: if (scrollY < (work_description_container_height * 0.025)) {
        fadeBar_DisplayTop = "none";
    } else {
        fadeBar_DisplayTop = "block";
    }
    $: if (scrollYMobile < (work_presentation_page_height * 0.1)) {
        fadeBar_DisplayTopMobile = "none";
    } else {
        fadeBar_DisplayTopMobile = "block";
    }

    $: if ((work_description_container_height + scrollY) > (description_box_height)) {
        fadeBar_display = "none";
    } else {
        fadeBar_display = "block";
    }

    $: if ((description_box_height - scrollYMobile + 50) > (work_presentation_page_height - imageHeight)) {
        fadeBar_displayMobile = "block";
    } else {
        fadeBar_displayMobile = "none";
    }

</script>

<svelte:window bind:innerWidth />


    <!-- <main > -->
        <div class="workPresentation_container" transition:fade={{ delay: 0, duration: 500, easing: sineInOut}}>
            <div class="content_container work_presentation_page" tabindex="0" role="button" on:keydown={enableScroll} on:click={enableScroll} on:scroll={scrollCounterMobile} bind:this={work_presentation_page} bind:clientHeight={work_presentation_page_height} 
                style="overflow-y: {enableScrollToggle}; --fade_offsetMobile: {scrollYMobile}px; --displayFadeMobile: {fadeBar_displayMobile}; --displayFadeMobileTop: {fadeBar_DisplayTopMobile};">
                
                <div on:scroll={scrollCounter}  class="work_description_container" bind:this={work_description_container} bind:clientHeight={work_description_container_height}
                    style="align-items: {position}; --fade_offset: {scrollY}px; --displayFade: {fadeBar_display}; --displayFadeTop: {fadeBar_DisplayTop};">
                    
                    <div class="description_box" bind:clientHeight={description_box_height}>
                        <p class="work_title">"{workElementTitle}"</p>
                        <p class="work_description">{workElementText} <slot/> </p>
                    </div>
                </div>
                    <div bind:offsetHeight={imageHeight} class="workPreviewElement_Box">
                        <img class="Portfolio_workPreviewElement" src={workElementImage} alt="Portfolio_workPreviewElement">
                    </div>
                    {#if enableScrollAllow && description_box_height > 300}
                        <div transition:fade={{ delay: 0, duration: 200, easing: sineInOut}} class="tapForMoreInfo_button" style="--imageHeight: {imageHeight}px;"> <img class="Global_tapIcon" src={Global_tapIcon} alt="Global_tapIcon">- Tap for description -</div>
                    {/if}
            </div>
        </div>
    <!-- </main> -->


<style>
    *{
        margin: 0;
        padding: 0;
    }
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }
    .workPresentation_container{
        width: 100%;
        height: 100%;
        z-index: 9991;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightYellow);
        border-bottom: max(6px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
    }
    .content_container.work_presentation_page{
        display: grid;
        grid-template-columns: 1.5fr 2fr;
        /* grid-template-rows: 1fr 2.5rem; */
        grid-template-rows: 1fr;
        align-items: center;
        justify-items: center;
        gap: 0rem max(2.5rem, 4vw);
        width: 95%;
        height: 85%;
    }
    
    .workPreviewElement_Box{
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Portfolio_workPreviewElement{
        width: max(20rem, 80%);
        max-height: 80vh;
        filter: drop-shadow(0 0 max(1rem, 1vw) var(--background_color_alternativeLightYellow));
    }
    
    .work_description_container{
        width: 100%;
        height: 75%;
        display: flex;

        overflow-x: clip;
        overflow-y: auto;
        direction: rtl;
        overscroll-behavior: none;

        position: relative;
        isolation: isolate;
    }
    .work_description_container::before{
        content: "↓";
        position: absolute;
        display: var(--displayFade);
        width: 100%;
        height: 10%;
        bottom: calc((var(--fade_offset) * -1) - 5px);
        background: linear-gradient(transparent, var(--background_color_lightYellow) 90%);
        mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 75%);
        backdrop-filter: blur(5px);
        z-index: 500;

        text-align: end;
        color: var(--background_color_alternativeLightYellow_Darker);
        font-family: "Neutral_Bold", system-ui, sans-serif;
        font-size: max(2.5rem, 2.5vw);
    }
    .work_description_container::after{
        content: "";
        position: absolute;
        display: var(--displayFadeTop);
        width: 100%;
        height: 20%;
        translate: 0 -50%;
        top: calc(var(--fade_offset));
        background: linear-gradient(transparent, var(--background_color_lightYellow) 30%, var(--background_color_lightYellow) 50%, transparent);
        mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 15%, var(--background_color_lightYellow) 65%, transparent);
        backdrop-filter: blur(5px);
        z-index: 500;
    }
    .tapForMoreInfo_button{
        display: none;
    }

    .work_description_container::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    .work_description_container::-webkit-scrollbar-track {
        background-color: var(--background_color_lightYellow);
    }
    .work_description_container::-webkit-scrollbar-thumb {
        background-color: var(--background_color_alternativeLightYellow);
        border-radius: 5rem;
    }

    .description_box{
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: max(1.5vw, 1.5rem) 0;
        position: relative;
    }
    .work_title{
        font-family: 'Brolimo', system-ui, sans-serif;
        font-size: var(--text_size_big);
        line-height: var(--text_line_height_big);
        /* text-align: end; */
        direction: ltr;
        text-wrap: balance;
    }
    .work_description{
        font-family: 'Subjectivity_Regular', system-ui, sans-serif;
        font-size: var(--text_size_small);
        line-height: var(--text_line_small);
        letter-spacing: -0.5px;
        text-wrap: pretty;
        /* text-align: end; */
        direction: ltr;
        hyphens: auto;
    }
    .description_box::before{
        content: "";
        position: absolute;
        background-color: var(--element_color_darkerCyan);
        width: max(1rem, 1.75vw);
        aspect-ratio: 1;
        border-radius: max(0.75rem, 0.75vw);
        bottom: 0;
        left: 0;
        translate: 0 200%;
        z-index: 600;
    }

    @media (width < 1100px) {
        .work_description_container{
            padding-left: 2.5vw;
        }
        .description_box{
            width: 100%;
        }
    }
    @media (width < 1000px) {
        .content_container.work_presentation_page{
            grid-template-columns: 1fr;
            grid-template-rows: 1.4fr 1fr;
            gap: max(1rem + 2.5vh, 3.5vw) 0;
            overflow-x: clip;
            overflow-clip-margin: 1rem;

            position: relative;
            isolation: isolate;
        }
        .tapForMoreInfo_button{
            position: absolute;
            bottom: 0;
            width: 105%;
            translate: 0 2.5vh;
            height: calc(100% - var(--imageHeight) - 10vh);
            background: linear-gradient(180deg, transparent, var(--background_color_lightYellow_middlealternative));
            mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow_middlealternative) 25%);
            backdrop-filter: blur(5px);
            border-radius: max(1vw, 1rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1.25vh 0;
            z-index: 501;

            font-family: 'Subjectivity_Regular', system-ui, sans-serif;
            /* text-transform: uppercase; */
            font-size: max(1.5vw, 1.4rem);
            text-align: center;
        }
        .Global_tapIcon{
            width: min(25%, 4rem);
            aspect-ratio: 1;
        }
        .content_container.work_presentation_page::before{
            content: "↓";
            position: absolute;
            width: 100%;
            height: 8%;
            display: var(--displayFadeMobile);
            bottom: calc((var(--fade_offsetMobile) * -1) - 10px);
            background: linear-gradient(180deg, transparent, var(--background_color_lightYellow_middlealternative) 85%);
            mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow_middlealternative) 60%);
            backdrop-filter: blur(5px);
            z-index: 500;

            text-align: end;
            color: var(--text_color_gray90);
            font-family: "Neutral_Bold", system-ui, sans-serif;
            font-size: max(2rem, 2vh);
        }
        .content_container.work_presentation_page::after{
            content: "";
            position: absolute;
            display: var(--displayFadeMobileTop);
            width: 100%;
            height: 16%;
            translate: 0 -50%;
            top: calc(var(--fade_offsetMobile) - 5px);
            background: linear-gradient(transparent, var(--background_color_lightYellow_middlealternative) 15%, var(--background_color_lightYellow_middlealternative) 60%, transparent);
            mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow_middlealternative) 0%, var(--background_color_lightYellow_middlealternative) 75%, transparent);
            backdrop-filter: blur(5px);
            z-index: 500;
        }

        .workPreviewElement_Box{
            min-height: 45dvh;
        }
        .Portfolio_workPreviewElement{
            max-height: 40vh;
            width: max(25rem, 70%);
            order: 1;
        }

        .work_description_container{
            align-self: flex-start;
            overflow-y: visible;
            order: 2;
            padding-left: 0vw;
            height: fit-content;
            justify-content: center;
        }
        .description_box{
            width: max(25rem, 75%);
        }
        .work_description_container::before{ display: none;}
        .work_description_container::after{ display: none;}

        .description_box::before{
            translate: 0 300%;
            z-index: 600;
        }
    }
    @media (width < 500px) {
        .workPreviewElement_Box{
            min-height: 35dvh;
        }
        .Portfolio_workPreviewElement{
            width: 100%;
        }
        .description_box{
            width: 100%;
        }
    }

    @media (width < 1100px) {
        .content_container.work_presentation_page{
            width: 85%;
            height: 80%;
        }
    }     
    @media (width < 1100px) and (height < 690px){ 
        .content_container.work_presentation_page{
            width: 85%;
            height: 90%;
        }
    } 
</style>