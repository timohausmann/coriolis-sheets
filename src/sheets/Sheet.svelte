<script>
    import { auth, firestore } from "firebase/app";
    import 'firebase/firestore';
    import Sheet from './coriolis/_sheet.svelte';

    let form;

    const db = firestore();
    
    function save(e) {
        
        e.preventDefault();

        const uid = auth().currentUser.uid;

        const formData = new FormData(form);
        var sheetData = {
            user: uid
        };
        formData.forEach((value, key) => {
            if(value) sheetData[key] = value
        });
        console.log(sheetData);

        return false;

        db.collection("characters").doc(uid).set(sheetData)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
</script>

<style>
.sheet {
    max-width: 960px;
    margin: 0 auto;
}
</style>

<form action="/sheet/" method="post" bind:this={form}>
    <button type="submit" on:click={save}>Save</button>
    <div class="sheet">
        <Sheet />
    </div>
</form>