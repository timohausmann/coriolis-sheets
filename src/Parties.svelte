<script>
    import { auth, firestore } from "firebase/app";
    import "firebase/firestore";
	import { onDestroy } from 'svelte';
    import { Link } from "svelte-routing";
    import { _ } from "svelte-i18n";
    import Tiles from "./ui/Tiles.svelte";
    import Modal from "./ui/Modal.svelte";
    import userPartiesStore from "./stores/userPartiesStore.js";

    export let location;

    let newPartyName = '';
    let textPromptActive = false;
    let parties = [];

    const db = firestore();
    const usersRef = db.collection("users");
    const partiesRef = db.collection("parties");

    const currUser = auth().currentUser;
    const uid = currUser ? currUser.uid : null;

    const unsubscribe = {};

    unsubscribe.userPartiesStore = userPartiesStore.subscribe(value => {
        parties = value.map(data => ({
            id: data.id,
            name: data.name
        }));
    });

    onDestroy(() => {
        for(let key in unsubscribe) {
            unsubscribe[key]();
        }
    });

    function confirmTextPrompt() {
        
        const safeName = newPartyName.trim();
        newPartyName = '';
        
        if (!safeName.length) {
            alert($_("alert_empty_name"));
            return;
        }

        const newParty = {
            name: safeName,
            owner: uid
        };

        partiesRef.add(newParty).then((ref) => {
            console.log("Added document with ID: ", ref.id);

            //add new party id to user
            const userPartyIds = parties.map(p => p.id);
            userPartyIds.push(ref.id);

            usersRef.doc(uid).update({
                parties: userPartyIds
            });
        });

    }

    function openTextPrompt() {
        textPromptActive = true;
    }

    function closeTextPrompt() {
        textPromptActive = false;
    }
</script>

<div class="section section--intro has-background-white">
    <div class="container">
        <div class="level">
            <h1 class="title">{$_("nav_my_parties")}</h1>

            <div class="buttons">
                <button class="button is-primary" on:click={openTextPrompt}>
                    <span class="icon is-small"><i class="fa fa-plus" /></span>
                    <span>{$_("party_create")}</span></button
                >
            </div>
        </div>
    </div>
</div>


<div class="section">
    <div class="container">

        <Tiles chars={parties} route="parties" empty={$_("party_none")} />
    </div>
</div>

{#if textPromptActive}
    <Modal title={$_("party_create")} confirm={$_("create")} on:close={closeTextPrompt} on:confirm={confirmTextPrompt}>
        <input class="input is-primary" type="text" placeholder={$_("party_name_placeholder")} bind:value={newPartyName} autofocus />
    </Modal>
{/if}

<style>
</style>
