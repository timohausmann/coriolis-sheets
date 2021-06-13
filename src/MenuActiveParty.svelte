<script>
    import { _ } from "svelte-i18n";
    import { userPartiesStore } from "./storesFirebase.js";
    import { activePartyId } from "./stores.js";
    import Dropdown from "./ui/Dropdown.svelte";
    import "firebase/firestore";

    function setActiveParty(partyId) {
        activePartyId.set(partyId);
    }
</script>

<div class="navbar-item">
    <Dropdown
        label="Active Party"
        options={$userPartiesStore.map(party => ({
            label: party.name,
            icon: (party.id === $activePartyId) ? 'fas fa-check' : 'far fa-square',
            onClick: () => setActiveParty(party.id)
        }))}
    />
</div>

<style>
</style>
