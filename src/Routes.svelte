<script>
    import { Route } from "svelte-routing";
  
    import Login from './Login.svelte'
    import Splash from './Splash.svelte' 
    import Parties from './Parties.svelte'
    import Party from './Party.svelte'
    import Characters from './Characters.svelte'
    import Sheet from './sheets/Sheet.svelte'

    import CoriolisCharSheet from './sheets/coriolis/_char.svelte';
    import CoriolisShipSheet from './sheets/coriolis/_ship.svelte';
</script>

<Route path="login" component="{Login}" />
<!--Route path="sheet" component="{Sheet}" /-->
<Route path="characters" component="{Characters}" />
<Route path="characters/:id" let:params>
    <Sheet id={params.id} template="character" />
</Route>
<Route path="ships/:id" let:params>
    <Sheet id={params.id} template="ship" />
</Route>
<Route path="parties" component="{Parties}" />
<Route path="parties/:id" component="{Party}" />
<Route path="/" component="{Splash}" />