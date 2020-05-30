<script>
    import { firestore } from "firebase/app";
    import 'firebase/firestore';
    import Sheet from './coriolis/_sheet.svelte';

    let form;

    const db = firestore();
    
    function save(e) {

        e.preventDefault();

        const formData = new FormData(form);
        console.log(...formData);

        db.collection("characters").doc("LA").set({
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
</script>

<form action="/sheet/" method="post" bind:this={form}>
    <button type="submit" on:click={save}>Save</button>

    <Sheet />
</form>