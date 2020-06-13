<script>
    import { auth, firestore } from "firebase/app";
    import 'firebase/firestore';
    import { setContext } from 'svelte'
    import { navigateTo } from 'svelte-router-spa'

    import CoriolisCharSheet from './coriolis/_sheet.svelte';
    import { currCharStore } from '../stores.js'

    export let params
    export let currentRoute
    
    let form;
    let charData = {};

    console.log('currentRoute.namedParams.id', currentRoute.namedParams.id)

    const db = firestore();

    
    const dbChars = db.collection("characters");
    const queryDoc = dbChars.doc(currentRoute.namedParams.id)


    const observer = queryDoc.onSnapshot(snapshot => {
        console.log('Received doc snapshot', snapshot);

        if(snapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        
        console.log('snapshot.data()', snapshot.data())

        charData = snapshot.data()
        
        currCharStore.set(charData);

        //setContext('charData', charData)

    }, err => {
    console.log(`Encountered error: ${err}`);
    });






    
    function save(e) {
        
        e.preventDefault();

        const uid = auth().currentUser.uid;

        const formData = new FormData(form);
        var sheetData = {
            user: uid
        };
        formData.forEach((value, key) => {
            if(!value) return;

            //dont store ints as strings
            if(parseInt(value) == value) {
                sheetData[key] = parseInt(value)
            } else {
                sheetData[key] = value
            }
            
        });

        if(!sheetData.char_name || !sheetData.char_name.trim().length) {
            alert('Dein Charakter-Name darf nicht leer sein.')
            return;
        }


        console.log('attempting to save sheet data ...', sheetData);

        queryDoc.set(sheetData)
        .then(function() {
            console.log("Document successfully written!");
            alert("Update successful!")
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            alert("Error writing document :(")
        });
    }
    
    function del(e) {
        
        e.preventDefault();

        if(window.confirm(`Bist du sicher dass du ${charData.char_name} löschen möchtest? Dies kann nicht rückgängig gemacht werden.`)) {
            queryDoc.delete();

            navigateTo('characters')
        }
    }
</script>

<style>
.sheet {
    max-width: 960px;
    margin: 0 auto;
}
</style>

<form action="/sheet/" method="post" bind:this={form}>
    <div class="actions">
        <button type="submit" on:click={save}>💾 Save</button>
        <button on:click={del}>🗑️ Delete Character</button>
    </div>    
    <div class="sheet">
        <CoriolisCharSheet />
    </div>
</form>