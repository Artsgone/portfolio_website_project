<script>
    export let workElementTitle = "Title area: no data"
    export let workElementText = "Text area: not data"
    export let workElementImage = ''

    // import WorkItemDetailed from '$lib/reusable_components/+portfolio_item_detailed.svelte'
    import { onMount } from "svelte";

    let imageHeight;

    $: innerWidth = 0;

    onMount(() => {;
        imageHeight = imageHeight;
    });

    $: work_presentation_page_height = 0;
    $: work_description_container_height = 0;
    $: description_box_height = 0;

    let position = "center";
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

    
    
    function scrollCounter(){
        scrollY = work_description_container.scrollTop;
        // console.log(scrollY + "scrolled")
    }
    function scrollCounterMobile(){
        scrollYMobile = work_presentation_page.scrollTop;
        // console.log(scrollYMobile + "scrolled")
    }

    $: if (scrollY < (work_description_container_height * 0.1)) {
        fadeBar_Visiblity = "hidden";
        fadeBar_Opacity = 0;
    } else {
        fadeBar_Visiblity = "visible";
        fadeBar_Opacity = 1;
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
    
    $: if (scrollYMobile < (work_presentation_page_height * 0.1)) {
        fadeBar_VisiblityMobile = "hidden";
        fadeBar_OpacityMobile = 0;
    } else {
        fadeBar_VisiblityMobile = "visible";
        fadeBar_OpacityMobile = 1;
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

<main>
    <div class="workPresentation_container">
        <div class="content_container work_presentation_page" on:scroll={scrollCounterMobile} bind:this={work_presentation_page} bind:clientHeight={work_presentation_page_height} style="--fade_offsetMobile: {scrollYMobile}px; --visibilityMobile: {fadeBar_VisiblityMobile}; --opacityMobile: {fadeBar_OpacityMobile}; --displayFadeMobile: {fadeBar_displayMobile};">
            
            <div on:scroll={scrollCounter}  class="work_description_container" bind:this={work_description_container} bind:clientHeight={work_description_container_height} style="align-items: {position}; --fade_offset: {scrollY}px; --visibility: {fadeBar_Visiblity}; --opacity: {fadeBar_Opacity}; --displayFade: {fadeBar_display};">
                <div class="description_box" bind:clientHeight={description_box_height}>
                    <p class="work_title">"{workElementTitle}"</p>
                    <p class="work_description">{workElementText} <slot/> </p>
                </div>
            </div>
            <div bind:offsetHeight={imageHeight} class="workPreviewElement_Box">
                <img class="Portfolio_workPreviewElement" src={workElementImage} alt="Portfolio_workPreviewElement">
            </div>
            <!-- <p class="button_more_info"> <button class="button_more_info_action" on:click={open_more_info}>- view more -</button></p> -->
        </div>
    </div>
</main>

<style>
    *{
        margin: 0;
        padding: 0;
    }
    *::selection{
        background-color: var(--background_color_lightCyan);
        color: var(--text_color_gray5);
    }
    /* button, button:focus{
        outline: none;
        background: transparent;
        border: 1px solid transparent;
    }
    button:active{
        outline: none;
        background: transparent;
        border: 1px solid transparent;
    } */
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
    }
    
    .work_description_container{
        width: 100%;
        height: 75%;
        display: flex;
        justify-content: flex-start;

        overflow-x: clip;
        overflow-y: auto;
        direction: rtl;

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
        background: linear-gradient(transparent, var(--background_color_lightYellow));
        mask: linear-gradient(to bottom, transparent, var(--background_color_lightYellow) 80%);
        backdrop-filter: blur(5px);
        z-index: 500;

        text-align: end;
        color: var(--background_color_alternativeLightYellow_Darker);
        font-family: "Neutral_Bold";
        font-size: max(2.5rem, 1.75vw);
    }
    .work_description_container::after{
        content: "";
        position: absolute;
        visibility: var(--visibility);
        opacity: var(--opacity);
        transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;
        width: 100%;
        height: 10%;
        top: calc(var(--fade_offset) - 5px);
        background: linear-gradient(var(--background_color_lightYellow), transparent);
        z-index: 500;
        mask: linear-gradient(to top, transparent, var(--background_color_lightYellow) 80%);
        backdrop-filter: blur(5px);
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
        gap: max(1.5vw, 1.5rem);
        position: relative;
    }
    .work_title{
        font-family: 'Brolimo';
        font-size: var(--text_size_big);
        line-height: var(--text_line_height_big);
        /* text-align: end; */
        direction: ltr;
    }
    .work_description{
        font-family: 'Subjectivity_Regular';
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
            grid-template-rows: 1.5fr 1fr;
            gap: max(2.5rem, 3.5vw) 0;
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
            background: linear-gradient(transparent, var(--background_color_lightYellow));
            mask: linear-gradient(to bottom, transparent, var(--background_color_lightYellow) 80%);
            backdrop-filter: blur(5px);
            z-index: 500;

            text-align: end;
            color: var(--background_color_alternativeLightYellow_Darker);
            font-family: "Neutral_Bold";
            font-size: max(2rem, 2vh);
        }
        .content_container.work_presentation_page::after{
            content: "";
            position: absolute;
            visibility: var(--visibilityMobile);
            opacity: var(--opacityMobile);
            transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;
            width: 100%;
            height: 8%;
            top: calc(var(--fade_offsetMobile) - 5px);
            background: linear-gradient(var(--background_color_lightYellow), transparent);
            mask: linear-gradient(to top, transparent, var(--background_color_lightYellow) 80%);
            backdrop-filter: blur(5px);
            z-index: 500;
        }

        .Portfolio_workPreviewElement{
            /* min-width: auto; */
            max-height: 50vh;
            width: max(25rem, 75%);
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
        /* .work_description{
            text-align: end;
        } */
        .work_description_container::before{ display: none;}
        .work_description_container::after{ display: none;}

        .description_box::before{
            translate: 0 300%;
            z-index: 600;
        }
    }
    @media (width < 500px) {
        .Portfolio_workPreviewElement{
            width: max(10rem, 95%);
        }
        .description_box{
            width: 95%;
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