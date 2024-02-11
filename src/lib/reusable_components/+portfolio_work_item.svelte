<script>
    export let workElementTitle = "Title area: no data"
    export let workElementText = "Text area: not data"
    export let workElementItem = ''
    // export let workElementItemLink = '$lib/svg_files/Portfolio/Portfolio_Works/' + workElementItem
    import Portfolio_workPreviewElement_ART from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_ART.svg'
    import Portfolio_workPreviewElement_Roe from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Roe.svg'
    import Portfolio_workPreviewElement_Architect from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Architect.svg'
    import Portfolio_workPreviewElement_Artsgone from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Artsgone.svg'
    import Portfolio_workPreviewElement_LXY from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_LXY.svg'
    import Portfolio_workPreviewElement_Lexi_alternate from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi_alternate.svg'
    import Portfolio_workPreviewElement_Museum from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Museum.svg'
    import Portfolio_workPreviewElement_Nameless from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Nameless.svg'
    import Portfolio_workPreviewElement_Bena from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Bena.svg'
    import New_LOGO_AR from '$lib/svg_files/New_LOGO_AR.svg'
    // import Portfolio_workPreviewElement_ART from '${workElementItemLink}'
    //list of items <<
</script>

<main>
    <div class="workPresentation_container">
        <div class="content_container work_presentation_page">
            {#if workElementItem === "0"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_ART} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "1"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Roe} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "2"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Architect} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "3"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Artsgone} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "4"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_LXY} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "5"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Lexi_alternate} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "6"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Museum} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "7"}
                <img class="Portfolio_workPreviewElement" src={New_LOGO_AR} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "8"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Nameless} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "9"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Bena} alt="Portfolio_workPreviewElement">
            {/if}
            
            <div class="description_box">
                <p class="work_title">"{workElementTitle}"</p>
                <p class="work_description">{workElementText}</p>
            </div>
            <p class="button_more_info">press to view more</p>
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
    .workPresentation_container{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightYellow);
        border-bottom: 2px solid var(--text_color_gray90);
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
    }
    .content_container.work_presentation_page{
        display: grid;
        grid-template-columns: 2fr 1.65fr;
        grid-template-rows: 1fr 2rem;
        align-items: center;
        justify-items: center;
        gap: 0rem max(2.5rem, 4vw);
        width: 95%;
        height: 85%;
    }
    .Portfolio_workPreviewElement{
        width: max(12.5rem, 80%);
        max-height: 90%;
        
    }
    
    .description_box{
        width: 80%;
        display: flex;
        flex-direction: column;
        gap: max(1.5vw, 1.5rem);
        position: relative;
    }
    .work_title{
        font-family: 'Brolimo';
        font-size: var(--text_size_big);
        line-height: var(--text_line_height_big);
    }
    .work_description{
        font-family: 'Subjectivity_Regular';
        font-size: var(--text_size_small);
        line-height: var(--text_line_small);
        letter-spacing: -0.5px;
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
    }
    .button_more_info{
        width: 90%;
        text-align: center;
        font-family: 'Brolimo';
        font-size: var(--text_size_extra_small);
        grid-area: 2 / 1 / 3 / 3;
        position: relative;
        isolation: isolate;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }
    .button_more_info::after{
        content: "";
        position: absolute;
        inset: 0 45% 0 45%;
        background-color: var(--background_color_alternativeLightYellow);
        filter: blur(1rem);
        z-index: -1;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        opacity: 0;
    }
    .button_more_info:hover::after{
        opacity: 1;
        inset: 0 0 0 0;
    }

    @media (width < 1100px) {
        .description_box{
            width: 100%;
        }
    }
    @media (width < 1000px) {
        .content_container.work_presentation_page{
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1.5fr 1fr 2rem;
            align-items: center;
            justify-items: center;
            gap: max(1.75rem, 3.5vw) 0;
        }
        .Portfolio_workPreviewElement{
            width: max(25rem, 75%);
        }
        .description_box{
            align-self: flex-start;
            width: max(25rem, 75%);
        }
        .button_more_info{
            grid-area: auto;
        }   
        .work_description::before{
            width: max(1.25rem, 1.75vw);
            left: 0;
            top: 50%;
            translate: 0 max(5vh, 2rem);
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