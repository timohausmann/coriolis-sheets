<script>
    import { Route } from 'svelte-routing';

    import Login from './Login.svelte';
    import Parties from './Parties.svelte';
    import Party from './Party.svelte';
    import Characters from './Characters.svelte';
    import Sheet from './sheets/Sheet.svelte';
    import Landing from './Landing.svelte';
    import Page from './Page.svelte';

    //scroll to top on change
    //https://github.com/EmilTholin/svelte-routing/issues/132
    history.pushState = new Proxy(history.pushState, {
        apply(target, thisArg, argumentsList) {
            scrollTo(0, 0);
            Reflect.apply(target, thisArg, argumentsList);
        },
    });
</script>

<Route path="login" component={Login} />
<Route path="sheet">
    <Sheet isDemo={true} />
</Route>
<Route path="characters" component={Characters} />
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
<Route path="parties" component={Parties} />
<Route path="parties/:id" let:params>
    {#key params.id}
        <Party location={params.location} id={params.id} />
    {/key}
</Route>
<Route path="parties/:id/invite" let:params>
    <Party location={params.location} id={params.id} isInvite={true} />
</Route>
<Route path="/" component={Landing} />
<Route let:params>
    <Page title="404" subtitle={window.location}>
        <p>The requested route could not be found.</p>
    </Page>
</Route>
