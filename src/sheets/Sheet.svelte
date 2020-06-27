<script>
    import { auth, firestore } from "firebase/app";
    import 'firebase/firestore';
    import { setContext, onDestroy } from 'svelte'
    import { navigateTo } from 'svelte-router-spa'

    import CoriolisCharSheet from './coriolis/_sheet.svelte';
    import { currCharStore, unsavedChangesStore } from '../stores.js'

    export let params
    export let currentRoute
    
    let form;
    let charData = {};

    const db = firestore();    
    const dbChars = db.collection("characters");
    const queryDoc = dbChars.doc(currentRoute.namedParams.id)


    const observer = queryDoc.onSnapshot(snapshot => {
        //console.log('Received doc snapshot', snapshot);

        if(snapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        
        console.log('snapshot.data()', snapshot.data())

        charData = snapshot.data()
        
        currCharStore.set(charData);

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
            unsavedChangesStore.set(false);
        //    alert("Update successful!")
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


    function confirmLeave(e) {
        e.preventDefault()
        const msg = 'Du hast scheinbar ungespeicherte Änderungen, sicher dass du die Seite verlassen möchtest?'
        e.returnValue = msg
        return prompt
    }

    let leaveMsgBound = false
    const unsubscribe = unsavedChangesStore.subscribe(value => {

        console.log('Changed ...')

        if(value && !leaveMsgBound) {
            leaveMsgBound = true
            window.addEventListener('beforeunload', confirmLeave)
        } else {
            window.removeEventListener('beforeunload', confirmLeave)
            leaveMsgBound = false
        }
    })    

    onDestroy(() => {
        unsubscribe()
        unsavedChangesStore.set(false);
    })

</script>

<style lang="scss">

@import "../_vars.scss";

.actions {
    display: flex;
    justify-content: space-between;
}
.sheet {
    max-width: 960px;
    margin: 0 auto;
}

.notification {
    border-radius: 1rem;
    border: 2px solid #37453a;
    color: #abcbb8;
    background: black;
    padding: 0.25rem 1rem;
    transition: opacity 0.5s, transform 0.5s;
    
    &.hidden {
        transform: translateY(-25%);
        opacity: 0;
        
        @media #{$media-tablet-landscape-lt} {
            transform: translateX(-50%) translateY(-25%);
        }
    }

    @media #{$media-tablet-landscape-lt} {
        position: fixed;
        width: 90%;
        bottom: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        padding-bottom: 0.5rem;
        z-index: 100;
    }
}
</style>

<form action="/sheet/" method="post" bind:this={form}>
    <div class="actions">
        <button on:click={del}>🗑️ Charakter löschen</button>

        <div class={$unsavedChangesStore ? 'notification' : 'notification hidden'}>😲 Du hast ungespeicherte Änderungen</div>

        <button type="submit" on:click={save} disabled={!$unsavedChangesStore}>💾 Speichern</button>
    </div>    
    <div class="sheet">
        <CoriolisCharSheet />
    </div>
</form>