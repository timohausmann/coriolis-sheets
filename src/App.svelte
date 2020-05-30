<script>
	import Charactersheet from './sheets/coriolis/Charactersheet.svelte';
	import Login from './Login.svelte';
</script>

<style>
	main {
		padding: 0 1em;
		max-width: 960px;
		margin: 0 auto;
	}
	h1 {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 6rem;
		color: transparent;
		background: url(../coriolis-header.png) center no-repeat black;
		background-size: contain;
	}
</style>

<main>

	<h1>Coriolis</h1>

	<!--Charactersheet /-->
	<Login />
</main>