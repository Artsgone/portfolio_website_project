import { writable } from "svelte/store";

function storePrerefreshScrollPosition(scrollY){
    const { subscribe, set, update } = writable(scrollY);

    function updateScrollY(scrollY){
        sessionStorage.setItem("stored_scrollY", scrollY)
    }
    function resetScrollY(){
        sessionStorage.setItem("stored_scrollY", 0)
    }

    return { subscribe, updateScrollY, resetScrollY }
}

export const saveScrollY = storePrerefreshScrollPosition(0);