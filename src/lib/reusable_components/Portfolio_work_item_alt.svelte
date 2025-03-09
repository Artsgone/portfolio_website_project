<script>
    export let workElementTitle = "Title area: no data"
    export let workElementText = "Text area: not data"
    export let workElementImage = ''
    export let firstWorkElement = false
    export let lastWorkElement = false
    // export let workElementVisibility = 'hidden';
    import Global_tapIcon from '$lib/svg_files/GlobalSVGs/Global_tapIcon.svg'

    import { onMount } from "svelte";
    import { fade, fly, scale } from 'svelte/transition';
    import { elasticOut, sineInOut } from 'svelte/easing';

    let imageHeight;

    $: innerWidth = 0;

    onMount(() => {;
        imageHeight = imageHeight;
        if ((work_description_container_height - description_box_height) < 0) {
            position = "start"
        } else {
            position = "center"
        }
    });

    let work_presentation_page_height = 0
    let work_description_container_height = 0
    let description_box_height = 0

    let position = "center"

    let fadeBar_DisplayTop = false
    let fadeBar_DisplayTopMobile = false

    let fadeBar_display = true
    let fadeBar_displayMobile = true

    let work_description_container;
    let work_presentation_page;
    let scrollYMobile = 0;
    let scrollY = 0;

    let enableScrollAllow = true;
    let enableScrollToggle = "clip"
    
    let timeIsOut = true
    function scrollCounter(){
        if (innerWidth > 1000 && timeIsOut) {
            setTimeout(function () {
                scrollY = work_description_container.scrollTop;
                console.log(scrollY)
                if (scrollY > 25) {
                    fadeBar_DisplayTop = true
                } else {
                    fadeBar_DisplayTop = false
                }
                if ((work_description_container_height + scrollY) > (description_box_height)) {
                    fadeBar_display = false
                } else {
                    fadeBar_display = true
                }
                timeIsOut = true
            }, 250)
            timeIsOut = false
        }
    }

    let timeIsOutMobile = true
    function scrollCounterMobile(){
        if (innerWidth <= 1000 && timeIsOutMobile) {
            setTimeout(function () {
                scrollYMobile = work_presentation_page.scrollTop;
                if (scrollYMobile > imageHeight / 2) {
                    fadeBar_DisplayTopMobile = true
                } else {
                    fadeBar_DisplayTopMobile = false
                }
                if ((description_box_height - scrollYMobile + 50) > (work_presentation_page_height - imageHeight)) {
                    fadeBar_displayMobile = true
                } else {
                    fadeBar_displayMobile = false
                }
            }, 250)
            timeIsOut = false
        }
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

    function loadListenerAlt(node) {
        function isLoaded() {
            node.removeEventListener("load", isLoaded)
            // setTimeout(() => {
                node.classList.add("isLoaded")
            // }, 0)
        }
        node.addEventListener("load", isLoaded, {once: true})
        return {
            destroy() {
                node.removeEventListener("load", isLoaded)
            }
        }
    }

    let showAdviceArrows = false
</script>

<svelte:window bind:innerWidth />

<!-- <div class="workPresentation_container"> -->
    <div class="work_presentation_page__outer" class:showBlurMaskBottom={fadeBar_displayMobile} class:showBlurMaskTop={fadeBar_DisplayTopMobile} class:showBlurMaskBottomHidden={!fadeBar_displayMobile} class:showBlurMaskTopHidden={!fadeBar_DisplayTopMobile}>
        <div class="content_container work_presentation_page" tabindex="0" role="button" on:keyup={enableScroll} on:click={enableScroll} on:scroll={scrollCounterMobile} bind:this={work_presentation_page} bind:clientHeight={work_presentation_page_height} 
            style="overflow-y: {enableScrollToggle}; ">
            
            <div class="work_description_container__outer" in:fly={{ delay: 0, duration: 2000, easing: elasticOut, y: '2.5vh', opacity: 0}} class:showBlurMaskBottom={fadeBar_display} class:showBlurMaskTop={fadeBar_DisplayTop} class:showBlurMaskBottomHidden={!fadeBar_display} class:showBlurMaskTopHidden={!fadeBar_DisplayTop}>
                <div on:scroll={scrollCounter} class="work_description_container" bind:this={work_description_container} bind:clientHeight={work_description_container_height} style="align-items: {position};">
                    <div class="description_box" bind:clientHeight={description_box_height}>
                        <p class="work_title">"{workElementTitle}"</p>
                        <p class="work_description">{workElementText} <slot/> </p>
                    </div>
                </div>
            </div>
            <div bind:offsetHeight={imageHeight} class="workPreviewElement_Box" in:scale={{ delay: 0, duration: 2000, easing: elasticOut, start: 0.975, opacity: 1 }}>
                <img class="Portfolio_workPreviewElement forLazyLoad" src={workElementImage} use:loadListenerAlt alt="Portfolio_workPreviewElement">
            </div>
            {#if enableScrollAllow && description_box_height > 300 && innerWidth <= 1000}
                <div transition:fade={{ delay: 0, duration: 200, easing: sineInOut}} class="tapForMoreInfo_button" style="--imageHeight: {imageHeight}px;"> <img class="Global_tapIcon" src={Global_tapIcon} alt="Global_tapIcon">- Tap for description -</div>
            {/if}
        </div>
    </div>
    <div class="adviceArrows arrowUp" in:fly={{ delay: 250, duration: 1000, easing: elasticOut, y: '5vh', opacity: 0}} on:introstart={() => {showAdviceArrows = true}} on:introend={() => {showAdviceArrows = false}}>
        {#if showAdviceArrows && !firstWorkElement}
            <div class="adviceArrows_inner" out:fly={{ delay: 250, duration: 250, easing: sineInOut, y: '-15vh', opacity: 0}}>↑</div>
        {/if}
    </div>
    <div class="adviceArrows arrowDown" in:fly={{ delay: 250, duration: 1000, easing: elasticOut, y: '-5vh', opacity: 0}}>
        {#if showAdviceArrows && !lastWorkElement}
            <div class="adviceArrows_inner" out:fly={{ delay: 250, duration: 250, easing: sineInOut, y: '15vh', opacity: 0}}>↓</div>
        {/if}
    </div>
<!-- </div> -->

<style>
    *{
        margin: 0;
        padding: 0;
    }
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }
    .adviceArrows{
        position: absolute;
        width: 100%;
        height: min(15dvh, 25vw);
        color: var(--background_color_alternativeLightYellow);
        font-family: "Neutral_Bold";
        font-size: min(7.5dvh, 12.5vw);
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .arrowUp{ 
        top: 0;
    }
    .arrowDown{
        bottom: 0;
    }
    .adviceArrows_inner{
        padding-inline: max(2.5vw, 1.5rem);
    }
    .work_presentation_page__outer{
        width: 95%;
        height: 85%;
    }
    .content_container.work_presentation_page{
        display: grid;
        grid-template-columns: 1.5fr 2fr;
        grid-template-rows: 1fr;
        align-items: center;
        justify-items: center;
        gap: 0rem max(2.5rem, 4vw);
        width: 100%;
        height: 100%;
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
        opacity: 0;
        transition: opacity 0.5s var(--bezierTransition);
    }
    .Portfolio_workPreviewElement:is(.isLoaded){
        opacity: 1;
    }
    
    .work_description_container__outer{
        width: 100%;
        height: 75%;
        position: relative;
        isolation: isolate;
    }
    .work_description_container{
        width: 100%;
        height: 100%;
        display: flex;

        overflow-x: clip;
        overflow-y: auto;
        direction: rtl;
        overscroll-behavior: none;
    }
    .work_description_container__outer::before{
        content: "";
        position: absolute;
        width: 102%;
        height: 15%;
        translate: -1% 0;
        bottom: -1%;
        background: linear-gradient(transparent, var(--background_color_lightYellow) 90%);
        mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 75%);
        backdrop-filter: blur(max(0.2vw, 0.2vh));
        z-index: 500;
        transition: opacity 0.25s var(--bezierTransition);
    }
    .work_description_container__outer::after{
        content: "";
        position: absolute;
        width: 102%;
        height: 15%;
        translate: -1% 0;
        top: -1%;
        background: linear-gradient(var(--background_color_lightYellow) 10%, transparent);
        mask: linear-gradient(180deg, var(--background_color_lightYellow) 25%, transparent);
        backdrop-filter: blur(max(0.2vw, 0.2vh));
        z-index: 500;
        transition: opacity 0.25s var(--bezierTransition);
    }
    .work_description_container__outer.showBlurMaskTop::after{
        content-visibility: visible;
        opacity: 1;
    }
    .work_description_container__outer.showBlurMaskBottom::before{
        content-visibility: visible;
        opacity: 1;
    }
    .work_description_container__outer.showBlurMaskTopHidden::after{
        content-visibility: hidden;
        opacity: 0;
    }
    .work_description_container__outer.showBlurMaskBottomHidden::before{
        content-visibility: hidden;
        opacity: 0;
    }

    .tapForMoreInfo_button{
        display: none;
    }

    .work_description_container::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    .work_description_container::-webkit-scrollbar-track {
        background-color: var(--background_color_lightCyan_lowerOpacity);
    }
    .work_description_container::-webkit-scrollbar-thumb {
        background-color: var(--background_color_alternativeLightYellow);
        outline: max(0.15vw, 0.15rem) var(--background_color_alternativeLightYellow) solid;
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
        letter-spacing: -0.01rem;
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
        .work_presentation_page__outer{
            position: relative;
            isolation: isolate;
        }
        .content_container.work_presentation_page{
            grid-template-columns: 1fr;
            grid-template-rows: 1.4fr 1fr;
            gap: max(1rem + 2.5vh, 3.5vw) 0;
            overflow-x: clip;
            overflow-clip-margin: 1rem;
        }
        .tapForMoreInfo_button{
            position: absolute;
            bottom: 0;
            width: 105%;
            translate: 0 2.5vh;
            height: calc(100% - var(--imageHeight) - 10vh);
            background: linear-gradient(180deg, transparent, var(--background_color_lightYellow));
            mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 25%);
            backdrop-filter: blur(5px);
            border-radius: max(1vw, 1rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1.25vh 0;
            z-index: 510;

            font-family: 'Subjectivity_Regular', system-ui, sans-serif;
            /* text-transform: uppercase; */
            font-size: max(1.5vw, 1.4rem);
            text-align: center;
        }
        .Global_tapIcon{
            width: min(25%, 4rem);
            aspect-ratio: 1;
        }
        .work_presentation_page__outer::before{
            content: "";
            position: absolute;
            width: 102%;
            height: 10%;
            translate: -1% 0;
            bottom: -1%;
            background: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 80%);
            mask: linear-gradient(180deg, transparent, var(--background_color_lightYellow) 65%);
            backdrop-filter: blur(max(0.2vw, 0.2vh));
            z-index: 500;
            opacity: 1;
            transition: opacity 0.25s var(--bezierTransition);
        }
        .work_presentation_page__outer::after{
            content: "";
            position: absolute;
            width: 102%;
            height: 10%;
            translate: -1% 0;
            top: -1%;
            background: linear-gradient(var(--background_color_lightYellow) 20%, transparent);
            mask: linear-gradient(180deg, var(--background_color_lightYellow) 35%, transparent);
            backdrop-filter: blur(max(0.2vw, 0.2vh));
            z-index: 500;
            opacity: 1;
            transition: opacity 0.25s var(--bezierTransition);
        }

        .work_presentation_page__outer.showBlurMaskTopHidden::after{
            content-visibility: hidden;
            opacity: 0;
        }
        .work_presentation_page__outer.showBlurMaskBottomHidden::before{
            content-visibility: hidden;
            opacity: 0;
        }
        .work_presentation_page__outer.showBlurMaskTop::after{
            content-visibility: visible;
            opacity: 1;
        }
        .work_presentation_page__outer.showBlurMaskBottom::before{
            content-visibility: visible;
            opacity: 1;
        }

        .workPreviewElement_Box{
            min-height: 45dvh;
        }
        .Portfolio_workPreviewElement{
            max-height: 40vh;
            width: max(25rem, 70%);
            order: 1;
        }

        .work_description_container__outer{
            align-self: flex-start;
            order: 2;
        }
        .work_description_container{
            overflow-y: visible;
            padding-left: 0vw;
            height: fit-content;
            justify-content: center;
        }
        .description_box{
            width: max(25rem, 75%);
        }
        .work_description_container__outer::after{
            display: none;
        }
        .work_description_container__outer::before{
            display: none;
        }

        .description_box::before{
            translate: 0 300%;
            z-index: 600;
        }
    }
    @media (width < 600px) {
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
        .work_presentation_page__outer{
            width: 85%;
            height: 80%;
        }
    }     
    @media (width < 1100px) and (height < 690px){ 
        .work_presentation_page__outer{
            width: 85%;
            height: 90%;
        }
    } 
</style>