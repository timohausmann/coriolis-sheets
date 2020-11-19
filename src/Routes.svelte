<script>
    import { Route } from "svelte-routing";
  
    import Login from './Login.svelte'
    import Splash from './Splash.svelte' 
    import Parties from './Parties.svelte'
    import Party from './Party.svelte'
    import Characters from './Characters.svelte'
    import Sheet from './sheets/Sheet.svelte'
</script>

<Route path="login" component="{Login}" />
<Route path="sheet" component="{Sheet}" />
<Route path="characters" component="{Characters}" />
<Route path="characters/:id" let:params>
<Sheet id={params.id} />
</Route>
<Route path="parties" component="{Parties}" />
<Route path="parties/:id" component="{Party}" />
<Route path="/" component="{Splash}" />