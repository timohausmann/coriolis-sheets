<script>
    import { _ } from 'svelte-i18n';
    import userCharsStore from '../stores/userCharsStore.js';
    import MenuLink from './MenuLink.svelte';
    import MenuDropdown from './MenuDropdown.svelte';
</script>


{#if $userCharsStore.length}
    <MenuDropdown 
        to='/characters'
        label={$_('nav_my_characters')}
        items={$userCharsStore.map(item => ({
            to: `/characters/${item.id}`,
            label: item.name,
        }))} />
{:else}
    <MenuLink to="/characters"
        >{$_('nav_my_characters')}</MenuLink
    >
{/if}