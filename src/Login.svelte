<script>
import { auth } from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { Navigate } from 'svelte-router-spa'

import { isSignedIn } from './stores.js';

let authContainer;
let ui;
let userName;

let isSignedIn_value;
const unsubscribe = isSignedIn.subscribe(value => {
    isSignedIn_value = value;
});



function createSignInForm() {

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

auth().onAuthStateChanged(function (user) {

    if (user) {
        authContainer.innerHTML = '';
        userName = user.displayName;
        //authenticatedRequest('GET', '/app-js');
    } else {
        ui = new firebaseui.auth.AuthUI(auth());
        createSignInForm();
    }
});



function signOut() {
    auth().signOut();
}
</script>
<style>
    .grey {
        color: #eee;
        margin-bottom: 2rem;
        text-align: center;
    }
</style>



{#if isSignedIn_value}

    <div class="mdl-card mdl-shadow--2dp firebaseui-container">
        <div class="firebaseui-card-header">
            <h1 class="firebaseui-title">You are signed in.</h1>
            <p class="firebaseui-text">
                Your username: {userName}
            </p>
        </div>

        <div class="firebaseui-card-actions">
            <div class="firebaseui-form-actions">
                <Navigate to="sheet" styles="firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Character Sheet</Navigate>
                <button on:click={signOut} class="firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Sign out</button>
            </div>
        </div>
    </div>
{:else}
    <p class="grey firebaseui-text">
        Create a new account or<br /> sign in with your existing account here.
    </p>
{/if}

<div id="firebaseui-auth-container" bind:this={authContainer}></div>


