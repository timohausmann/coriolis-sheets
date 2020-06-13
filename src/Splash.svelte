<script>
import { Navigate } from 'svelte-router-spa'
import { userStore } from './stores.js';

</script>

<style>
    p {
        margin-bottom: 2rem;
    }
</style>


<div class="mdl-card mdl-shadow--2dp firebaseui-container">
    <div class="firebaseui-card-header">
        <h1 class="firebaseui-title">Welcome to Coriolis Character Sheets!</h1>
        <p class="firebaseui-text">
            This service allows you to manage and share Coriolis Character Sheets.
        </p>
    </div>

    <div class="firebaseui-card-actions">
        <div class="firebaseui-form-actions">
            {#if $userStore.isSignedIn}
                <Navigate to="/characters" styles="firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">My Characters</Navigate>
            {:else}
                <Navigate to="/login" styles="firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Register / Sign In</Navigate>
            {/if}
        </div>
    </div>
</div>