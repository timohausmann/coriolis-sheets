<script>
  import { Router, Route } from "svelte-routing";
  import { isLoading } from 'svelte-i18n'

  import Routes from './Routes.svelte'
  import Sidebar from './Sidebar.svelte'
  
  export let url = "";
</script>

<style lang="scss">

  @import './vars.scss'; 

  :global(body) {
      background: url(../bg_portrait.jpg) center no-repeat #111;
      background-size: cover;

      @media #{$media-tablet} {
          background-image: url(../bg_1024.jpg);
      }
      @media #{$media-tablet-landscape} {
          background-image: url(../bg_1280.jpg);
      }
      @media #{$media-laptop} {
          background-image: url(../bg_1440.jpg);
      }
  }

  .site {
        display: flex;
        height: 100%;
        @media #{$media-tablet-landscape-lt} {
            flex-direction: column;
        }
    }

</style>

<Router url="{url}">
  <div class="site">
    {#if $isLoading}
      Loading &hellip;
    {:else}
      <Sidebar />
      <Routes />
    {/if}
  </div>
</Router>