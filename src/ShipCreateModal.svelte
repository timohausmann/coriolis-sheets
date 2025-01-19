<script>
    import { firestore } from "firebase/app";
    import "firebase/firestore";
	import { userStore } from './stores.js';
    import { _ } from "svelte-i18n";
    import Modal from "./ui/Modal.svelte";

    export let data = {};
    export let active = false;

    let newShipName = '';

    const db = firestore();
    const dbChars = db.collection("ships");
    
    function close() {
        active = false;
    }
    
    function confirm() {
        
        const safeName = newShipName.trim();
        newShipName = '';

        if (!safeName.length) {
            alert($_("alert_empty_name"));
            return;
        }

        dbChars
            .add({
                name: safeName,
                owner: $userStore.id,
                ...data,
            })
            .then((ref) => {
                console.log("Added document with ID: ", ref.id);
            });
    }

</script>

{#if active}
    <Modal title={$_("ship_create")} confirm={$_("create")} on:close={close} on:confirm={confirm}>
        <input class="input is-primary" type="text" placeholder={$_("ship_name_placeholder")} bind:value={newShipName} autofocus />
    </Modal>
{/if}