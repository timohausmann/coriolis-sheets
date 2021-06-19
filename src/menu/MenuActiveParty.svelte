<script>
    import { _ } from 'svelte-i18n';
    import userPartiesStore from '../stores/userPartiesStore.js';
    import { activePartyId } from '../stores.js';
    import Dropdown from '../ui/Dropdown.svelte';
    import 'firebase/firestore';

    function setActiveParty(partyId) {
        activePartyId.set(partyId);
    }
</script>

{#if $userPartiesStore.length > 1}
    <div class="navbar-item">
        <Dropdown
            label={$userPartiesStore.find(party => party.id === $activePartyId).name}
            options={$userPartiesStore.map((party) => ({
                label: party.name,
                icon:
                    party.id === $activePartyId
                        ? 'fas fa-check'
                        : 'far fa-square',
                onClick: () => setActiveParty(party.id),
            }))}
        />
    </div>
{/if}

<style>
</style>
