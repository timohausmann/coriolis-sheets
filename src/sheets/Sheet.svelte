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
        var sheetData = {};
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

<form action="/sheet/" method="post" bind:this={form}>
    <button type="submit" on:click={save}>Save</button>

    <Sheet />
</form>