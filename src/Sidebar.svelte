<script>
import { Navigate } from 'svelte-router-spa'
import { userStore } from './stores.js';
</script>

<style>
	h1 {
		width: 100%;
		height: 6rem;
		color: transparent;
		background: url(../coriolis-header.png) center no-repeat black;
		background-size: contain;
    }

    .sidebar {
        background: black;
        padding: 0 1rem;
    }
    .nav {
        display: flex;
        flex-direction: column;;
    }
    .nav :global(a) {
        display: block;
        padding: 0.5rem;
    }
</style>


<div class="sidebar">
    <h1>Coriolis Web</h1>
    <nav class="nav">
    
        {#if $userStore.isSignedIn}
            <Navigate to="/characters/">Meine Charaktere</Navigate>
            <Navigate to="/parties/">Parties</Navigate>
            <!--Navigate to="/sessions/">Sessions</Navigate>
            <Navigate to="/items/">Items</Navigate>
            <Navigate to="/talents/">Talente</Navigate>
            <Navigate to="/crits/">Kritische Wunden</Navigate>
            <Navigate to="/account/">Account</Navigate-->
            <Navigate to="/login/">Logout</Navigate>
        {:else}
            <Navigate to="/login/">Register / Sign In</Navigate>
        {/if}
    </nav>
</div>