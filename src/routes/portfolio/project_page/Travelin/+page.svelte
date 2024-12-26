<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { sineInOut } from 'svelte/easing';

    import LoadingScreen from '$lib/reusable_components/Loading_screen.svelte'
    import ScrollUpButton from '$lib/reusable_components/ScrollUp_button.svelte'
    import Sticky_navbar from '$lib/reusable_components/Sticky_navbar.svelte'
    import { saveScrollY } from '$lib/saveScrollY'
    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'

    // Large works
    import Portfolio_TravelinWebsite from '$lib/svg_files/Portfolio/Portfolio_LargeWorks/Portfolio_TravelinWebsite.png'
    import Portfolio_TravelinPoster from '$lib/svg_files/Portfolio/Portfolio_LargeWorks/Portfolio_TravelinPoster.png'

    let pageLoaded = false;
    onMount(() => {
        const oldScrollY = sessionStorage.getItem("stored_scrollY")
        if (oldScrollY != null) {
            window.scrollTo({ top: oldScrollY, behavior: 'auto' })
        }
        pageLoaded = true;
    });
    beforeNavigate(({to, from}) => {
        pageLoaded = false;
        if ( from?.url.pathname == "/portfolio/project_page/mount_Fuji" && to?.url.pathname == undefined ) {
            saveScrollY.updateScrollY(y)
        } else {
            saveScrollY.updateScrollY(0)
        }
    });
    afterNavigate(() => {
        pageLoaded = true;
    });

    $: innerHeight = 0;
    $: innerWidth = 0;
    $: y = 0;
    
    let newY = [];
    $: oldY = newY[1];
    function updateY(event){
        newY.push(y);
        if(newY.length > 5) {
            newY.shift();
        }
        newY=newY;
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY={y} on:scroll={updateY} />

<main>
    {#if !pageLoaded}
        <LoadingScreen />
    {/if}

    {#if y > (innerHeight / 2) && oldY > y}
        <ScrollUpButton scrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/>
    {/if}

    {#if y < (innerHeight / 10) || oldY > y}
        <Sticky_navbar anchorLinkToLargeWork="#MountFuji" />
    {/if}

    

    <div class="default_container endless">
        <div class="content_container">
            <div class="project_image_wrapper"> <img class="project_image" src={Portfolio_TravelinPoster} alt="Portfolio_Mount_Fuji"> </div>
            
            <div class="project_name"> Travelin </div>
            <div class="project_description_wrapper">
                <p class="project_description"> 
                    Worlds greatest travel agency this is!
                </p>
            </div>
        </div>
    </div>
</main>

<style>
    :global(body){
        margin: 0;
        padding: 0;
        background-color: var(--text_color_gray90);
    }
    :global(body)::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    :global(body)::-webkit-scrollbar-track {
        background-color: var(--background_color_lightCyan);
    }
    :global(body)::-webkit-scrollbar-thumb {
        background-color: var(--background_color_alternativeLightYellow);
        border-radius: 5rem;
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
        min-height: 100svh;
        padding-block: max(12.5vh, 5rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--background_color_lightYellow);
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
        border-bottom: max(6px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
    }
    .content_container{
        width: 90%;
        display: grid;
        grid-template-columns: 1.75fr 1fr;
        place-items: center;
        gap: max(7.5vh, 2.5rem) max(2vw, 2rem);
        position: relative;
    }

    .project_name{
        /* --_text_size: max(6vw, 4.5rem); */
        --_text_size: clamp(4rem, 5vw + 0.5rem, 12.5rem);
        font-family: 'Brolimo', system-ui, sans-serif;
        font-size: var(--_text_size);
        line-height: var(--_text_size);
        text-wrap: balance;
        text-align: center;
        height: 100%;
        width: 100%;
        display: grid;
        align-items: center;
        justify-content: center;
        /* padding-block: max(5vh, 1rem); */
        position: relative;
        isolation: isolate;
    }
    .project_name::before{
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(var(--background_color_lightYellow) 65%, hsl(216, 40%, 35%) 200%);
        border: max(0.5rem, 0.5vw) hsl(204, 30%, 50%) dashed;
        z-index: -1;
        border-radius: max(1vw, 1rem);
    }

    .project_description_wrapper{
        width: 100%;
        grid-area: 2 / 1 / 3 / 3;
        display: flex;
        justify-content: center;
        border-radius: max(1vw, 1rem);
        /* padding-block: max(5vh, 1rem); */
    }
    .project_description{
        font-family: 'Subjectivity_Regular', system-ui, sans-serif;
        font-size: max(1.25vw, 1.25rem);
        line-height: max(1.65vw, 1.65rem);
        
        width: 60vw; 
        text-wrap: pretty;
        hyphens: auto;
    }
    .project_description::first-letter{
        color: hsl(182, 28%, 50%);
        font-family: 'Misto', system-ui, sans-serif;
        initial-letter: 3 2;
        padding-right: max(0.5vw, 0.5rem);
    }

    .project_image_wrapper{
        width: 100%;
        height: 100%;
        border: max(0.5rem, 0.5vw) hsl(182, 30%, 75%) solid;
        background: radial-gradient(var(--background_color_lightYellow) 60%, hsl(182, 28%, 50%) 200%);
        border-radius: max(1vw, 1rem);

        display: grid;
        place-items: center;
    }
    .project_image{
        width: 90%;
        height: 90%;
        max-height: 75svh;
        object-fit: contain;
    }

    @media (width < 1000px) {
        .content_container{
            display: grid;
            grid-template-columns: 1fr;
            gap: 5vh 0;
            width: 87.5%;
        }
        .project_image_wrapper{
            grid-area: 1 / 1 / 2 / 2;
        }

        .project_name{
            padding-block-end: max(3vh, 1.5rem);
            padding-block-start: max(4vh, 1.75rem);
            place-self: start;
        }
        .project_description_wrapper{
            grid-area: auto;
            width: 100%;
        }
        .project_description{
            width: auto;
        }
    }
</style>