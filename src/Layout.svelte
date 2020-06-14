<script>
import { Route } from 'svelte-router-spa'
import Sidebar from './Sidebar.svelte'

export let currentRoute
const params = {}
</script>

<style lang="scss">

    @import './vars.scss'; 

    :global(body) {
        background: url(../bg_400x800.jpg) center no-repeat #111;
        background-size: cover;

        @media #{$media-tablet-landscape} {
            background-image: url(../bg_1024x768.jpg);
        }
    }

	.site {
        display: flex;
        height: 100%;
        @media #{$media-tablet-landscape-lt} {
            flex-direction: column;
        }
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

</style>

<div class="site">
    <Sidebar />
    <main class="content">
        <Route {currentRoute} {params} />
    </main>
</div>