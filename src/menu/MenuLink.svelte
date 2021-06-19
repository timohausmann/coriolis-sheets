<script>
    import { link } from 'svelte-routing';
    import { unsavedChangesStore, mainMenuOpen } from '../stores.js';
    import { _ } from 'svelte-i18n';

    export let to = '';
    export let title = '';
    export let className = 'navbar-item';

    function handleNav(e) {

        if ($unsavedChangesStore) {
            const choice = window.confirm($_('confirm_unsaved_changes'));
            if (!choice) e.preventDefault();
        }

        //close the menu
        mainMenuOpen.set(false);
        
        //prevent dropdowns staying open by bulma CSS :focus rules
        e.target.blur(); 
    }
</script>

<a href={to} title={title} use:link class={className} on:click|capture={handleNav}>
    <slot></slot>
</a>