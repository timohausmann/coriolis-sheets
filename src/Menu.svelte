<script>
    import { _ } from 'svelte-i18n';
    import { Link, navigate } from 'svelte-routing';
    import { userStore, unsavedChangesStore } from './stores.js';
    import userCharsStore from './stores/userCharsStore.js';
    import userPartiesStore from './stores/userPartiesStore.js';
    import MenuPartyChars from './MenuPartyChars.svelte';
    import MenuActiveParty from './MenuActiveParty.svelte';

    let active = false;

    function toggleActive() {
        active = !active;
    }

    function handleNav(e) {
        const href = e.target.dataset.href;

        //close nav layer
        active = false;

        if ($unsavedChangesStore) {
            const choice = window.confirm($_('confirm_unsaved_changes'));
            if (!choice) return false;
        }

        navigate(href);
    }
</script>

<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <Link getProps={() => ({ class: 'navbar-item' })} to="/">
            <strong>Coriolis Sheets</strong>
        </Link>

        <a
            href="#"
            role="button"
            class={'navbar-burger' + (active ? ' is-active' : '')}
            aria-label="menu"
            aria-expanded="false"
            on:click={toggleActive}
        >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
        </a>
    </div>

    <div class={'navbar-menu' + (active ? ' is-active' : '')}>
        <div class="navbar-start">
            {#if $userStore.isSignedIn}
                {#if $userCharsStore.length}
                    <div class="navbar-item has-dropdown is-hoverable">
                        <div
                            class="navbar-link"
                            on:click={handleNav}
                            data-href="/characters/"
                        >
                            {$_('nav_my_characters')}
                        </div>
                        <div class="navbar-dropdown">
                            {#each $userCharsStore as char}
                                <div
                                    class="navbar-item"
                                    on:click={handleNav}
                                    data-href="/characters/{char.id}"
                                >
                                    {char.name}
                                </div>
                            {/each}
                        </div>
                    </div>
                {:else}
                    <div
                        class="navbar-item"
                        on:click={handleNav}
                        data-href="/characters/"
                    >
                        {$_('nav_my_characters')}
                    </div>
                {/if}
                {#if $userPartiesStore.length}
                    <div class="navbar-item has-dropdown is-hoverable">
                        <div
                            class="navbar-link"
                            on:click={handleNav}
                            data-href="/parties/"
                        >
                            {$_('nav_my_parties')}
                        </div>
                        <div class="navbar-dropdown">
                            {#each $userPartiesStore as party}
                                <div
                                    class="navbar-item"
                                    on:click={handleNav}
                                    data-href="/parties/{party.id}"
                                >
                                    {party.name}
                                </div>
                            {/each}
                        </div>
                    </div>
                {:else}
                    <div
                        class="navbar-item"
                        on:click={handleNav}
                        data-href="/parties/"
                    >
                        {$_('nav_my_parties')}
                    </div>
                {/if}

                <MenuPartyChars {handleNav} />
            {:else}
                <Link getProps={() => ({ class: 'navbar-item' })} to="/sheet">
                    Character Sheet
                </Link>
            {/if}

            <!--div class="navbar-item" on:click={handleNav} data-href="/items/">
                {$_("nav_items")}
            </div-->
        </div>

        <div class="navbar-end">
            {#if !$userStore.isSignedIn}
                <div class="navbar-item">
                    <div class="buttons">
                        <Link
                            getProps={() => ({ class: 'button is-primary' })}
                            to="/login"
                        >
                            <strong>Sign up</strong>
                        </Link>
                        <Link
                            getProps={() => ({ class: 'button is-light' })}
                            to="/login"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            {:else}
                {#if $userPartiesStore.length > 1}
                    <MenuActiveParty />
                {/if}

                <div class="navbar-item">
                    <!-- click on icon isn't registred without p-e: none -->
                    <div
                        title="Your Account"
                        class="button is-rounded is-light"
                        on:click={handleNav}
                        data-href="/login/"
                    >
                        <span
                            class="icon is-small"
                            style="pointer-events: none;"
                        >
                            <i class="fa fa-user" />
                        </span>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</nav>

<style>
    /* @todo make these <a> */
    div.navbar-item {
        cursor: pointer;
    }
    div.navbar-item:hover {
        background-color: #fafafa;
        color: #3273dc;
    }
</style>
