<script>
    export let workElementTitle = "Title area: no data"
    export let workElementText = "Text area: not data"
    export let workElementItem = ''
    // export let workElementItemLink = '$lib/svg_files/Portfolio/Portfolio_Works/' + workElementItem
    import Portfolio_workPreviewElement_ART from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_ART.svg'
    import Portfolio_workPreviewElement_Logo_Ww from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Logo_Ww.svg'
    import Portfolio_workPreviewElement_Logo_Tt from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Logo_Tt.svg'
    import Portfolio_workPreviewElement_Lexi from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi.svg'
    import Portfolio_workPreviewElement_Lexi_V2 from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi_V2.svg'
    import Portfolio_workPreviewElement_LXY_alt from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_LXY_alt.svg'
    import Portfolio_workPreviewElement_Anata from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Anata.svg'
    import Portfolio_workPreviewElement_Omic from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Omic.svg'
    import Portfolio_workPreviewElement_MrGummy from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_MrGummy.svg'
    // import Portfolio_workPreviewElement_ART from '${workElementItemLink}'
    //list of items <<
</script>

<main>
    <div class="workPresentation_container">
        <div class="content_container work_presentation_page">
            <div class="description_box">
                <p class="work_title">"{workElementTitle}"</p>
                <p class="work_description">{workElementText}</p>
            </div>
            {#if workElementItem === "0"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_ART} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "1"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Logo_Ww} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "2"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Logo_Tt} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "3"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Lexi} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "4"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Lexi_V2} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "5"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_LXY_alt} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "6"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Anata} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "7"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Omic} alt="Portfolio_workPreviewElement">
            {:else if workElementItem === "8"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_MrGummy} alt="Portfolio_workPreviewElement">
            {/if}
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
        grid-template-columns: 1.65fr 2fr;
        grid-template-rows: 1fr 2rem;
        align-items: center;
        justify-items: center;
        gap: 0rem max(2.5rem, 4vw);
        width: 95%;
        height: 85%;
    }
    .Portfolio_workPreviewElement{
        width: max(20rem, 80%);
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
        text-align: end;
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
        bottom: 0;
        left: 0;
        translate: 0 250%;
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
            grid-template-columns: 1fr;
            grid-template-rows: 1.5fr 1fr 2rem;
            gap: max(1.75rem, 3.5vw) 0;
        }
        .Portfolio_workPreviewElement{
            width: max(25rem, 75%);
            order: 1;
        }
        .description_box{
            align-self: flex-start;
            width: max(25rem, 75%);
            order: 2;
        }
        .work_description{
            text-align: end;
        }
        .button_more_info{
            grid-area: auto;
            order: 3;
        }
        .work_title::before{
            translate: min(-9vw, -3.5rem) -50%;
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