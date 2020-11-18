import { navigate } from "svelte-routing";
import { unsavedChangesStore } from './stores.js';

function handleNav(e) {

    const href = e.target.dataset.href
    
    //close nav layer
    document.querySelector('#nav_toggle').checked = false

    console.log(unsavedChangesStore);
    //@TODO understand $ ...
    if($unsavedChangesStore) {
        const msg = 'Du hast scheinbar ungespeicherte Änderungen, sicher dass du die Seite verlassen möchtest?'
        const choice = window.confirm(msg)
        if(!choice) return false
    }

    navigate(href);
}

export default handleNav