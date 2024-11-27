<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { sineInOut } from 'svelte/easing';

    import LoadingScreen from '$lib/reusable_components/Loading_screen.svelte'
    import ScrollUpButton from '$lib/reusable_components/ScrollUp_button.svelte'
    import { saveScrollY } from '$lib/saveScrollY'

    // Large works
    import Portfolio_Mount_Fuji from '$lib/svg_files/Portfolio/Portfolio_LargeWorks/Portfolio_Mount_Fuji.png'

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

    <div class="default_container endless">
        <div class="content_container">
            <div class="project_image_wrapper"> <img class="project_image" src={Portfolio_Mount_Fuji} alt="Portfolio_Mount_Fuji"> </div>
            
            <div class="project_name"> Mount Fuji </div>
            <p class="project_description"> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eligendi adipisci quo 
                dolorum eos accusamus dignissimos numquam ipsa rem praesentium iste magni, impedit, aliquid dolore tempora omnis beatae deleniti voluptas.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eligendi adipisci quo 
                dolorum eos accusamus dignissimos numquam ipsa rem praesentium iste magni, impedit, aliquid dolore tempora omnis beatae deleniti voluptas.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos eligendi adipisci quo 
                dolorum eos accusamus dignissimos numquam ipsa rem praesentium iste magni, impedit, aliquid dolore tempora omnis beatae deleniti voluptas.
            </p>
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
        padding-block: 5vh;
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
        height: 87.5%;
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        place-items: center;
        gap: max(7.5vh, 2.5rem) max(2vw, 2rem);
    }

    .project_name{
        --_text_size: max(6vw, 4.5rem);
        font-family: 'Brolimo';
        font-size: var(--_text_size);
        line-height: var(--_text_size);
        text-wrap: balance;
        padding-block: max(5vh, 1rem);
    }
    .project_description{
        font-family: 'Subjectivity_Regular';
        font-size: max(1.25vw, 1.25rem);
        line-height: max(1.65vw, 1.65rem);
        grid-area: 2 / 1 / 3 / 3;
        width: 75%;
        /* padding-block: max(5vh, 1rem); */
        /* padding-inline: 15vw; */
        text-wrap: pretty;
        hyphens: auto;
    }
    .project_image_wrapper{
        width: 100%;
        height: 100%;
        border: max(6px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        background: radial-gradient(var(--background_color_lightYellow) 65%, var(--background_color_alternativeLightYellow) 125%);
        /* mask: radial-gradient(var(--background_color_lightYellow) 50%, black); */
        border-radius: max(1vw, 1rem);

        display: grid;
        place-items: center;
    }
    .project_image{
        width: 100%;
        max-height: 75svh;
        object-fit: contain;
        /* z-index: 100; */
    }

    @media (width < 1000px) {
        .content_container{
            width: 85%;
            height: 87.5%;
            display: grid;
            grid-template-columns: 1fr;
            gap: 3vh 0;
        }
        .project_image_wrapper{
            grid-area: 1 / 1 / 2 / 2;
        }

        .project_name{
            padding-block-end: 0;
            padding-block-start: max(4vh, 1.25rem);
            place-self: start;
        }
        .project_description{
            grid-area: auto;
            width: 100%;
        }
    }
</style>