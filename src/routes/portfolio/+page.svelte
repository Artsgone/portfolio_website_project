<script>
    import Navbar from '$lib/reusable_components/+navbar.svelte'
    import Header from '$lib/reusable_components/+header.svelte'
    import Footer from '$lib/reusable_components/+footer.svelte'
    import WorkPresent from '$lib/reusable_components/+portfolio_work_item.svelte'
    import WorkPresentAlt from '$lib/reusable_components/+portfolio_work_item_alt.svelte'
    import WorkItemDetailed from '$lib/reusable_components/+portfolio_item_detailed.svelte'
    import Portfolio_TitleDecor from '$lib/svg_files/Portfolio/Portfolio_TitleDecor.svg'
    import Portfolio_workPreviewElement_ART from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_ART.svg'
    import Portfolio_workPreviewElement_Roe from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Roe.svg'
    import Portfolio_workPreviewElement_Architect from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Architect.svg'
    import Portfolio_workPreviewElement_Artsgone from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Artsgone.svg'
    import Portfolio_workPreviewElement_LXY from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_LXY.svg'
    import Portfolio_workPreviewElement_Lexi_alternate from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi_alternate.svg'
    import Portfolio_workPreviewElement_Omic from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Omic.svg'
</script>

<main>
    <div class="default_container cyan">
        <Header title_Decor_ID = "portfolio"/>
        <div class="content_container title_page">
            <div class="title_page_name">
                <div class="title_name darkgrayText">Portfolio</div>
                <img id="Portfolio_TitleDecor" src={Portfolio_TitleDecor} alt="Portfolio_TitleDecor">
            </div>
        <Navbar firstLink="Main page" secondLink="About me" thirdLink="Contact" 
                linkAddress1="" linkAddress2="about_me" linkAddress3="contact"/>
        </div>
    </div>
    <div class="default_container">
        <div class="content_container work_summary_page">
            <p class="text_corner_previewOfWorks tcp1">preview <br> of works</p>
            <p class="text_corner_previewOfWorks tcp2">preview <br> of works</p>
            <div class="works_preview_grid">
                <div class="work_element_preview_box wep_box1 top rounded mobile_left">
                    <img src={Portfolio_workPreviewElement_ART} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div class="work_element_preview_box wep_box2 top mobile_rounded">
                    <img src={Portfolio_workPreviewElement_LXY} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div class="work_element_preview_box wep_box3 top rounded mobile_left mobile_rounded ">
                    <img src={Portfolio_workPreviewElement_Architect} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div class="work_element_preview_box wep_box4 bottom rounded">
                    <img src={Portfolio_workPreviewElement_Artsgone} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div class="work_element_preview_box wep_box5 bottom mobile_left">
                    <img src={Portfolio_workPreviewElement_Omic} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
                <div class="work_element_preview_box wep_box6 bottom rounded mobile_rounded">
                    <img src={Portfolio_workPreviewElement_Lexi_alternate} alt="Portfolio_workPreviewElement_ART" class="work_element_preview">
                </div>
            </div>
        </div>
    </div>
    <!-- <WorkItemDetailed workElementItem="6" workElementTitle="Antic Museum" workElementText="This piece of art is a piece of ... art" /> -->
    <WorkPresent workElementItem="0" workElementTitle="ART" workElementText="This piece of art is a piece of ... art" />
        <!-- <WorkPresentAlt workElementItem="0" workElementTitle="LXY" workElementText="This piece of art is a piece of ... art, maybe baby" /> -->
    <WorkPresent workElementItem="1" workElementTitle="POE" workElementText="This piece of art is a piece of ... art and of course it is lorem ipsum compatible" />
        <WorkPresentAlt workElementItem="1" workElementTitle="Wappa" workElementText="This piece of art is a piece of ... art, maybe baby" />
    <WorkPresent workElementItem="2" workElementTitle="Architect" workElementText="This piece of art is a piece of ... art" />
        <WorkPresentAlt workElementItem="2" workElementTitle="Toreno" workElementText="This piece of art is a piece of ... art, maybe baby" />
    <WorkPresent workElementItem="3" workElementTitle="Artsgone" workElementText="This piece of art is a piece of ... art" />
        <WorkPresentAlt workElementItem="3" workElementTitle="Lexi" workElementText="This piece of art is a piece of ... art, maybe baby" />
    <WorkPresent workElementItem="4" workElementTitle="LXY" workElementText="This piece of art is a piece of ... art" />
        <WorkPresentAlt workElementItem="4" workElementTitle="Lanobi" workElementText="This piece of art is a piece of ... art, maybe baby" />
    <WorkPresent workElementItem="5" workElementTitle="Lexi - alt" workElementText="This piece of art is a piece of ... art" />
        <WorkPresentAlt workElementItem="5" workElementTitle="LXY - alt" workElementText="This piece of art is a piece of ... art, maybe baby" />
    <WorkPresent workElementItem="6" workElementTitle="Antic Museum" workElementText="This piece of art is a piece of ... art" />
        <WorkPresentAlt workElementItem="6" workElementTitle="Anata" workElementText="This piece of art is a piece of ... art, maybe baby" />
    <WorkPresent workElementItem="7" workElementTitle="A/R" workElementText="This piece of art is a piece of ... art" />
        <WorkPresentAlt workElementItem="7" workElementTitle="Omic" workElementText="This piece of art is a piece of ... art, maybe baby" />
    <WorkPresent workElementItem="8" workElementTitle="Nameless sadas" workElementText="This piece of art is a piece of ... art" />
        <WorkPresentAlt workElementItem="8" workElementTitle="MR. Gummy" workElementText="This piece of art is a piece of ... art, maybe baby k k k k k k k k kk k k k k k k kk k k k k k k kkkkkk k k k k k k k k k kk k k k k kk k" />
    <WorkPresent workElementItem="9" workElementTitle="Bena" workElementText="This piece of art is a piece of ... art" />

    <Footer firstLink="Main page" secondLink="About me" thirdLink="Contact" 
    linkAddress1="" linkAddress2="about_me" linkAddress3="contact"
    titleName = "Portfolio" footer_Decor_ID = "portfolio" />
</main>

<style>
    :global(body){
        margin: 0;
        padding: 0;
    }
    :global(body)::-webkit-scrollbar {
        width: 0.5em;
    }
    :global(body)::-webkit-scrollbar-track {
        background-color: var(--background_color_lightCyan);
    }
    :global(body)::-webkit-scrollbar-thumb {
        background-color: var(--background_color_alternativeLightYellow);
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
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightYellow);
        border-bottom: 2px solid var(--text_color_gray90);
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
        position: relative;
        z-index: 0;
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
        background-color: var(--background_color_lightCyan);
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
        /* outline: 2px red solid; */
    }
    #Portfolio_TitleDecor{
        width: var(--element_size_title_decor_portfolio);
        position: absolute;
    }
    .title_name{
        font-size: max(15vw, 6.25rem);
        font-family: 'Brolimo';
        z-index: 9999;
    }

    @media (width < 500px){
        .content_container.title_page{
            justify-content: center;
            gap: 15vh;
        }
        #Portfolio_TitleDecor{
            width: 85%;
            translate: 0% 5%;
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
        grid-template-rows: repeat(2, 20vw);
        justify-items: center;
    }
    .work_element_preview_box.wep_box4{
        grid-area: 2 / 2 / 3 / 3;
    }
    .work_element_preview_box.wep_box5{
        grid-area: 2 / 3 / 3 / 4;
    }
    .work_element_preview_box.wep_box6{
        grid-area: 2 / 4 / 3 / 5;
    }
    .work_element_preview_box{
        aspect-ratio: 1;
        border: max(2px, 0.2vw) var(--text_color_gray90) solid;
        background-color: var(--background_color_lightYellow);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .work_element_preview{
        width: 77%;
    }

    .works_preview_grid > :not(.rounded)::before, .rounded::before{
        content: '';
        box-sizing: content-box;
        position: absolute;
        width: 100%;
        aspect-ratio: 1;
        background-color: var(--background_color_alternativeLightYellow);
        border: max(2px, 0.2vw) var(--text_color_gray90) solid;
        z-index: -1;
    }
    .works_preview_grid > :not(.rounded)::before{
        content: '';
        z-index: -2;
    }
    .rounded, .rounded::before{
        border-radius: 40%;
    }

    .works_preview_grid > .work_element_preview_box.top::before{
        translate: 0% 6%;
    }
    .works_preview_grid > .work_element_preview_box.bottom::before{
        translate: 0% -6%;
    }

    @media (width < 900px) {
        .works_preview_grid{
            grid-template-columns: repeat(2, 50%);
            grid-template-rows: repeat(3, 20vh);
        }
        .work_element_preview_box{
            height: 95%;
            align-self: center;
        }
        .work_element_preview{
            width: 70%;
        }

        .rounded, .rounded::before{
            border-radius: 0%;
        }
        .mobile_rounded, .mobile_rounded::before{
            border-radius: 30%;
        }
        .works_preview_grid > :not(.mobile_rounded)::before{
            z-index: -2;
        }
        
        .work_element_preview_box.wep_box3{
            grid-area: 2 / 1 / 3 / 2;
        }
        .work_element_preview_box.wep_box4{
            grid-area: 2 / 2 / 3 / 3;
        }
        .work_element_preview_box.wep_box5{
            grid-area: 3 / 1 / 4 / 2;
        }
        .work_element_preview_box.wep_box6{
            grid-area: 3 / 2 / 4 / 3;
        }

        .works_preview_grid > .work_element_preview_box.mobile_left::before{
            translate: 6% 0%;
        }
        .works_preview_grid > .work_element_preview_box:not(.mobile_left)::before{
            translate: -6% 0%;
        }
    }
    @media (width < 475px) {
        .work_element_preview_box{
            height: min(95%, 37.5vw);
            align-self: center;
        }
        .work_element_preview{
            width: 70%;
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