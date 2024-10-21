<script>
    export let workElementTitlePopup = "Title area: no data"
    export let workElementTextPopup = "Text area: not data"
    export let workElementItemPopup = ''

    // export let workElementTitlePopup2 = "Title area: no data"
    // export let workElementTextPopup2 = "Text area: not data"
    export let workElementItemPopup2 = ''
    
    // export let workElementItemLink = '$lib/svg_files/Portfolio/Portfolio_Works/' + workElementItem
    import Portfolio_workPreviewElement_Logo_Ww from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Logo_Ww.svg'
    import Portfolio_workPreviewElement_Logo_Tt from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Logo_Tt.svg'
    import Portfolio_workPreviewElement_Lexi from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi.svg'
    import Portfolio_workPreviewElement_Lexi_V2 from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi_V2.svg'
    import Portfolio_workPreviewElement_LXY_alt from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_LXY_alt.svg'
    import Portfolio_workPreviewElement_Anata from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Anata.svg'
    import Portfolio_workPreviewElement_Omic from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Omic.svg'
    import Portfolio_workPreviewElement_MrGummy from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_MrGummy.svg'
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
    <!-- <div class="workPresentation_container"> -->
        <div class="content_container work_presentation_page">
            {#if workElementItemPopup === "0"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_ART} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup === "1"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Roe} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup === "2"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Architect} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup === "3"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Artsgone} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup === "4"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_LXY} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup === "5"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Lexi_alternate} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup === "6"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Museum} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup === "7"}
                <img class="Portfolio_workPreviewElement" src={New_LOGO_AR} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup === "8"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Nameless} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup === "9"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Bena} alt="Portfolio_workPreviewElement">
            {/if}
            {#if workElementItemPopup2 === "0"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_ART} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup2 === "1"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Logo_Ww} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup2 === "2"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Logo_Tt} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup2 === "3"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Lexi} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup2 === "4"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Lexi_V2} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup2 === "5"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_LXY_alt} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup2 === "6"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Anata} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup2 === "7"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_Omic} alt="Portfolio_workPreviewElement">
            {:else if workElementItemPopup2 === "8"}
                <img class="Portfolio_workPreviewElement" src={Portfolio_workPreviewElement_MrGummy} alt="Portfolio_workPreviewElement">
            {/if}
            
            <div class="description_box">
                <p class="work_title">"{workElementTitlePopup}"</p>
                <p class="work_description">{workElementTextPopup}</p>
            </div>
        </div>
    <!-- </div> -->
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
    .content_container.work_presentation_page{
        z-index: 9999;
        position: fixed;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        display: grid;
        grid-template-columns: 2fr 1.65fr;
        grid-template-rows: 1fr;
        align-items: center;
        justify-items: center;
        gap: 0rem max(2.5rem, 4.5vw);
        width: 95%;
        height: 92.5%;
        background-color: var(--background_color_lightYellow);
        box-shadow: inset 0rem 0rem 5rem var(--background_color_alternativeLightYellow);
        border-radius: max(2rem, 2.5vw);
    }
    .Portfolio_workPreviewElement{
        width: max(12.5rem, 70%);
        max-height: 100%;
    }
    .description_box{
        width: 65%;
        display: flex;
        flex-direction: column;
        gap: max(0.5vw, 0.5rem);
        position: relative;
    }
    .work_title{
        font-family: 'Brolimo';
        font-size: var(--text_size_big);
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
            width: max(20rem, 50%);
        }
        .description_box{
            align-self: flex-start;
            width: max(22.5rem, 60%);
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