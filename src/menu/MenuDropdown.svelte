<script>
    import MenuLink from './MenuLink.svelte';

    export let to = '#';
    export let label = '';
    export let items = [];
</script>

<div class="navbar-item has-dropdown is-hoverable">
    <MenuLink className="navbar-link" {to}>{label}</MenuLink>
    <div class="navbar-dropdown">
        {#each items as item}
            <MenuLink to={item.to}>{item.label}</MenuLink>
        {/each}
    </div>
</div>
