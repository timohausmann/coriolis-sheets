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
    {#key params.id}
        <Sheet id={params.id} template="character" />
    {/key}
</Route>
<Route path="ships/:id" let:params>
    {#key params.id}
        <Sheet id={params.id} template="ship" />
    {/key}
</Route>
<Route path="parties" component="{Parties}" />
<Route path="parties/:id" let:params>
    {#key params.id}
        <Party location={params.location} id={params.id} />
    {/key}
</Route>
<Route path="parties/:id/invite" let:params>
    <Party location={params.location} id={params.id} isInvite={true} />
</Route>
<Route path="/" component="{Splash}" />