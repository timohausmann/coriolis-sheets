<script>
    import MenuLink from './MenuLink.svelte';
    import { _ } from "svelte-i18n";

    export let to = '#';
    export let label = '';
    export let items = [];
    export let labelEmpty = $_('no_entries_yet');
</script>

<div class="navbar-item has-dropdown is-hoverable">
    <MenuLink className="navbar-link" {to}>{label}</MenuLink>
    <div class="navbar-dropdown">
        {#if items.length > 0}
            {#each items as item}
                <MenuLink to={item.to}>{item.label}</MenuLink>
            {/each}
        {:else}
            <div class="navbar-item">
                <span class="has-text-grey-light">{labelEmpty}</span>
            </div>
        {/if}
    </div>
</div>
