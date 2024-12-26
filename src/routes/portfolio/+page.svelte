<script>
    import Navbar from '$lib/reusable_components/Navbar.svelte'
    import Header from '$lib/reusable_components/Header.svelte'
    import Footer from '$lib/reusable_components/Footer.svelte'
    import LoadingScreen from '$lib/reusable_components/Loading_screen.svelte'
    import ScrollUpButton from '$lib/reusable_components/ScrollUp_button.svelte'
    import { saveScrollY } from '$lib/saveScrollY'
    import '$lib/styles_and_fonts/fonts.css'
    import '$lib/styles_and_fonts/styles.css'

    import WorkPresent from '$lib/reusable_components/Portfolio_work_item.svelte'
    import WorkPresentAlt from '$lib/reusable_components/Portfolio_work_item_alt.svelte'
    // import WorkItemDetailed from '$lib/reusable_components/+portfolio_item_detailed.svelte'
    import Portfolio_TitleDecor from '$lib/svg_files/Portfolio/Portfolio_TitleDecor.svg'

    // image to left
    import Portfolio_workPreviewElement_ART from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_ART.svg'
    import Portfolio_workPreviewElement_Omic from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Omic.svg'
    import Portfolio_workPreviewElement_Roe from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Roe.svg'
    import Portfolio_workPreviewElement_Architect from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Architect.svg'
    import Portfolio_workPreviewElement_Artsgone from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Artsgone.svg'
    import Portfolio_workPreviewElement_LXY from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_LXY.svg'
    import Portfolio_workPreviewElement_Lexi_alternate from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi_alternate.svg'
    import Portfolio_workPreviewElement_Museum from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Museum.svg'
    import Portfolio_workPreviewElement_Nameless from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Nameless.svg'
    import Portfolio_workPreviewElement_Bena from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Bena.svg'
    import New_LOGO_AR from '$lib/svg_files/New_LOGO_AR.svg'
    // image to right
    import Portfolio_workPreviewElement_Logo_Ww from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Logo_Ww.svg'
    import Portfolio_workPreviewElement_Ww_additional from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Ww_additional.svg'
    import Portfolio_workPreviewElement_Logo_Tt from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Logo_Tt.svg'
    import Portfolio_workPreviewElement_Lexi from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi.svg'
    import Portfolio_workPreviewElement_Lexi_V2 from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Lexi_V2.svg'
    import Portfolio_workPreviewElement_LXY_alt from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_LXY_alt.svg'
    import Portfolio_workPreviewElement_Anata from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Anata.svg'
    import Portfolio_workPreviewElement_MrGummy from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_MrGummy.svg'
    import Portfolio_workPreviewElement_Dd_NEW from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Dd_NEW.svg'
    import Portfolio_workPreviewElement_Travelin_Logo from '$lib/svg_files/Portfolio/Portfolio_Works/Portfolio_workPreviewElement_Travelin_Logo.svg'
    
    // Large works
    import Portfolio_Mount_Fuji from '$lib/svg_files/Portfolio/Portfolio_LargeWorks/Portfolio_Mount_Fuji.png'
    import Portfolio_TimerForWork from '$lib/svg_files/Portfolio/Portfolio_LargeWorks/Portfolio_TimerForWork.png'
    import Portfolio_Postttrrr from '$lib/svg_files/Portfolio/Portfolio_LargeWorks/Portfolio_Postttrrr_LowRes.png'
    import Portfolio_TravelinWebsite from '$lib/svg_files/Portfolio/Portfolio_LargeWorks/Portfolio_TravelinWebsite.png'
    import Portfolio_TravelinPoster from '$lib/svg_files/Portfolio/Portfolio_LargeWorks/Portfolio_TravelinPoster.png'
    import Portfolio_FakePoster_LowRes from '$lib/svg_files/Portfolio/Portfolio_LargeWorks/Portfolio_FakePoster_LowRes.png'

    import Portfolio_WorksPreviewDecor from '$lib/svg_files/Portfolio/Portfolio_WorksPreviewDecor.svg'
    import Global_closeIcon from '$lib/svg_files/GlobalSVGs/Global_closeIcon.svg'
    import scrollLeftAndRightButtonArrow from '$lib/svg_files/GlobalSVGs/Global_arrowBack.svg'

    import { onMount } from "svelte";
    import { fade, fly, scale } from 'svelte/transition';
    import { sineInOut } from 'svelte/easing';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    
    let works_preview_grid_bind;
    let pageLoaded = false;
    onMount(() => {
        const oldScrollY = sessionStorage.getItem("stored_scrollY")
        if (oldScrollY != null) {
            svelte_main_element.scrollTo({ top: oldScrollY, behavior: 'auto' })
        }
        pageLoaded = true;
        retrieveIntersectedElementsToSS()
        largeWork_preview_box_wrapper_WIDTH = largeWork_preview_box_wrapper_WIDTH
    });
    beforeNavigate(({to, from}) => {
        pageLoaded = false;
        if ( from?.url.pathname == "/portfolio" && to?.url.pathname == undefined ) {
            saveScrollY.updateScrollY(svelte_main_element.scrollTop)
        } else {
            saveScrollY.updateScrollY(0)
        }
        saveIntersectedElementsToSS()
    });

    afterNavigate(() => {
        pageLoaded = true;
    });
    
    $: innerHeight = 0;
    $: y = 0;
    let svelte_main_element;
    let workPresent_wrapper_bind;
    // let workPresent_wrapper_bind_height = 0;
    
    let newY = [];
    $: oldY = newY[1];
    function updateY(event){
        y = svelte_main_element.scrollTop;
        newY.push(y);
        if(newY.length > 5) {
            newY.shift();
        }
        newY=newY;
    }
    
    let portfolio_loadingScreenShow = false;
    let workPresent_Visibility = 'hidden';

    function openInLargeList(idOfElement){
        const portfolio_works = document.querySelectorAll(".wep_box")
        portfolio_works.forEach( (work, workId) => {
            work.addEventListener("click", (e) => {
                portfolio_loadingScreenShow = true;
                workPresent_Visibility = 'visible';
            })
        })
        
        const interval = setInterval(() => {
			portfolio_loadingScreenShow = false
		}, 500);
		return () => clearInterval(interval);
    }
    function closeInLargeList(){
        portfolio_loadingScreenShow = false;
        workPresent_Visibility = 'hidden';
    }
    // function hide_LoadingScreen(){
    //     if (portfolio_loadingScreenShow = true) {
    //         portfolio_loadingScreenShow = false;
    //     }
    // }

    let amountOfChildElementsList = [];
    function checkForAmountOfChildren() {
        const lW_preview_boxes = document.querySelectorAll(".largeWork_preview_box")
        lW_preview_boxes.forEach( (box, boxId) => {
            const amountOfChildren = box.querySelectorAll(".largeWork_element_preview")
            if (amountOfChildren.length > 1) {
                box.classList.add("moreThanOneChild")
                amountOfChildElementsList.splice(boxId, 1, amountOfChildren.length)
            }
        })
    }

    let largeWork_preview_box_wrapper_WIDTH = 0

    function boxScroll() {
        const largeWorkImages = document.querySelectorAll(".largeWork_preview_box")
        const buttons_left = document.querySelectorAll(".scrollLeftAndRightButton.left")
        const buttons_right = document.querySelectorAll(".scrollLeftAndRightButton.right")
        const listLength = largeWorkImages.length
        var scrollElementsIndexes = new Array(listLength)
        
        let amountOfScrolledImages = 0
        let numberOfChildElements = 0
        
        buttons_right.forEach( (largeWorkButton, largeWorkButtonId) => {
            largeWorkButton.addEventListener("click", (e) => {
                largeWorkImages.forEach( (largeWork, largeWorkId) => {
                    if (largeWorkId === largeWorkButtonId) {

                        numberOfChildElements = amountOfChildElementsList.at(largeWorkId)
                        // largeWork.scrollBy({ left: largeWork_preview_box_wrapper_WIDTH, behavior: "smooth" })
                        amountOfScrolledImages = scrollElementsIndexes.at(largeWorkId) || 0
                        if (amountOfScrolledImages < numberOfChildElements) {
                            amountOfScrolledImages++
                        }
                        
                        scrollElementsIndexes.splice(largeWorkId, 1, amountOfScrolledImages)
                        // console.log("List:", scrollElementsIndexes)

                        largeWork.querySelectorAll(".largeWork_element_preview").forEach( (element, elementId) => {
                            if (elementId == amountOfScrolledImages) {
                                element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
                            }
                        })
                        
                        // console.log("Scroll:", largeWork.scrollLeft)
                        // if ((largeWork.scrollLeft + largeWork_preview_box_wrapper_WIDTH * 2) >= largeWork.scrollWidth) {
                        //     largeWorkButton.classList.add("visually_hidden")
                        // }
                        if (amountOfScrolledImages == numberOfChildElements - 1) {
                            largeWorkButton.classList.add("visually_hidden") 
                        }
                        buttons_left.forEach( (leftButton, leftButtonId) => {
                            if (leftButtonId === largeWorkButtonId) {
                                leftButton.classList.remove("visually_hidden")
                            }
                        })
                    }
                })
            })

        })
        buttons_left.forEach( (largeWorkButton, largeWorkButtonId) => {

            if (amountOfScrolledImages == 0) {
                largeWorkButton.classList.add("visually_hidden")
            }
            largeWorkButton.addEventListener("click", (e) => {
                largeWorkImages.forEach( (largeWork, largeWorkId) => {
                    if (largeWorkId === largeWorkButtonId) {
                        // largeWork.scrollBy({ left: -largeWork_preview_box_wrapper_WIDTH, behavior: "smooth" })
                        numberOfChildElements = amountOfChildElementsList.at(largeWorkId)

                        amountOfScrolledImages = scrollElementsIndexes.at(largeWorkId) || 0
                        if (amountOfScrolledImages > 0) {
                            amountOfScrolledImages--
                        }
                        
                        scrollElementsIndexes.splice(largeWorkId, 1, amountOfScrolledImages)
                        // console.log("List:", scrollElementsIndexes)

                        largeWork.querySelectorAll(".largeWork_element_preview").forEach( (element, elementId) => {
                            if (elementId == amountOfScrolledImages) {
                                element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
                            }
                        })
                        
                        // if ((largeWork.scrollLeft - (largeWork.scrollWidth / numberOfChildElements) * 2) <= 0) {
                        //     largeWorkButton.classList.add("visually_hidden") 
                        // }
                        if (amountOfScrolledImages == 0) {
                            largeWorkButton.classList.add("visually_hidden") 
                        }
                        buttons_right.forEach( (rightButton, rightButtonId) => {
                            if (rightButtonId === largeWorkButtonId) {
                                rightButton.classList.remove("visually_hidden")
                            }
                        })
                    }
                })
            })

        })
        
    }

    let intersectingElementIndex
    let listOfIntersectedElements = []
    $: someshit = 0;

    function ifExistsInArray(idOfElement) {
        if (listOfIntersectedElements.includes(idOfElement)) {
            return true
        }
        return false
    }

    function observeElement() {
        const default_containers = document.querySelectorAll(".classForIntersecObserver")
        const listLenght = default_containers.length
        let amountOfElementsObserved = 0;

        const intersecObserver = new IntersectionObserver( entries => {
        entries.forEach( entry => {
            intersectingElementIndex = entry.target.containerIndex

            if (entry.isIntersecting) {
                listOfIntersectedElements.push(intersectingElementIndex)
                someshit++
                amountOfElementsObserved++
                intersecObserver.unobserve(entry.target)
                if (amountOfElementsObserved == listLenght) {
                    intersecObserver.disconnect()
                    // console.log("DISCONNECTED")
                }
            }
        })
        },
            { 
                root: document.querySelector(".workPresent_wrapper"),
                threshold: 0.1,
                rootMargin: "0px",
            }
        )
        
        default_containers.forEach( (container, indexOfContainer) => {
            container.containerIndex = indexOfContainer
            intersecObserver.observe(container)
        })
    }
// ---------------------------------------------------------------------------------------------------------
    let intersectingElementIndex_DF
    let listOfIntersectedElements_DF = []
    $: someshit_DF = 0;

    function saveIntersectedElementsToSS() {
        listOfIntersectedElements_DF.forEach( intersectedItem => {
            if (intersectedItem == 24) {
                // sessionStorage.setItem('intersectedElementsList', JSON.stringify(intersectedItem))
                sessionStorage.setItem('intersectedElementsList', intersectedItem)
            }
        })
        
    }
    function retrieveIntersectedElementsToSS() {
        // let savedIntersectedElements = JSON.parse(sessionStorage.getItem('intersectedElementsList'))
        let savedIntersectedElements = JSON.parse(sessionStorage.getItem('intersectedElementsList'))
        listOfIntersectedElements_DF = listOfIntersectedElements_DF.concat(savedIntersectedElements)
        // console.log(listOfIntersectedElements_DF)
        someshit_DF++
    }

    function ifExistsInArray_DF(idOfElement) {
        if (listOfIntersectedElements_DF.includes(idOfElement)) {
            return true
        }
        return false
    }
    function observeDefaultCont() {
        // const default_containers = document.querySelectorAll(".default_container")
        const default_containers = document.querySelectorAll(".forInsObs")
        const listLenght = default_containers.length
        let amountOfElementsObserved = 0;

        const intersecObserver = new IntersectionObserver( entries => {
        entries.forEach( entry => {
            intersectingElementIndex_DF = entry.target.containerIndex

            if (entry.isIntersecting) {
                if (!listOfIntersectedElements_DF.includes(intersectingElementIndex_DF)) {
                    listOfIntersectedElements_DF.push(intersectingElementIndex_DF)
                }
                
                someshit_DF++
                amountOfElementsObserved++
                intersecObserver.unobserve(entry.target)
                if (amountOfElementsObserved == listLenght) {
                    intersecObserver.disconnect()
                    // console.log("DISCONNECTED")
                }
            }
        })
        },
            {
                root: document.querySelector(".svelte_main"),
                threshold: 0.1,
                rootMargin: "0px",
            }
        )
        
        default_containers.forEach( (container, indexOfContainer) => {
            container.containerIndex = indexOfContainer
            intersecObserver.observe(container)
        })
    }
</script>

<svelte:window bind:innerHeight />

<main class="svelte_main" on:scroll={updateY} bind:this={svelte_main_element}>
    {#if !pageLoaded}
        <LoadingScreen />
    {/if}
    {#if portfolio_loadingScreenShow}
        <LoadingScreen fadeDuration=50 fadeDelay=50/>
    {/if}

    {#if y > (innerHeight / 1.1) && oldY > y}
        <ScrollUpButton scrollToTop={() => svelte_main_element.scrollTo({ top: 0, behavior: 'smooth' })}/>
    {/if}

    <div class="default_container cyan">
        <Header title_Decor_ID = "portfolio"/>
        <div class="content_container title_page">
            {#if pageLoaded}
                <div class="title_page_name" transition:fade={{ delay: 200, duration: 400, easing: sineInOut}}>
                    <div class="title_name darkgrayText">Portfolio</div>
                    <img id="Portfolio_TitleDecor" src={Portfolio_TitleDecor} alt="Portfolio_TitleDecor">
                </div>
            {/if}
            <Navbar firstLink="Art's page" secondLink="About me" thirdLink="Contact" 
                    linkAddress1="" linkAddress2="about_me" linkAddress3="contact"/>
        </div>
    </div>
    <div class="default_container linksToSections">
        <div class="content_container sections_links">
            <a href="#logosSection" class="anchorLink_toSections"> <span>01.</span> portfolio - logos</a>
            <a href="#largeWorksSection" class="anchorLink_toSections"> <span>02.</span> portfolio - posters and banners</a>
        </div>
    </div>
    <div class="default_container endless" id="logosSection">
        <div class="content_container work_summary_page" >
            <p class="text_corner_previewOfWorks tcp1">portfolio <br> - logos</p>
            <p class="text_corner_previewOfWorks tcp2">portfolio <br> - logos</p>
            <div class="works_preview_grid" bind:this={works_preview_grid_bind} use:openInLargeList use:observeDefaultCont>
                <!-- data-sveltekit-preload-data="tap" -->
                
                <a href="#ART" class="work_element_preview_box wep_box forInsObs top rounded">
                    {#if ifExistsInArray_DF(0) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_ART} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 0, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                    <!-- blank_________________________________________________ -->
                        <div class="work_element_preview_box blank mobileBlank"></div>
                    <!-- blank_________________________________________________ -->
                <a href="#LXY" class="work_element_preview_box wep_box forInsObs top mobile_rounded">
                    {#if ifExistsInArray_DF(1) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_LXY} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 100, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#Architect" class="work_element_preview_box wep_box forInsObs top rounded mobile_left">
                    {#if ifExistsInArray_DF(2) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Architect} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 200, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                    <!-- blank_________________________________________________ -->
                        <div class="work_element_preview_box blank"></div>
                    <!-- blank_________________________________________________ -->
                
                
                <div class="work_element_preview_box blank">
                    <img src={Portfolio_WorksPreviewDecor} alt="" class="work_element_preview">
                </div>

                <a href="#Artsgone" class="work_element_preview_box wep_box forInsObs bottom rounded">
                    {#if ifExistsInArray_DF(3) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Artsgone} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 0, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#Omic" class="work_element_preview_box wep_box forInsObs bottom mobile_rounded mobile_left">
                    {#if ifExistsInArray_DF(4) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Omic} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 100, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#Lexi2" class="work_element_preview_box wep_box forInsObs bottom rounded mobile_rounded">
                    {#if ifExistsInArray_DF(5) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Lexi_alternate} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 200, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                
                    <!-- next couple_______________________________________________________________________________________________________________________________________ -->

                
                <a href="#Anata" class="work_element_preview_box wep_box forInsObs top rounded mobile_left">
                    {#if ifExistsInArray_DF(6) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Anata} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 0, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#Bena" class="work_element_preview_box wep_box forInsObs top">
                    {#if ifExistsInArray_DF(7) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Bena} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 100, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#MR. Gummy" class="work_element_preview_box wep_box forInsObs top rounded mobile_left mobile_rounded">
                    {#if ifExistsInArray_DF(8) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_MrGummy} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 200, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>

                <div class="work_element_preview_box blank">
                    <img src={Portfolio_WorksPreviewDecor} alt="" class="work_element_preview">
                </div>

                    <!-- blank_________________________________________________ -->
                        <div class="work_element_preview_box blank"> <img src={Portfolio_WorksPreviewDecor} alt="" class="work_element_preview"> </div>
                    <!-- blank_________________________________________________ -->
                <a href="#LXY2" class="work_element_preview_box wep_box forInsObs bottom rounded mobile_rounded">
                    {#if ifExistsInArray_DF(9) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_LXY_alt} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 0, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#Antic Museum" class="work_element_preview_box wep_box forInsObs bottom mobile_left">
                    {#if ifExistsInArray_DF(10) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Museum} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 100, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#Nameless sadas" class="work_element_preview_box wep_box forInsObs bottom mobile_left rounded mobile_rounded">
                    {#if ifExistsInArray_DF(11) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Nameless} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 200, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>

                <!-- next couple_______________________________________________________________________________________________________________________________________ -->

                <a href="#Roe" class="work_element_preview_box wep_box forInsObs top rounded mobile_left">
                    {#if ifExistsInArray_DF(12) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Roe} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 0, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#Wappa" class="work_element_preview_box wep_box forInsObs top">
                    {#if ifExistsInArray_DF(13) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Logo_Ww} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 100, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#W(in) logo" class="work_element_preview_box wep_box forInsObs top rounded mobile_left mobile_rounded">
                    {#if ifExistsInArray_DF(14) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Ww_additional} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 200, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>

                <div class="work_element_preview_box blank">
                    <img src={Portfolio_WorksPreviewDecor} alt="" class="work_element_preview">
                </div>

                    <!-- blank_________________________________________________ -->
                        <div class="work_element_preview_box blank"> <img src={Portfolio_WorksPreviewDecor} alt="" class="work_element_preview"> </div>
                    <!-- blank_________________________________________________ -->
                <a href="#Toreno" class="work_element_preview_box wep_box forInsObs bottom rounded mobile_rounded">
                    {#if ifExistsInArray_DF(15) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Logo_Tt} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 0, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#Lanobi" class="work_element_preview_box wep_box forInsObs bottom mobile_left">
                    {#if ifExistsInArray_DF(16) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Lexi_V2} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 100, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#Dajy" class="work_element_preview_box wep_box forInsObs bottom mobile_left rounded mobile_rounded">
                    {#if ifExistsInArray_DF(17) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Dd_NEW} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 200, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>

                <!-- next couple_______________________________________________________________________________________________________________________________________ -->

                <a href="#Travelin" class="work_element_preview_box wep_box forInsObs top rounded mobile_left">
                    {#if ifExistsInArray_DF(18) && someshit_DF > 0}
                        <img src={Portfolio_workPreviewElement_Travelin_Logo} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 0, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#ART" class="work_element_preview_box wep_box forInsObs top">
                    {#if ifExistsInArray_DF(19) && someshit_DF > 0}
                        <img src={Portfolio_WorksPreviewDecor} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 100, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#ART" class="work_element_preview_box wep_box forInsObs top rounded mobile_left mobile_rounded">
                    {#if ifExistsInArray_DF(20) && someshit_DF > 0}
                        <img src={Portfolio_WorksPreviewDecor} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 200, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>

                <div class="work_element_preview_box blank">
                    <img src={Portfolio_WorksPreviewDecor} alt="" class="work_element_preview">
                </div>

                    <!-- blank_________________________________________________ -->
                        <div class="work_element_preview_box blank"></div>
                    <!-- blank_________________________________________________ -->
                <a href="#ART" class="work_element_preview_box wep_box forInsObs bottom rounded mobile_rounded">
                    {#if ifExistsInArray_DF(21) && someshit_DF > 0}
                        <img src={Portfolio_WorksPreviewDecor} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 0, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                <a href="#ART" class="work_element_preview_box wep_box forInsObs bottom mobile_left">
                    {#if ifExistsInArray_DF(22) && someshit_DF > 0}
                        <img src={Portfolio_WorksPreviewDecor} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 100, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
                    <!-- blank_________________________________________________ -->
                        <div class="work_element_preview_box blank mobileBlank"></div>
                    <!-- blank_________________________________________________ -->
                <a href="#ART" class="work_element_preview_box wep_box forInsObs bottom mobile_left rounded mobile_rounded">
                    {#if ifExistsInArray_DF(23) && someshit_DF > 0}
                        <img src={Portfolio_WorksPreviewDecor} alt="Portfolio_workPreviewElement_ART" class="work_element_preview" transition:fade={{ delay: 200, duration: 250, easing: sineInOut}}>
                    {/if}
                </a>
            </div>
        </div>
    </div>
    <div class="default_container endless forInsObs" id="largeWorksSection" use:observeDefaultCont>
        {#if ifExistsInArray_DF(24) && someshit_DF > 0}
            <div class="content_container work_summary_page largeWorks" transition:fade={{ delay: 0, duration: 500, easing: sineInOut}}>
                <p class="largeWorks_upperText">Portfolio - banners</p>
                <div class="largeWorks_preview_grid" use:boxScroll use:checkForAmountOfChildren>
                    <div class="largeWork_preview_box_wrapper" id="Travelin">
                        <button class="scrollLeftAndRightButton left"> <img src={scrollLeftAndRightButtonArrow} alt="scrollLeftAndRightButtonArrow" class="largeWork_scrollButton"> </button>
                        <button class="scrollLeftAndRightButton right"> <img src={scrollLeftAndRightButtonArrow} alt="scrollLeftAndRightButtonArrow" class="largeWork_scrollButton"> </button>
                        <a href="/portfolio/project_page/Travelin" class="largeWork_preview_box" bind:offsetWidth={largeWork_preview_box_wrapper_WIDTH}>
                            <img class="largeWork_element_preview" src={Portfolio_TravelinPoster} alt="Portfolio_Postttrrr">
                            <img class="largeWork_element_preview" src={Portfolio_TravelinWebsite} alt="Portfolio_TravelinWebsite">
                        </a>
                    </div>
                    <div class="largeWork_preview_box_wrapper" id="MountFuji">
                        <button class="scrollLeftAndRightButton left"> <img src={scrollLeftAndRightButtonArrow} alt="scrollLeftAndRightButtonArrow" class="largeWork_scrollButton"> </button>
                        <button class="scrollLeftAndRightButton right"> <img src={scrollLeftAndRightButtonArrow} alt="scrollLeftAndRightButtonArrow" class="largeWork_scrollButton"> </button>
                        <a href="/portfolio/project_page/mount_Fuji" class="largeWork_preview_box">
                            <img class="largeWork_element_preview" src={Portfolio_Mount_Fuji} alt="Portfolio_Mount_Fuji">
                            <img class="largeWork_element_preview" src={Portfolio_Mount_Fuji} alt="Portfolio_Mount_Fuji">
                        </a>
                    </div>
                    <div class="largeWork_preview_box_wrapper" id="TimerForWork">
                        <button class="scrollLeftAndRightButton left"> <img src={scrollLeftAndRightButtonArrow} alt="scrollLeftAndRightButtonArrow" class="largeWork_scrollButton"> </button>
                        <button class="scrollLeftAndRightButton right"> <img src={scrollLeftAndRightButtonArrow} alt="scrollLeftAndRightButtonArrow" class="largeWork_scrollButton"> </button>
                        <a href="/portfolio/project_page/mount_Fuji" class="largeWork_preview_box">
                            <img class="largeWork_element_preview" src={Portfolio_TimerForWork} alt="Portfolio_TimerForWork">
                            <img class="largeWork_element_preview" src={Portfolio_TimerForWork} alt="Portfolio_TimerForWork">
                        </a>
                    </div>
                    <div class="largeWork_preview_box_wrapper" id="Postrrr">
                        <button class="scrollLeftAndRightButton left"> <img src={scrollLeftAndRightButtonArrow} alt="scrollLeftAndRightButtonArrow" class="largeWork_scrollButton"> </button>
                        <button class="scrollLeftAndRightButton right"> <img src={scrollLeftAndRightButtonArrow} alt="scrollLeftAndRightButtonArrow" class="largeWork_scrollButton"> </button>
                        <a href="/portfolio/project_page/mount_Fuji" class="largeWork_preview_box">
                            <img class="largeWork_element_preview" src={Portfolio_Postttrrr} alt="Portfolio_Postttrrr">
                        </a>
                    </div>
                    <div class="largeWork_preview_box_wrapper" id="IDK">
                        <a href="/portfolio/project_page/mount_Fuji" class="largeWork_preview_box">
                            <img class="largeWork_element_preview" src={Portfolio_TravelinWebsite} alt="Portfolio_TravelinWebsite">
                        </a>
                    </div>
                    <div class="largeWork_preview_box_wrapper" id="UsefullPoster">
                        <a href="/portfolio/project_page/mount_Fuji" class="largeWork_preview_box">
                            <img class="largeWork_element_preview" src={Portfolio_FakePoster_LowRes} alt="Portfolio_FakePoster_LowRes">
                        </a>
                    </div>
                </div>
            </div>
        {:else}
            <img class="largeWork_element_preview" src={Portfolio_WorksPreviewDecor} alt="Portfolio_TravelinWebsite">
        {/if} 
    </div>

    {#if workPresent_Visibility == 'visible'}
        <button in:fly={{ delay: 300, duration: 250, easing: sineInOut, y: '-100'}} out:scale={{ delay: 0, duration: 250, start: 0.75, easing: sineInOut }} class="close_button" on:click={closeInLargeList}><img src={Global_closeIcon} class="Global_closeIcon" alt="X"> </button>
    {/if}
    <!-- on:introend={() => (portfolio_loadingScreenShow = false)}  -->
    <!-- on:introstart={() => (portfolio_loadingScreenShow = true)} on:scrollend={hide_LoadingScreen} -->
    {#if workPresent_Visibility == 'visible'}
        <div class="workPresent_wrapper" use:observeElement bind:this={workPresent_wrapper_bind} in:scale={{ delay: 0, duration: 200, start: 0.85, easing: sineInOut }} out:fade={{ delay: 0, duration: 200, easing: sineInOut}} >
            
            <div id="ART" class="classForIntersecObserver">
                {#if ifExistsInArray(0) && someshit > 0}
                    <WorkPresent workElementImage={Portfolio_workPreviewElement_ART} workElementTitle="ART" workElementText="" > &nbsp&nbsp&nbsp&nbsp&nbsp The logo features a sleek, minimalist design with clean lines and simple shapes.
                        <br><br> &nbsp&nbsp&nbsp&nbsp&nbsp The museum's name is made in bold, uppercase letters, with the word ART emphasized in a contrasting color.  
                        <br> &nbsp&nbsp&nbsp&nbsp&nbsp It is made up of overlapping shapes in a range of vibrant colors, suggesting the museum's commitment to showcasing a diverse array of artwork and artists. The symbol also evokes a sense of movement and fluidity, hinting at the dynamic and ever-evolving nature of contemporary art.  
                        <br><br> &nbsp&nbsp&nbsp&nbsp&nbsp Overall, the logo conveys a sense of modernity, creativity, and inclusivity, positioning the museum as a cutting-edge institution that welcomes artists and audiences from all backgrounds.
                    </WorkPresent>
                {/if}
            </div>
                
            <div id="Dajy" class="classForIntersecObserver">
                {#if ifExistsInArray(1) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Dd_NEW} workElementTitle="Dajy" workElementText="Some logo that has no use yet..." />
                {/if}
            </div>

            <div id="Roe" class="classForIntersecObserver">
                {#if ifExistsInArray(2) && someshit > 0}
                    <WorkPresent workElementImage={Portfolio_workPreviewElement_Roe} workElementTitle="Roe" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Wappa" class="classForIntersecObserver">
                {#if ifExistsInArray(3) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Logo_Ww} workElementTitle="Wappa" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>
            
            <div id="Architect" class="classForIntersecObserver">
                {#if ifExistsInArray(4) && someshit > 0}
                    <WorkPresent workElementImage={Portfolio_workPreviewElement_Architect} workElementTitle="Architect" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Toreno" class="classForIntersecObserver">
                {#if ifExistsInArray(5) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Logo_Tt} workElementTitle="Toreno" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Artsgone" class="classForIntersecObserver">
                {#if ifExistsInArray(6) && someshit > 0}
                    <WorkPresent workElementImage={Portfolio_workPreviewElement_Artsgone} workElementTitle="Artsgone" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Lexi" class="classForIntersecObserver">
                {#if ifExistsInArray(7) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Lexi} workElementTitle="Lexi" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="LXY" class="classForIntersecObserver">
                {#if ifExistsInArray(8) && someshit > 0}
                    <WorkPresent workElementImage={Portfolio_workPreviewElement_LXY} workElementTitle="LXY" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Lanobi" class="classForIntersecObserver">
                {#if ifExistsInArray(9) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Lexi_V2} workElementTitle="Lanobi" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Lexi2" class="classForIntersecObserver">
                {#if ifExistsInArray(10) && someshit > 0}
                    <WorkPresent workElementImage={Portfolio_workPreviewElement_Lexi_alternate} workElementTitle="Lexi2" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="LXY2" class="classForIntersecObserver">
                {#if ifExistsInArray(11) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_LXY_alt} workElementTitle="LXY2" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Antic Museum" class="classForIntersecObserver">
                {#if ifExistsInArray(12) && someshit > 0}
                    <WorkPresent workElementImage={Portfolio_workPreviewElement_Museum} workElementTitle="Antic Museum" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Anata" class="classForIntersecObserver">
                {#if ifExistsInArray(13) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Anata} workElementTitle="Anata" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="A/R" class="classForIntersecObserver">
                {#if ifExistsInArray(14) && someshit > 0}
                    <WorkPresent workElementImage={New_LOGO_AR} workElementTitle="A/R" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Omic" class="classForIntersecObserver">
                {#if ifExistsInArray(15) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Omic} workElementTitle="Omic" workElementText=""> &nbsp&nbsp&nbsp&nbsp&nbsp The logo for the imaginary brand Omic is designed in a modern and minimalist style. The main element of the logo is a large orange letter "O." It is bright and bold, catching the eye and symbolizing energy and creativity. <br> &nbsp&nbsp&nbsp&nbsp&nbsp Below the letter "O" the word "Omic" is written in a clean black font. This contrast between the vibrant orange letter and the black text creates a dynamic and memorable image that is easily recognizable and associated with the brand. The logo is ideal for a company looking to stand out and make a lasting impression on its audience. </WorkPresentAlt>
                {/if}
            </div>

            <div id="Nameless sadas" class="classForIntersecObserver">
                {#if ifExistsInArray(16) && someshit > 0}
                    <WorkPresent workElementImage={Portfolio_workPreviewElement_Nameless} workElementTitle="Nameless sadas" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="MR. Gummy" class="classForIntersecObserver">
                {#if ifExistsInArray(17) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_MrGummy} workElementTitle="MR. Gummy" workElementText="This piece of art is a piece of ... art"/>
                {/if}
            </div>

            <div id="Bena" class="classForIntersecObserver">
                {#if ifExistsInArray(18) && someshit > 0}
                    <WorkPresent workElementImage={Portfolio_workPreviewElement_Bena} workElementTitle="Bena" workElementText=""> &nbsp&nbsp&nbsp&nbsp&nbsp The "Bena" logo features a whimsical and friendly design, capturing the essence of a specialty shop for dogs and cats. It blends playful elements with a touch of elegance, reflecting the variety of high-quality clothing, toys, and accessories offered. The logo's warm and inviting colors emphasize the joy and care Bena brings to pet owners and their furry companions. </WorkPresent>
                {/if}
            </div>

            <div id="W(in) logo" class="classForIntersecObserver">
                {#if ifExistsInArray(19) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Ww_additional} workElementTitle="W(in) logo" workElementText="This piece of art is a piece of W"/>
                {/if}
            </div>
            <div id="Travelin" class="classForIntersecObserver">
                {#if ifExistsInArray(20) && someshit > 0}
                    <WorkPresentAlt workElementImage={Portfolio_workPreviewElement_Travelin_Logo} workElementTitle="Travelin" workElementText="This piece of art is a piece of travel"/>
                {/if}
            </div>
        
        </div>
    {/if}
    
    
    
        <Footer firstLink="Art's page" secondLink="About me" thirdLink="Contact" 
    linkAddress1="" linkAddress2="about_me" linkAddress3="contact"
    titleName = "Portfolio" footer_Decor_ID = "portfolio" snap_align="none"/>
</main>

<style>
    :global(body){
        margin: 0;
        padding: 0;
        background-color: var(--text_color_gray90);
    }
    main.svelte_main{
        overflow-y: scroll;
        height: 100dvh;
        scroll-snap-type: none;
    }
    :global(body)::-webkit-scrollbar {
        display: none;
    }
    main.svelte_main::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    main.svelte_main::-webkit-scrollbar-track {
        background-color: var(--background_color_lightCyan);
    }
    main.svelte_main::-webkit-scrollbar-thumb {
        background-color: var(--background_color_alternativeLightYellow);
        border-radius: 5rem;
    }
    @media (width < 800px){
        /* main.svelte_main{
            scroll-snap-type: none;
        } */
        main.svelte_main::-webkit-scrollbar {
            display: none;
        }
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
        border-bottom: max(6px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
        position: relative;
        z-index: 0;
        scroll-snap-align: center;
        scroll-snap-stop: always;
    }
    .endless{
        height: auto;
        min-height: 100vh;
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
        background: radial-gradient(var(--background_color_lightCyan) 55%, var(--background_color_lightCyanSaturated) 125%);
        box-shadow: none;
        border-bottom: none;
    }
    .classForIntersecObserver{
        /* background-color: var(--background_color_lightCyan); */
        scroll-snap-align: center;
        scroll-snap-stop: always;
        background-color: var(--background_color_lightYellow);
        box-shadow: inset 0 0 5rem var(--background_color_alternativeLightYellow);
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
        position: relative;
    }
    #Portfolio_TitleDecor{
        width: var(--element_size_title_decor_portfolio);
        position: absolute;
        translate: 0 2%;
    }
    .title_name{
        font-size: max(15vw, 6.25rem);
        font-family: 'Brolimo', system-ui, sans-serif;
        z-index: 999;
    }

    @media (width < 942px){
        #Portfolio_TitleDecor{
            width: 65%;
        }
        .title_name{
            font-size: max(18vw, 6.5rem);
        }
    }
    @media (width < 500px){
        .content_container.title_page{
            justify-content: space-evenly;
            gap: 8.5vh;
        }
        #Portfolio_TitleDecor{
            width: 95%;
            translate: 0% 7%;
        }
        .title_name{
            visibility: hidden;
            position: relative;
            word-break: break-all;
            text-wrap: balance;
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


    .default_container.linksToSections{
        height: 30vh;
        min-height: 20rem;
    }
    .content_container.sections_links{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 1fr;
        place-items: center;
        height: 60%;
        gap: min(2vh, 5vw);
    }
    .anchorLink_toSections{
        font-size: max(1.5rem, 2vw);
        text-wrap: balance;
        text-decoration-color: var(--background_color_lightCyan);
        /* text-decoration-thickness: max(0.1rem, 0.5vw); */
        font-family: 'Subjectivity_Regular', system-ui, sans-serif;
        color: var(--text_color_gray90);
        text-align: center;
    }
    .anchorLink_toSections > span{
        font-family: 'Neutral_Normal', system-ui, sans-serif;
        font-size: max(1.75rem, 2.25vw);
        color: var(--background_color_lightCyan);
    }
    
    .anchorLink_toSections:is(:hover){
        text-decoration-style: wavy;
        text-decoration-thickness: max(0.1rem, 0.1vw);
    }

    @media (width < 800px) {
        .content_container.sections_links{
            grid-template-columns: 1fr;
        }
    }

    /* PREVIEW OF WORKS */
/* ------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* General */
    .default_container.endless{
        padding-block: max(15vh, 5rem);
    }
    .content_container.work_summary_page{
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        position: relative;
    }

    /* For logos */
    .text_corner_previewOfWorks{
        position: absolute;
        font-family: 'Subjectivity_Regular', system-ui, sans-serif;
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
        grid-template-rows: 1fr;
        grid-auto-rows: 1fr;
        gap: max(0.75rem, 0.75vw) max(1rem, 1vw);
    }
    .work_element_preview_box{
        aspect-ratio: 1;
        border: max(5px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        background-color: var(--background_color_lightYellow);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .work_element_preview_box:not(.blank){
        cursor: pointer;
        /* isolation: isolate; */
        /* z-index: 5; */
    }
    .work_element_preview_box::after{
        content: '- view detailed -';
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: max(1.75vw, 1.25rem);
        font-family: 'Brolimo', system-ui, sans-serif;
        color: white;
        background: radial-gradient(var(--background_color_alternativeLightYellow_Darker) 25%, hsla(35, 39%, 88%, 0.35) 110%);
        backdrop-filter: blur(max(1rem, 1vw)) opacity(0.75);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.75s ease, visibility 0s ease 0.75s, scale 0.75s ease, filter 0.75s ease;
        scale: 0.95;
        filter: blur(max(2rem, 2vw));
    }
    .work_element_preview_box.rounded::after{
        border-radius: 32.5%;
    }
    /* .work_element_preview_box:not(.rounded)::after{} */
    .work_element_preview_box:not(.blank):hover::after{
        opacity: 1;
        visibility: visible;
        scale: 1;
        filter: blur(0rem);
        transition: opacity 0.25s ease, visibility 0s ease 0s, scale 0.25s ease, filter 0.1s ease;
    }
    .work_element_preview_box:focus-visible{
        outline: max(0.25rem, 0.25vw) var(--background_color_lightCyan) solid;
    }
    .work_element_preview{
        width: 80%;
        max-height: 80%;
    }

    .work_element_preview_box.rounded > .work_element_preview{
        width: 75%;
        max-height: 65%;
    }

    .works_preview_grid > .blank{
        border: none;
        background-color: transparent;
    }
    .mobileBlank{
        display: none;
    }

    .works_preview_grid > :not(.rounded, .blank)::before, .rounded::before{
        content: '';
        box-sizing: content-box;
        position: absolute;
        width: 100%;
        height: 111%;
        background-color: var(--background_color_alternativeLightYellow);
        border: max(5px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        z-index: -1;
    }
    .rounded, .rounded::before{
        border-radius: 35%;
    }

    .close_button{
        position: fixed;
        cursor: pointer;
        width: max(3.3rem, 3vw);
        aspect-ratio: 1;
        z-index: 9999;
        top: min(5%, 1rem + 2vw);
        right: min(7.5%, 3rem + 2vw);
        outline: max(0.25rem, 0.25vw) var(--background_color_lightCyan) solid;
        border: none;
        border-radius: 30%;
        overflow: clip;
        backdrop-filter: blur(5px) invert(25%);
        background-color: var(--background_color_lightCyan_lowerOpacity);
        box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated);

        transition: scale 0.15s ease-out, box-shadow 0.2s ease-in-out;
    }
    
    .Global_closeIcon{
        width: 60%;
        aspect-ratio: 1;
        filter: drop-shadow(0 0 max(.4rem, .4vw) var(--background_color_darkCyanSaturated));
    }
    .close_button:hover > .Global_closeIcon{
        animation: closeIcon_animation .5s ease-in-out;
    }
    .close_button:hover{
        animation: close_button_animation .5s ease-in-out;
    }

    @keyframes closeIcon_animation{
        0%, 100% {
            rotate: 0deg;
            scale: 1;
        }
        25%{
            rotate: 5deg;
            scale: 0.85;
        }
        65%{
            rotate: -10deg;
            scale: 0.85;
        }
    }
    @keyframes close_button_animation{
        0%, 100% {
            box-shadow: 0 0 max(1rem, 1vw) max(0.1rem, 0.1vw) var(--background_color_lightCyanSaturated);
        }
        50%{
            box-shadow: 0 0 max(1.5rem, 1.5vw) max(0.15rem, 0.15vw) var(--background_color_lightCyanSaturated);
        }
    }
    .workPresent_wrapper{
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 100dvh;
        position: fixed;
        overflow-y: scroll;
        scroll-snap-type: block mandatory;
        z-index: 9990;
        inset: 0;
    }
    .workPresent_wrapper::-webkit-scrollbar {
        width: max(0.5em, 0.5vw);
    }
    .workPresent_wrapper::-webkit-scrollbar-track {
        background-color: var(--background_color_lightCyan);
    }
    .workPresent_wrapper::-webkit-scrollbar-thumb {
        background-color: var(--background_color_alternativeLightYellow);
        border-radius: 5rem;
    }

    @media (width < 900px) {
        .works_preview_grid{
            grid-template-columns: repeat(2, 50%);
            grid-template-rows: repeat(7, 42.5vw);
            gap: max(1.5rem, 7.5vw) 0;
        }
        .works_preview_grid > .work_element_preview_box.blank:not(.mobileBlank){
            display: none;
        }
        .mobileBlank{
            display: block;
        }
        .work_element_preview_box{
            height: 100%;
            align-self: center;
        }
        .work_element_preview{
            width: 80%;
        }
        .work_element_preview_box::after{
            display: none;
        }
        .rounded, .rounded::before{
            border-radius: 0%;
        }
        .mobile_rounded, .mobile_rounded::before{
            border-radius: 25%;
        }
        .mobile_rounded::before{
            rotate: 90deg;
        }
    }
    @media (width < 475px) {
        .work_element_preview{
            width: 85%;
            max-height: 85%;
        }
    }
/* ----------------------------------------------------- */

    /* .content_container.work_summary_page.largeWorks{
        gap: 0 0;
    } */
    .largeWorks_upperText{
        font-family: "Subjectivity_Regular", system-ui, sans-serif;
        font-size: max(4rem, 5vw);
        padding-block: max(1.5rem, 2vw);
        text-align: center;
        text-wrap: nowrap;
        color: var(--text_color_gray90);
        translate: 0 -25%;
    }
    .largeWorks_preview_grid{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        grid-auto-rows: 1fr;
        gap: max(4rem, 5vw) max(1rem, 1vw);
    }
    .largeWork_preview_box_wrapper{
        position: relative;
    }
    .largeWork_preview_box_wrapper::before{
        content: '';
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 110%;
        top: -5%;
        background-color: var(--background_color_alternativeLightYellow);
        border: max(5px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        border-radius: max(3rem, 3vw);
        z-index: -1;
    }
    .largeWork_preview_box{
        display: grid;
        grid-template-rows: 1fr;
        grid-auto-columns: 100%;
        grid-auto-flow: column;
        place-items: center;
        scroll-snap-type: inline mandatory;
        border: max(5px, 0.5vw) var(--background_color_alternativeLightYellow) solid;
        background-color: var(--background_color_lightYellow);
        border-radius: max(3rem, 3vw);
        position: relative;
    }
    .largeWork_preview_box:not(.moreThanOneChild){
        padding-bottom: max(0.35rem, 0.5vh);
    }
    .largeWork_preview_box::-webkit-scrollbar {
        height: max(0.35rem, 0.5vh);
    }
    .largeWork_preview_box::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .largeWork_preview_box::-webkit-scrollbar-thumb {
        background-color: var(--background_color_lightCyan_lowerOpacity);
        border-radius: 5rem;
    }
    .largeWork_preview_box:is(.moreThanOneChild){
        /* grid-template-columns: max(4vw, 4rem) repeat(2, calc(100% - max(8vw, 8rem))) max(4vw, 4rem); */
        overflow-x: scroll;
        overflow-y: clip;
    }
    .largeWork_preview_box:not(.moreThanOneChild)::after{
        content: '- view detailed -';
        position: absolute;
        inset: -0.2% 0 -0.2% 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: max(1.75vw, 1.75rem);
        font-family: 'Brolimo', system-ui, sans-serif;
        color: white;
        background: radial-gradient(var(--background_color_alternativeLightYellow_Darker) 20%, hsla(35, 39%, 88%, 0.35) 110%);
        backdrop-filter: blur(max(5rem, 5vw)) opacity(0.25);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.75s ease, visibility 0s ease 0.75s, scale 0.75s ease, filter 0.75s ease;
        scale: 0.95;
        filter: blur(max(3rem, 3vw));
        border-radius: max(2.6rem, 2.6vw);
    }
    .largeWork_preview_box:not(.moreThanOneChild):hover::after{
        opacity: 1;
        visibility: visible;
        scale: 1;
        filter: blur(0rem);
        transition: opacity 0.25s ease, visibility 0s ease 0s, scale 0.25s ease, filter 0.1s ease;
    }
    .largeWork_preview_box:focus-visible{
        outline: max(0.25rem, 0.25vw) var(--background_color_lightCyan) solid;
    }
    
    .scrollLeftAndRightButton{
        position: absolute;
        top: calc(50% - (max(3vw, 3.5rem) / 2));
        margin-inline: max(0.25rem, 0.5vw);
        z-index: 50;
        width: max(3vw, 3.5rem);
        aspect-ratio: 1;
        background: radial-gradient(var(--background_color_alternativeLightYellow_Darker) 10%, hsla(35, 39%, 88%, 0.35) 110%);
        border: max(3px, 0.3vw) var(--background_color_alternativeLightYellow) solid;
        border-radius: max(1rem, 1vw);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(max(1rem, 1vw));

        opacity: 1;
        visibility: visible;
        transition: opacity 0.25s ease, visibility 0.25s ease;
    }
    .scrollLeftAndRightButton:is(.visually_hidden){
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.1s ease, visibility 0.1s ease;
    }
    .largeWork_preview_box_wrapper:has(.largeWork_preview_box:not(.moreThanOneChild)) .scrollLeftAndRightButton {
        /* opacity: 0; */
        display: none;
        /* transition: opacity 0.1s ease, visibility 0.1s ease; */
    }
    .largeWork_scrollButton{
        width: 60%;
        aspect-ratio: 1;
    }
    .scrollLeftAndRightButton.left{
        left: max(0.5rem, 0.5vw);
    }
    .scrollLeftAndRightButton.right{
        right: max(0.5rem, 0.5vw);
        rotate: 180deg;
    }

    .largeWork_element_preview{
        width: 90%;
        height: 45vh;
        max-height: 90%;
        object-fit: contain;
        scroll-snap-align: center;
        scroll-snap-stop: always;
        /* image-rendering: optimizeQuality; */
    }

    @media (width < 1000px) {
        .largeWorks_preview_grid{
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            grid-auto-rows: 1fr;
            gap: max(4rem, 5vw) max(1rem, 1vw);
        }
        .largeWorks_upperText{
            text-wrap: balance;
            line-height: min(4rem, 11.5vw);
            font-size: min(4rem, 11.5vw);
            translate: 0 -40%;
        }
    }

    /* General media ------------------------------------------------------------------------------------------------------------*/
    @media (width < 1100px) {
        .content_container{
            width: 87.5%;
            height: 87.5%;
        }
    }
    @media (width < 1100px) and (height < 690px){ 
        .content_container{
            width: 87.5%;
            height: 90%;
        }
    }
</style>