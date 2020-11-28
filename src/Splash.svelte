<script>
import { Link } from "svelte-routing";
import { _ } from 'svelte-i18n';

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
            <h1 class="firebaseui-title">{$_('splash_headline')}</h1>
            <p class="firebaseui-text">
                {$_('splash_text')}
            </p>
        </div>

        <div class="firebaseui-card-actions">
            <div class="firebaseui-form-actions">
                {#if $userStore.isSignedIn}
                    <Link to="/characters">{$_('nav_my_characters')}</Link>
                {:else}
                    <Link to="/login">{$_('nav_signin')}</Link>
                {/if}
            </div>
        </div>
    </div>
</main>