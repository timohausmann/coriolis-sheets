<script>
  import { Route } from 'svelte-router-spa'
  export let currentRoute
  const params = {}
</script>

<style>
	main {
        display: flex;
        flex-direction: column;
        justify-content: stretch;
		padding: 0 1em;
        max-width: 960px;
        height: 100%;
		margin: 0 auto;
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
    }
</style>

<main>
    <h1>Coriolis</h1>
    <div class="content">
        <Route {currentRoute} {params} />
    </div>
</main>