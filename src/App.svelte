<script>
  import { Router, Route } from "svelte-routing";

  import Login from './Login.svelte'
  import Splash from './Splash.svelte' 
  import Parties from './Parties.svelte'
  import Party from './Party.svelte'
  import Characters from './Characters.svelte'
  import Sheet from './sheets/Sheet.svelte'

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

  .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      padding: 1rem;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
  }
  .content > :global(*) {
      max-height: 100%;
  }

</style>

<Router url="{url}">
  <div class="site">
      <Sidebar />
      <main class="content">
        <Route path="login" component="{Login}" />
        <Route path="sheet" component="{Sheet}" />
        <Route path="characters" component="{Characters}" />
        <Route path="characters/:id" let:params>
          <Sheet id={params.id} />
        </Route>
        <Route path="parties" component="{Parties}" />
        <Route path="parties/:id" component="{Party}" />
        <Route path="/" component="{Splash}" />
      </main>
  </div>
</Router>