<script>
    import { _ } from 'svelte-i18n';
    import userPartiesStore from '../stores/userPartiesStore.js';
    import MenuLink from './MenuLink.svelte';
    import MenuDropdown from './MenuDropdown.svelte';
</script>


{#if $userPartiesStore.length}
    <MenuDropdown 
        to='/parties'
        label={$_('nav_my_parties')}
        items={$userPartiesStore.map(item => ({
            to: `/parties/${item.id}`,
            label: item.name,
        }))} />
{:else}
    <MenuLink to="/parties"
        >{$_('nav_my_parties')}</MenuLink
    >
{/if}