<style lang="scss">

    @import './vars.scss'; 

	h1 {
        height: 3rem;
		color: transparent;
		background: url(../coriolis-header.png) center no-repeat black;
        background-size: contain;
                
        @media #{$media-tablet-landscape} {
            width: 100%;
            margin: 0 0 1rem;
        }
    }

    .sidebar {
        background: black;
        padding: 0 0.5rem 1rem;

        display: flex;
        align-items: center;
        justify-content: space-between;
        
        @media #{$media-tablet-landscape} {
            flex-direction: column;
            justify-content: flex-start;
            width: 14rem;
        }
    }

    .nav {
        background: rgba(0,0,0,0.9);
        width: 100%;

        @media #{$media-tablet-landscape-lt} {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 10;
            overflow-y: auto;
            padding: 2rem 0;

            transform: translateX(100%);
            transition: transform 0.4s;
        }
        

        input:checked ~ & {
            transform: translateX(0);
        }
    }

    input {
        display: none;
    }

    label {
        position: relative;
        z-index: 11;
        width: 2rem;
        height: 2rem;
        border-radius: 0.25rem;
        text-align: center;
        transition: border-color 0.4s;

        &::before,
        &::after {
            position: absolute;
            left: 0;
            top: 0;
            width: 2rem;
            height: 2rem;
            content: '⋮';
            color: white;
            font-size: 1.5rem;
            line-height: 1.75rem;
            transition: transform 0.4s, opacity 0.4s;
        }
        &::after {
            content: '×';
            opacity: 0;
            transform: scale(0.5);
        }

        input:checked + & {
            &::before {
                opacity: 0;
                transform: scale(0.5);
            }
            &::after {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @media #{$media-tablet-landscape} {
            display: none;
        }
    }

    .logo-link:hover {
        text-decoration: none;
    }

    :global(.nav-item) {
        cursor: pointer;
        padding: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        text-align: center;
        color: white;

        &:last-child {
            border-bottom: 0;
        }
    }

</style>
<script>
import { navigate, link } from "svelte-routing";
import { _ } from 'svelte-i18n'

import { userStore, unsavedChangesStore } from './stores.js';
import SidebarParties from './SidebarParties.svelte';
import SidebarLang from './SidebarLang.svelte';

let input;

function handleNav(e) {

    const href = e.target.dataset.href
    
    //close nav layer
    input.checked = false

    if($unsavedChangesStore) {
        const choice = window.confirm($_('confirm_unsaved_changes'))
        if(!choice) return false
    }

    navigate(href);
}

</script>

<div class="sidebar">
    <a use:link href="/" class="logo-link"><h1>Coriolis Web</h1></a>

    <input class="nav_input" type="checkbox" id="nav_toggle" bind:this={input} />
    <label class="nav_button" for="nav_toggle"></label>

    <nav class="nav">
        {#if $userStore.isSignedIn}
            <div class="nav-item" on:click={handleNav} data-href="/characters/">{$_('nav_my_characters')}</div>
            <div class="nav-item" on:click={handleNav} data-href="/parties/">{$_('nav_my_parties')}</div>
            <SidebarParties handleNav={handleNav} />
            <div class="nav-item" on:click={handleNav} data-href="/login/">{$_('nav_signout')}</div>
        {:else}
            <div class="nav-item" on:click={handleNav} data-href="/login/">{$_('nav_signin')}</div>
        {/if}
        
        <SidebarLang />
    </nav>

</div>