<script>
    import { mainMenuOpen } from '../stores.js';
    import MenuLink from './MenuLink.svelte';

    function toggleActive() {
        mainMenuOpen.set(!$mainMenuOpen);
    }
</script>
<div class="navbar-brand">
    <MenuLink to="/">
        <strong>Coriolis Sheets</strong>
    </MenuLink>

    <button
        class={'navbar-burger' + ($mainMenuOpen ? ' is-active' : '')}
        aria-label="menu"
        aria-expanded="false"
        on:click={toggleActive}
    >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
    </button>
</div>
<style>
    .navbar-burger {
        cursor: pointer;
        border: none;
        background: none;
    }
</style>