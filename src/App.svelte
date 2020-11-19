<script>
  import { Router, Route } from "svelte-routing";

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
  
h1 {
  width: 100%;
  height: 6rem;
  color: transparent;
  background: url(../coriolis-header.png) center no-repeat black;
  background-size: contain;
  }

</style>

<Router url="{url}">
  <div class="site">
      <Sidebar />
      <Routes />
  </div>
</Router>