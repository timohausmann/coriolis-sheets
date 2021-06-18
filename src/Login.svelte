<script>
import { auth } from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { Link } from "svelte-routing";
import { onMount, onDestroy } from 'svelte';
import { _ } from 'svelte-i18n';
import { userStore } from './stores.js';

let authContainer;

let isSignedIn = false;
let displayName = '';

let unsubscribe;

onMount(() => {

    createSignInForm();

    unsubscribe = userStore.subscribe(value => {

        if (value.isSignedIn) {
            authContainer.classList.add('hidden');
        } else {
            authContainer.classList.remove('hidden');
        }

        isSignedIn = value.isSignedIn;
        displayName = value.displayName;
    });
});


onDestroy(() => {
    unsubscribe();
});


function signOut() {
    auth()
        .signOut()
        .then(() => {
            location.reload();
        });
}

function createSignInForm() {

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth())

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                return true;
            },
            uiShown: function () {

            }
        },
        signInSuccessUrl: '/characters/',
        signInOptions: [
            auth.EmailAuthProvider.PROVIDER_ID,
            //auth.GoogleAuthProvider.PROVIDER_ID
        ],
        'credentialHelper': firebaseui.auth.CredentialHelper.NONE
    };

    ui.start('#firebaseui-auth-container', uiConfig);
}
</script>
<style>
    .section {
        margin: auto;
    }

    .hidden {
        display: none;
    }
</style>


<div class="section">
    <div class="container">
    {#if isSignedIn}

        <h2 class="title">{$_('logged_in')}</h2>
        <p class="block">
            {$_('my_username')}: {displayName}
        </p>

        <button on:click={signOut} class="button">{$_('nav_signout')}</button>
    {:else}
        <h2 class="title has-text-centered">
            {$_('signin_text')}
        </h2>
    {/if}

    <div class="hidden" id="firebaseui-auth-container" bind:this={authContainer}></div>
</div>
</div>