<script>
    import { _ } from "svelte-i18n";
    import { onDestroy } from "svelte";
    import { activePartyId } from "../stores.js";
    import { firestore } from "firebase/app";
    import "firebase/firestore";
    import MenuDropdown from './MenuDropdown.svelte';

    const db = firestore();

    let chars = [];
    const dbChars = db.collection("characters");

    const unsubscribe = {};

    unsubscribe.activePartyId = activePartyId.subscribe(function (value) {

        const charsQuery = dbChars
            .where("char_parties", "array-contains", value)
            .orderBy("name");

        charsQuery.onSnapshot((snapshot) => {
            chars = [];
            let i = 0;

            snapshot.forEach((doc) => {
                chars[i++] = {
                    id: doc.id,
                    name: doc.data().name,
                };
            });
        });
    });

    onDestroy(() => {
        for (let key in unsubscribe) {
            unsubscribe[key]();
        }
    });
</script>

{#if $activePartyId && chars.length}
    <MenuDropdown 
        to={`/parties/${$activePartyId}`}
        label={$_('nav_party_chars')}
        items={chars.map(item => ({
            to: `/characters/${item.id}`,
            label: item.name,
        }))} />
{/if}