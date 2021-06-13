<script>
    import { _ } from "svelte-i18n";
    import { onDestroy } from "svelte";
    import { activePartyId } from "./stores.js";
    import { firestore } from "firebase/app";
    import "firebase/firestore";

    const db = firestore();

    export let handleNav;

    let chars = [];
    const dbChars = db.collection("characters");

    const unsubscribe = {};

    unsubscribe.activePartyId = activePartyId.subscribe(function (value) {

        const charsQuery = dbChars
            .where("char_parties", "array-contains", value)
            .orderBy("char_name");

        charsQuery.onSnapshot((snapshot) => {
            chars = [];
            let i = 0;

            snapshot.forEach((doc) => {
                chars[i++] = {
                    id: doc.id,
                    char_name: doc.data().char_name,
                };
            });
        });
    });

    onDestroy(() => {
        for (let key in unsubscribe) {
            unsubscribe[key]();
        }
    });

    /*
    charactersRef
    .orderBy('char_name')
    .onSnapshot(snapshot => {

        chars = []

        if(snapshot.empty) {
            console.log("No matching documents.");
            return;
        }

        let i = 0;
        snapshot.forEach((doc) => {
            chars[i++] = {
                id: doc.id,
                char_name: doc.data().char_name
            };
        });

    }, err => {
        console.log(`Encountered error: ${err}`);
    });*/
</script>

{#if $activePartyId}
    <div class="navbar-item has-dropdown is-hoverable">
        <div href="#" class="navbar-link" on:click={handleNav}
                    data-href={`/parties/${$activePartyId}`}>{$_("nav_party_chars")}</div>

        <div class="navbar-dropdown">
            {#each chars as char}
                <div
                    class="navbar-item"
                    on:click={handleNav}
                    data-href="/characters/{char.id}"
                >
                    {char.char_name}
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
</style>
