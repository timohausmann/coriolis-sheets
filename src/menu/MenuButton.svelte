<script>
    import { link } from 'svelte-routing';
    import { unsavedChangesStore } from '../stores.js';
    import { _ } from 'svelte-i18n';

    export let to = '';
    export let title = '';
    export let className = '';

    function handleNav(e) {

        if ($unsavedChangesStore) {
            const choice = window.confirm($_('confirm_unsaved_changes'));
            if (!choice) e.preventDefault();
        }
    }
</script>

<a href={to} title={title} use:link class={`button ${className}`} on:click|capture={handleNav}>
    <slot></slot>
</a>