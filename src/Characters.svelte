<script>
    import { auth, firestore } from "firebase/app";
    import "firebase/firestore";
    import { _ } from "svelte-i18n";
	import { onDestroy } from 'svelte';
    import { userStore } from "./stores.js";
    import userCharsStore from "./stores/userCharsStore.js";
    

    import Tiles from "./ui/Tiles.svelte";
    import Modal from "./ui/Modal.svelte";

    export let location;

    const db = firestore();
    const dbChars = db.collection("characters");

    let chars = [];

    const currUser = auth().currentUser;
    const uid = currUser ? currUser.uid : null;

    const unsubscribe = {};

    unsubscribe.userCharsStore = userCharsStore.subscribe(value => {
        chars = value.map(data => ({
            id: data.id,
            name: data.name,
            avatar: data.avatar,
            meta: data.char_concept,
        }));
    });

    onDestroy(() => {
        for(let key in unsubscribe) {
            unsubscribe[key]();
        }
    });

    let textPromptActive = false;
    let newCharName = '';

    function openTextPrompt() {
        textPromptActive = true;
    }

    function closeTextPrompt() {
        textPromptActive = false;
    }
    function confirmTextPrompt() {
        
        const safeName = newCharName.trim();
        newCharName = '';

        if (!safeName.length) {
            alert($_("alert_empty_name"));
            return;
        }

        dbChars
            .add({
                name: safeName,
                owner: uid,
            })
            .then((ref) => {
                console.log("Added document with ID: ", ref.id);
            });
    }

</script>

<div class="section section--intro has-background-white">
    <div class="container">
        <div class="level">
            <h1 class="title">{$_("nav_my_characters")}</h1>

            {#if $userStore.isSignedIn}
                <div class="buttons">
                    <button class="button is-primary" on:click={openTextPrompt}>
                        <span class="icon is-small"><i class="fa fa-plus" /></span>
                        <span>{$_("char_create")}</span></button
                    >
                </div>
            {/if}
        </div>
    </div>
</div>


<div class="section">
    <div class="container">

        <Tiles {chars} empty={$_("char_none")} />
    </div>
</div>

{#if textPromptActive}
    <Modal title={$_("char_create")} confirm={$_("create")} on:close={closeTextPrompt} on:confirm={confirmTextPrompt}>
        <input class="input is-primary" type="text" placeholder={$_("name_placeholder")} bind:value={newCharName} autofocus />
    </Modal>
{/if}