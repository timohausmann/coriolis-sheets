<script>
    import { _ } from "svelte-i18n";
    import { navigate, link } from "svelte-routing";
    import { userStore, unsavedChangesStore, activePartyId } from "./stores.js";
    import { userCharsStore, userPartiesStore } from "./storesFirebase.js";
    import MenuPartyChars from "./MenuPartyChars.svelte";
    import MenuActiveParty from "./MenuActiveParty.svelte";

    let active = false;

    function toggleActive() {
        active = !active;
    }

    function handleNav(e) {
        const href = e.target.dataset.href;

        //close nav layer
        active = false;

        if ($unsavedChangesStore) {
            const choice = window.confirm($_("confirm_unsaved_changes"));
            if (!choice) return false;
        }

        navigate(href);
    }
</script>

<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a href="#" class="navbar-item">
            <img
                src="../coriolis-header.png"
                width="112"
                height="28"
            />
        </a>

        <a
            href="#"
            role="button"
            class={"navbar-burger" + (active ? " is-active" : "")}
            aria-label="menu"
            aria-expanded="false"
            on:click={toggleActive}
        >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
        </a>
    </div>

    <div class={"navbar-menu" + (active ? " is-active" : "")}>
        <div class="navbar-start">
            {#if $userStore.isSignedIn}
                <div class="navbar-item has-dropdown is-hoverable">
                    <div
                        class="navbar-link"
                        on:click={handleNav}
                        data-href="/characters/"
                    >
                        {$_("nav_my_characters")}
                    </div>
                    <div class="navbar-dropdown">
                        {#each $userCharsStore as char}
                            <div
                                class="navbar-item"
                                on:click={handleNav}
                                data-href="/characters/{char.id}"
                            >
                                {char.char_name}
                            </div>
                        {/each}
                    </div>
                </div>
                <div class="navbar-item has-dropdown is-hoverable">
                    <div
                        class="navbar-link"
                        on:click={handleNav}
                        data-href="/parties/"
                    >
                        {$_("nav_my_parties")}
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

                <MenuPartyChars {handleNav} />
            {:else}{/if}

            <div class="navbar-item" on:click={handleNav} data-href="/items/">
                {$_("nav_items")}
            </div>
        </div>

        <div class="navbar-end">
            {#if !$userStore.isSignedIn}
                <div class="navbar-item">
                    <div class="buttons">
                        <a href="#" class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a href="#" class="button is-light"> Log in </a>
                    </div>
                </div>
            {:else}
                {#if $userPartiesStore.length > 1}
                    <MenuActiveParty />
                {/if}

                <div class="navbar-item">
                    
                        <div title="Your Account"
                            class="button is-rounded is-light"
                            on:click={handleNav}
                            data-href="/login/"
                        ><span class="icon is-small"
                            ><i class="fa fa-user" /></span
                        >
                        </div>
                    
                </div>
            {/if}
        </div>
    </div>
</nav>

<style>
    .navbar-item {
        cursor: pointer;
    }
</style>
