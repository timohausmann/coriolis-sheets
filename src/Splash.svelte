<script>
import { Navigate } from 'svelte-router-spa'

import { userStore } from './stores.js';

/*let isSignedIn_value;
const unsubscribe = isSignedIn.subscribe(value => {
    isSignedIn_value = value;
});*/
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
</div>