<script>
    export let workElementTitle = "Title area: no data"
    export let workElementText = "Text area: not data"
    export let workElementImage = '';
    export let workElementVisibility = 'hidden';
    
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';

    let imageHeight;

    onMount(() => {;
        imageHeight = imageHeight;
    });

    $: work_presentation_page_height = 0;
    $: work_description_container_height = 0;
    $: description_box_height = 0;

    let position = "center";
    
    let fadeBar_DisplayTop = "none";
    let fadeBar_DisplayTopMobile = "none";

    let fadeBar_Visiblity = "hidden";
    let fadeBar_Opacity = 0;
    let fadeBar_VisiblityMobile = "hidden";
    let fadeBar_OpacityMobile = 0;

    let fadeBar_display = "block";
    let fadeBar_displayMobile = "block";

    let work_description_container;
    let work_presentation_page;
    let scrollYMobile = 0;
    let scrollY = 0;
    $: innerWidth = 0;
    
    function scrollCounter(){
        scrollY = work_description_container.scrollTop;
    }
    function scrollCounterMobile(){
        scrollYMobile = work_presentation_page.scrollTop;
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

    $: if ((work_description_container_height - description_box_height) < 0) {
        position = "start";
    } else {
        position = "center";
        fadeBar_Visiblity = "hidden";
        fadeBar_Opacity = 0;
    }

</script>

<svelte:window bind:innerWidth />

{#if workElementVisibility = 'visible'}
    <main >
        <!-- style="--portfolio_item_visible:{workElementVisibility};" -->
        <div class="workPresentation_container">
            <div class="content_container work_presentation_page" on:scroll={scrollCounterMobile} bind:this={work_presentation_page} bind:clientHeight={work_presentation_page_height} style="--fade_offsetMobile: {scrollYMobile}px; --visibilityMobile: {fadeBar_VisiblityMobile}; --opacityMobile: {fadeBar_OpacityMobile}; --displayFadeMobile: {fadeBar_displayMobile}; --displayFadeMobileTop: {fadeBar_DisplayTopMobile};">
                <div bind:offsetHeight={imageHeight} class="workPreviewElement_Box">
                    <img class="Portfolio_workPreviewElement" src={workElementImage} alt="Portfolio_workPreviewElement">
                </div>
                <div on:scroll={scrollCounter} class="work_description_container" bind:this={work_description_container} bind:clientHeight={work_description_container_height} style="align-items: {position}; --fade_offset: {scrollY}px; --visibility: {fadeBar_Visiblity}; --opacity: {fadeBar_Opacity}; --displayFade: {fadeBar_display}; --displayFadeTop: {fadeBar_DisplayTop};">
                    <div class="description_box" bind:clientHeight={description_box_height}>
                        <p class="work_title">"{workElementTitle}"</p>
                        <p class="work_description">{workElementText} <slot/> </p>
                    </div>
                </div>
                <!-- <div class="fade_blur"></div> -->
                <!-- <p class="button_more_info"><button class="button_more_info_action" on:click={open_more_info}>- view more -</button></p> -->
            </div>
        </div>
    </main>
{/if}


<style>
    *{
        margin: 0;
        padding: 0;
    }
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }
    main{
        visibility: var(--portfolio_item_visible);
        /* position: fixed; */
        inset: 0;
        z-index: 9991;
        scroll-snap-align: start;
        scroll-snap-stop: always;
    }
    .workPresentation_container{
        width: 100%;
        height: 100vh;
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
        grid-template-columns: 2fr 1.5fr;
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
        max-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        
    }
    .Portfolio_workPreviewElement{
        width: max(20rem, 80%);
        max-height: 80vh;
    }
    
    .work_description_container{
        width: 100%;
        height: 75%;
        display: flex;
        justify-content: flex-start;
        /* align-items: center; */
        /* border-radius: max(1rem, 1vw); */
        /* background: radial-gradient(transparent 80%, var(--background_color_alternativeLightYellow) 125%);
        box-shadow: inset 0 0 1rem var(--background_color_alternativeLightYellow); */

        overflow-x: clip;
        overflow-y: auto;
        overscroll-behavior: none;

        position: relative;
        isolation: isolate;

        /* anchor-name: --_work_description_container; */
        /* mask: linear-gradient(180deg, transparent, white 10%, white 90%, transparent); */
    }

    /* .fade_blur{
        position: absolute;
        position-anchor: --_work_description_container;
        display: var(--displayFade);
        width: 100%;
        height: 10%;
        bottom: anchor(bottom);
        background: linear-gradient(transparent, var(--element_color_darkerCyan));
        mask: linear-gradient(to bottom, transparent, var(--background_color_lightYellow) 75%);
        backdrop-filter: blur(5px);
        z-index: 500;
    } */
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
        font-family: "Neutral_Bold";
        font-size: max(2.5rem, 2vw);
    }
    .work_description_container::after{
        content: "";
        position: absolute;
        display: var(--displayFadeTop);
        /* visibility: var(--visibility); */
        /* opacity: var(--opacity); */
        /* transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out; */
        width: 100%;
        height: 20%;
        translate: 0 -50%;
        top: calc(var(--fade_offset));
        background: linear-gradient(transparent, var(--background_color_lightYellow) 30%, var(--background_color_lightYellow) 50%, transparent);
        mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 15%, var(--background_color_lightYellow) 65%, transparent);
        backdrop-filter: blur(5px);
        z-index: 500;
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
        font-family: 'Brolimo';
        font-size: var(--text_size_big);
        line-height: var(--text_line_height_big);
        text-wrap: balance;
    }
    .work_description{
        font-family: 'Subjectivity_Regular';
        font-size: var(--text_size_small);
        line-height: var(--text_line_small);
        letter-spacing: -0.5px;
        text-wrap: pretty;
        hyphens: auto;
    }
    .description_box::before{
        content: "";
        position: absolute;
        background-color: var(--element_color_darkerCyan);
        width: max(1rem, 1.75vw);
        aspect-ratio: 1;
        border-radius: 50%;
        bottom: 0;
        translate: 0 200%;
        z-index: 600;
    }
    /* .button_more_info{
        width: 90%;
        grid-area: 2 / 1 / 3 / 3;
        position: relative;
        isolation: isolate;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }
    .button_more_info_action{
        width: 100%;
        height: 100%;
        font-family: 'Brolimo';
        font-size: var(--text_size_extra_small);
        cursor: pointer;
    }
    .button_more_info::after{
        content: "";
        position: absolute;
        inset: 0 45% 0 45%;
        background-color: var(--background_color_alternativeLightYellow);
        filter: blur(max(0.5rem, 0.8vw));
        z-index: -1;
        cursor: pointer;
        translate: 0 50%;
        transition: all 0.3s ease-in-out;
    }
    .button_more_info:hover::after{
        inset: -15% 0 -25% 0;
        translate: 0 0%;
        filter: blur(max(0.25rem, 0.25vw));
        border-radius: max(0.5rem, 0.5vw);
    } */

    @media (width < 1100px) {
        .description_box{
            width: 100%;
        }
    }
    @media (width < 1000px) {
        .content_container.work_presentation_page{
            grid-template-columns: 1fr;
            grid-template-rows: 1.5fr 1fr;
            gap: max(2rem + 2.5vh, 3.5vw) 0;
            overflow-y: scroll;
            overflow-x: clip;

            position: relative;
            isolation: isolate;
        }
        .content_container.work_presentation_page::before{
            content: "↓";
            position: absolute;
            width: 100%;
            height: 8%;
            display: var(--displayFadeMobile);
            bottom: calc((var(--fade_offsetMobile) * -1) - 10px);
            background: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 85%);
            mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 60%);
            backdrop-filter: blur(5px);
            z-index: 500;

            text-align: end;
            color: var(--text_color_gray90);
            font-family: "Neutral_Bold";
            font-size: max(2rem, 2vh);
        }
        .content_container.work_presentation_page::after{
            content: "";
            position: absolute;
            display: var(--displayFadeMobileTop);
            /* visibility: var(--visibilityMobile);
            opacity: var(--opacityMobile);
            transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out; */
            width: 100%;
            height: 16%;
            translate: 0 -50%;
            top: calc(var(--fade_offsetMobile) - 5px);
            background: linear-gradient(transparent, var(--background_color_lightYellow) 15%, var(--background_color_lightYellow) 60%, transparent);
            mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 0%, var(--background_color_lightYellow) 75%, transparent);
            backdrop-filter: blur(5px);
            z-index: 500;
        }

        .Portfolio_workPreviewElement{
            max-height: 50vh;
            width: max(25rem, 75%);
        }

        .work_description_container{
            align-self: flex-start;
            overflow-y: visible;
            height: fit-content;
            justify-content: center;
        }
        .work_description_container::after{
            display: none;
        }
        .work_description_container::before{
            display: none;
        }
        .description_box{
            width: max(25rem, 75%);
        }
        .description_box::before{
            translate: 0 300%;
            z-index: 600;
        }
        /* .button_more_info{
            grid-area: auto;
        }    */
        /* .work_description::before{
            width: max(1.25rem, 1.75vw);
            left: 0;
            top: 50%;
            translate: 0 max(5vh, 2rem);
        } */
        /* .button_more_info::after{
            inset: 0 40% 0 40%;
            translate: 0 50%;
        } */
    }
    @media (width < 500px) {
        .Portfolio_workPreviewElement{
            width: max(10rem, 100%);
        }
        .description_box{
            width: 100%;
        }
        /* .button_more_info::after{
            inset: 0 35% 0 35%;
            translate: 0 50%;
        } */
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