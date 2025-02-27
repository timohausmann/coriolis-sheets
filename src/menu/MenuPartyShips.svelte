<script>
    import { _ } from "svelte-i18n";
    import { onDestroy } from "svelte";
    import { activePartyId } from "../stores.js";
    import { firestore } from "firebase/app";
    import "firebase/firestore";
    import MenuDropdown from './MenuDropdown.svelte';

    const db = firestore();

    // Array to store ships
    let ships = [];
    // Reference to ships collection
    const dbShips = db.collection("ships");

    const unsubscribe = {};

    // Subscribe to activePartyId changes
    unsubscribe.activePartyId = activePartyId.subscribe(function (value) {
        // Query ships where ship_party equals the active party ID
        const shipsQuery = dbShips
            .where("ship_party", "==", value)
            .orderBy("name");

        // Set up snapshot listener for real-time updates
        unsubscribe.shipsQuery = shipsQuery.onSnapshot((snapshot) => {
            ships = [];
            let i = 0;

            snapshot.forEach((doc) => {
                ships[i++] = {
                    id: doc.id,
                    name: doc.data().name,
                };
            });
        });
    });

    // Clean up subscriptions when component is destroyed
    onDestroy(() => {
        for (let key in unsubscribe) {
            unsubscribe[key]();
        }
    });
</script>

{#if $activePartyId}
    <MenuDropdown 
        to={`/parties/${$activePartyId}`}
        label={$_('nav_party_ships')}
        labelEmpty={$_('party_no_ships')}
        items={ships.map(item => ({
            to: `/ships/${item.id}`,
            label: item.name,
        }))} />
{/if} 