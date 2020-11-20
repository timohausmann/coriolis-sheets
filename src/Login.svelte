<script>
import { auth } from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { Link } from "svelte-routing";
import { onMount, onDestroy } from 'svelte';
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
        signInSuccessUrl: '/',
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
    .grey {
        color: #eee;
        margin-bottom: 2rem;
        text-align: center;
    }

    .hidden {
        display: none;
    }
</style>



<main class="content content--center">
    {#if isSignedIn}

        <div class="mdl-card mdl-shadow--2dp firebaseui-container">
            <div class="firebaseui-card-header">
                <h1 class="firebaseui-title">You are signed in.</h1>
                <p class="firebaseui-text">
                    Your username: {displayName}
                </p>
            </div>

            <div class="firebaseui-card-actions">
                <div class="firebaseui-form-actions">
                    <Link to="/characters" styles="firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">My Characters</Link>
                    <button on:click={signOut} class="firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Sign out</button>
                </div>
            </div>
        </div>
    {:else}
        <p class="grey firebaseui-text">
            Create a new account or<br /> sign in with your existing account here.
        </p>
    {/if}

    <div class="hidden" id="firebaseui-auth-container" bind:this={authContainer}></div>
</main>