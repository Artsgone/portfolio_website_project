import { writable } from "svelte/store";

const observeContainers = document.querySelectorAll(".default_container")

const intersecObserver = new IntersectionObserver( entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("showOnScreen", entry.isIntersecting)
        if (entry.isIntersecting) {
            intersecObserver.unobserve(entry.target)
        }
    })
},
    {
        threshold: 0.5,
    }
)

observeContainers.forEach( container => {
    intersecObserver.observe(container)
})