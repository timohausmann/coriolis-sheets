<script>
import { Route } from 'svelte-router-spa'
import Sidebar from './Sidebar.svelte'

export let currentRoute
const params = {}
</script>

<style>
	.site {
        display: flex;
        /*flex-direction: column;
        justify-content: stretch;
		padding: 0 1em;
		margin: 0 auto;
        max-width: 960px;*/
        height: 100%;
	}
	h1 {
		width: 100%;
		height: 6rem;
		color: transparent;
		background: url(../coriolis-header.png) center no-repeat black;
		background-size: contain;
    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        padding: 1rem;
        overflow-y: auto;
    }
    .content > :global(*) {
        max-height: 100%;
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

<div class="site">
    <Sidebar />
    <main class="content">
        <Route {currentRoute} {params} />
    </main>
</div>