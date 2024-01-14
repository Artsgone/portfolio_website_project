<script>
    import Navbar from '$lib/reusable_components/+navbar.svelte'
    import Header from '$lib/reusable_components/+header.svelte'
    import Footer from '$lib/reusable_components/+footer.svelte'
    import AboutMe_titlePageSVG from '$lib/svg_files/AboutMe/AboutMe_TitleDecorSVG.svg'
    import AboutMe_EducationSVG from '$lib/svg_files/AboutMe/AboutMe_EducationSVG.svg'
    import AboutMe_BackgroundSVG from '$lib/svg_files/AboutMe/AboutMe_LanguagesDecorSVG.svg'
    import AboutMe_BackgroundLanguagesMobile from '$lib/svg_files/AboutMe/AboutMe_LanguagesDecorMobile.svg'
    import AboutMe_LanguagesYellowHighlight from '$lib/svg_files/AboutMe/AboutMe_LanguagesYellowHighlight.svg'
    import AboutMe_SkillsTitleSVG from '$lib/svg_files/AboutMe/AboutMe_SkillsTitleSVG.svg'
    import AboutMe_Skills from '$lib/svg_files/AboutMe/AboutMe_Skills.svg'
    import AboutMe_Skills_Mobile from '$lib/svg_files/AboutMe/AboutMe_Skills_Mobile.svg'
    import AboutMe_OtherPE_Rounded from '$lib/svg_files/AboutMe/AboutMe_OtherPE_Rounded.svg'
    import AboutMe_OtherPE_Square from '$lib/svg_files/AboutMe/AboutMe_OtherPE_Square.svg'

    $: innerWidth = 0
	// $: innerHeight = 0
</script>

<svelte:window bind:innerWidth />

<main>
    <div class="default_container cyan">
        <Header  title_Decor_ID = "aboutme"/>
        <div class="content_container title_page">
            <div class="title_page_name">
                <div class="title_name darkgrayText">About me</div>
                <img id="AboutMe_titlePageSVG" src={AboutMe_titlePageSVG} alt="AboutMe_titlePageSVG">
            </div>
        <Navbar firstLink="Main page" secondLink="Portfolio" thirdLink="Contact" 
                linkAddress1="" linkAddress2="portfolio" linkAddress3="contact"/>
        </div>
    </div>
    <div class="default_container">
        <div class="content_container education_page">
            <img id="AboutMe_EducationSVG" src={AboutMe_EducationSVG} alt="AboutMe_EducationSVG">
            <div class="text education">
                 <p class="darkgrayText">
                    <span class="time_range grayText65">2020-2024</span> - <span class="university_name">Smichovska SPS</span> <br>
                    | Field - Cybernetic security <br> <br>
                   
                    <span class="time_range grayText65">2024-2069</span> - <span class="university_name">Lorem Ipsum university</span> <br>
                    | Field - Wheat <br>
                </p>
            </div>
        </div>
    </div>
    <div class="default_container def_lang">
        {#if innerWidth > 1450}
            <img id="AboutMe_BackgroundSVG" src={AboutMe_BackgroundSVG} alt="AboutMe_BackgroundSVG">
        {:else}
            <img id="AboutMe_BackgroundLanguagesMobile" src={AboutMe_BackgroundLanguagesMobile} alt="AboutMe_BackgroundLanguagesMobile">
        {/if}
        
        <div class="content_container languages_page">
            <p class="grayText65">LANGUAGES</p>
            <div class="text languages">
                <img class="AboutMe_LanguagesYellowHighlight" src={AboutMe_LanguagesYellowHighlight} alt="AboutMe_LanguagesYellowHighlight">
                 <p class="darkgrayText">
                    English - B2 <br>
                    Russian - Native <br>
                    Czech - Fluent
                </p>
            </div>
            <p class="grayText65">LANGUAGES</p>
        </div>
    </div>
    <div class="default_container def_skills_title">
        <div class="content_container skills_title_page">
            <img id="AboutMe_SkillsTitleSVG" src={AboutMe_SkillsTitleSVG} alt="AboutMe_SkillsTitleSVG">
        </div>
    </div>
    <div class="default_container def_skills">
        <div class="content_container skills_page">
            <div class="skills_box">
                {#if innerWidth > 600}
                    <img id="AboutMe_Skills" src={AboutMe_Skills} alt="AboutMe_Skills">
                {:else}
                    <img id="AboutMe_Skills_Mobile" src={AboutMe_Skills_Mobile} alt="AboutMe_Skills_Mobile">
                {/if}
            </div>
        </div>
    </div>
    <div class="default_container">
        <div class="content_container otherAbilities_page">
            <p class="yellowText60 vt">OTHER ABILITIES</p>
            <div class="text otherAbilities">
                <p class="rounded darkgrayText">
                    <img class="AboutMe_OtherPE_Rounded" src={AboutMe_OtherPE_Rounded} alt="AboutMe_OtherPE_Rounded">
                    Creative in designing everything <br> Effective both on my own and in team.
                </p>
                <p class="darkgrayText">
                    <img class="AboutMe_OtherPE_Square" src={AboutMe_OtherPE_Square} alt="AboutMe_OtherPE_Square">
                    Lorem ipsum solte amore de amo, solte amore de amo. <br>
                </p>
                <p class="rounded darkgrayText">
                    <img class="AboutMe_OtherPE_Rounded" src={AboutMe_OtherPE_Rounded} alt="AboutMe_OtherPE_Rounded">
                    Poberto horte si de goeremo be tamo. <br>
                </p>
            </div>
            <p class="yellowText60 vt">OTHER ABILITIES</p>
        </div>
    </div>
    <Footer firstLink="Main page" secondLink="Portfolio" thirdLink="Contact" 
    linkAddress1="" linkAddress2="portfolio" linkAddress3="contact"
    titleName = "About me" footer_Decor_ID = "aboutme"/>
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
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
    }
    .content_container{
        width: 92.5%;
        height: 87.5%;
    }
    .darkgrayText{
        color: var(--text_color_gray90);
    }
    .yellowText60{
        color: var(--text_color_yellow60);
    }
    .grayText65{
        color: var(--text_color_gray65);
    }
    .default_container.cyan{
        height: 100svh;
        background-color: var(--background_color_lightCyan);
        box-shadow: none;
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
    #AboutMe_titlePageSVG{
        width: var(--element_size_title_decor_about_me);
        position: absolute;
        translate: 25% 2.5%;
    }
    .title_name{
        font-size: max(15vw, 5.5rem);
        font-family: 'Brolimo';
        text-wrap: nowrap;
        z-index: 9999;
    }

    @media (width < 500px){
        .content_container.title_page{
            /* justify-content: space-evenly;
            gap: 5vh; */
            justify-content: center;
            gap: 15vh;
        }
        #AboutMe_titlePageSVG{
            width: 75%;
            translate: -5% 5%;
        }
        .title_name{
            text-wrap: wrap;
            text-align: center;
            font-size: 30vw;
            line-height: 22.5vw;
        }
    }
    @media (width < 500px) and (height < 750px){
        .content_container.title_page{
            justify-content: space-evenly;
            gap: 2rem;
        }
    }

    /* PAGE 2 EDUCATION */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.education_page{
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1.5fr 2fr;
        align-content: center;
        align-items: center;
        justify-items: center;
        gap: 3vw;
    }
    #AboutMe_EducationSVG{
        width: max(15rem, 50%);
    }
    .text.education{
        justify-self: start;
    }
    .text.education > p{
        font-family: 'Subjectivity_Medium';
        font-size: max(2vw, 1.55rem);
        line-height: max(2.4vw, 1.85rem);
        letter-spacing: -0.5px;
    }
    .text.education > p > span.university_name{
        font-family: 'Subjectivity_Bold';
        background: linear-gradient(-177.5deg, var(--element_background_color_lightestCyan), var(--background_color_darkCyanSaturated));
        background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
    }
    .text.education > p > span.time_range{
        font-family: 'Neutral_Normal';
        letter-spacing: 0px;
    }

    @media (width < 1450px) {
        .content_container.education_page{
            grid-auto-columns: 1.5fr 2fr;
        }
    }
    @media (width < 1100px) {
        .content_container.education_page{
            grid-auto-flow: row;
            grid-auto-rows: 1fr 1fr;
        }
        #AboutMe_EducationSVG{
            width: max(15rem, 30%);
        }
        .text.education > p{
            text-align: center;
        }
        .text.education{
            justify-self: center;
        }
    }
    @media (width < 1100px) and (width > 650px) {
        .text.education > p{
            text-align: center;
            font-size: var(--text_size_medium_big_media1);
            line-height: var(--text_line_height_medium_media1);
        }
    }
    @media (width < 500px) {
        .content_container.education_page{
            gap: 0;
        }
        #AboutMe_EducationSVG{
            width: 65%;
        }
        .text.education > p{
            font-size: min(7vw, 1.4rem);
            line-height: min(7.4vw, 1.8rem);
        }
    }
    @media (width < 500px) and (height < 680px){
        #AboutMe_EducationSVG{
            width: 60%;
        }
    }

    /* PAGE 3 LANGUAGES */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .default_container.def_lang{
        overflow: hidden;
        position: relative;
        z-index: 0;
    }
    #AboutMe_BackgroundSVG{
        position: absolute;
        width: 100%;
    }
    #AboutMe_BackgroundLanguagesMobile{
        width: max(60%, 55vh);
        position: absolute;
        translate: 0 -1%;
    }
    .content_container.languages_page{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .content_container.languages_page > p {
        font-family: 'Vetrino';
        font-size: max(3.3vw, 2.5rem);
        text-align: center;
        text-wrap: nowrap;
    }
    .content_container.languages_page > p:not(p:nth-last-child(1)){
        align-self: flex-start;
    }
    .content_container.languages_page > p:nth-last-child(1){
        scale: -1 -1;
        align-self: flex-end;
    }
    .text.languages{
        position: relative;
    }
    .text.languages > p{
        font-family: 'Subjectivity_Bold';
        font-size: 3rem;
        font-size: max(2.5vw, 1.9rem);
        line-height: max(3vw, 2.4rem);
        letter-spacing: -0.5px;
        text-wrap: nowrap;
    }
    .AboutMe_LanguagesYellowHighlight{
        position: absolute;
        width: 45%;
        translate: 115% -18.5%;
        z-index: -1;
    }

    @media (height < 800px) {
        #AboutMe_BackgroundLanguagesMobile{
            width: max(60%, 70vh);
            position: absolute;
        }
    }

    /* PAGE 4(1) SKILLS TITLE */ 
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.skills_title_page{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #AboutMe_SkillsTitleSVG{
        width: max(35rem, 65%);
    }

    @media (width < 777px) {
        #AboutMe_SkillsTitleSVG{
            width: 100%;
        }
        .default_container.def_skills_title{
            height: 50vh;
        }
    }

    /* PAGE 4(2) SKILLS */ 
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.skills_page{
        display: flex;
        align-items: center;
        justify-content: center;       
    }
    .skills_box{
        display: flex;
        justify-content: center;
        width: max(40rem, 60%);
    }
    #AboutMe_Skills{
        width: 85%;
    }
    #AboutMe_Skills_Mobile{
        width: 100%;
    }

    @media (width < 777px) {
        #AboutMe_Skills{
            width: 85%;
        }
    }

    /* PAGE 5 OTHER INFOs */ 
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    .content_container.otherAbilities_page{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .content_container.otherAbilities_page > p {
        font-family: 'Misto';
        font-size: 9.85vh;
        height: 100%;
        text-align: center;
        text-wrap: nowrap;
        writing-mode: vertical-rl;
    }
    .content_container.otherAbilities_page > p:nth-last-child(1){
        scale: -1 -1;
    }
    .text.otherAbilities{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: max(2.5rem, 4vw);
    }
    .text.otherAbilities > p{
        font-family: 'Subjectivity_Medium';
        text-wrap: pretty;
        /* font-size: var(--text_size_medium);
        line-height: var(--text_line_height_medium); */
        font-size: max(1.8vw, 1.25rem);
        line-height: max(2.25vw, 1.55rem);
        position: relative;
    }

    .AboutMe_OtherPE_Rounded, .AboutMe_OtherPE_Square{
        position: absolute;
        top: 50%;
        translate: -150% -75%;
    }

    .AboutMe_OtherPE_Square{
        width: max(2.25vw, 1.5rem);
    }
    .AboutMe_OtherPE_Rounded{
        width: max(2.1vw, 1.25rem);
    }

    @media (width < 1100px) {
        .content_container.otherAbilities_page > p {
            font-size: 9vh;
        }
    }
    @media (width < 1000px) {
        .content_container.otherAbilities_page{
            flex-direction: column;
        }
        .content_container.otherAbilities_page > p {
            writing-mode: horizontal-tb;
            font-size: 9.25vw;
        }
    }
    @media (width < 650px) {
        .AboutMe_OtherPE_Rounded, .AboutMe_OtherPE_Square{
            top: 0;
            translate: 0% -125%;
        }
    }

    /* MEDIA for content container */
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