<script>
    import MenuBrand from './MenuBrand.svelte';
    import { _ } from 'svelte-i18n';
    import { userStore, mainMenuOpen } from '../stores.js';
    import MenuPartyChars from './MenuPartyChars.svelte';
    import MenuPartyShips from './MenuPartyShips.svelte';
    import MenuActiveParty from './MenuActiveParty.svelte';
    import MenuLang from './MenuLang.svelte';
    import MenuLink from './MenuLink.svelte';
    import MenuCharacters from './MenuCharacters.svelte';
    import MenuParties from './MenuParties.svelte';

    let isActive = false;
</script>

<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <MenuBrand />

    <div class={'navbar-menu' + ($mainMenuOpen ? ' is-active' : '')}>
        <div class="navbar-start">
            {#if $userStore.isSignedIn}
                <MenuCharacters />

                <MenuParties />

                <MenuPartyChars />
                
                <MenuPartyShips />
            {:else}
                <MenuLink to="/sheet">{$_('nav_sheet')}</MenuLink>
            {/if}
        </div>

        <div class="navbar-end">
            <MenuLang />

            {#if $userStore.isSignedIn}
                <MenuActiveParty />

                <div class="navbar-item">
                    <MenuLink
                        to="/login"
                        title="Your Account"
                        className="button is-rounded is-light"
                    >
                        <!-- click on icon isn't registred without pointer-events : none -->
                        <span
                            class="icon is-small"
                            style="pointer-events: none;"
                        >
                            <i class="fa fa-user" />
                        </span>
                    </MenuLink>
                </div>
            {:else}
                <div class="navbar-item">
                    <div class="buttons">
                        <MenuLink to="/login" className="button is-primary">
                            <strong>Sign up</strong>
                        </MenuLink>
                        <MenuLink to="/login" className="button is-light">
                            Log in
                        </MenuLink>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</nav>
