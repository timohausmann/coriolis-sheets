<script>
import { Link } from "svelte-routing";
import { userStore } from './stores.js';

export let location

</script>

<style>
    p {
        margin-bottom: 2rem;
    }
</style>


<main class="content content--center">
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
                    <Link to="/characters" styles="firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">My Characters</Link>
                {:else}
                    <Link to="/login" styles="firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Register / Sign In</Link>
                {/if}
            </div>
        </div>
    </div>
</main>