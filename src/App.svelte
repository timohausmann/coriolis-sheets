<script>
    import "firebase/firestore";
    import { Router, Route } from "svelte-routing";
    import { isLoading } from "svelte-i18n";

    import Routes from "./Routes.svelte";
    import Menu from "./Menu.svelte";
    import Analytics from './Analytics.svelte';
    import Footer from './Footer.svelte';

    export let url = "";

</script>

<Router {url}>
    {#if $isLoading}
        Loading &hellip;
    {:else}
        <Menu />
        <main>
            <Routes />
        </main>
        <Analytics />
        <Footer />
    {/if}
</Router>

<style>
    main {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
</style>