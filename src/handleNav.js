import { navigate } from "svelte-routing";
import { unsavedChangesStore } from './stores.js';
import { _ } from 'svelte-i18n';

function handleNav(e) {

    const href = e.target.dataset.href
    
    //close nav layer
    document.querySelector('#nav_toggle').checked = false

    if($unsavedChangesStore) {
        const msg = $_('confirm_unsaved_changes')
        const choice = window.confirm(msg)
        if(!choice) return false
    }

    navigate(href);
}

export default handleNav