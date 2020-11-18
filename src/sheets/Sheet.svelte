<script>
    import { auth, firestore } from "firebase/app";
    import 'firebase/firestore';
    import { setContext, beforeUpdate, onDestroy } from 'svelte'
    import { navigate } from "svelte-routing";


    import CoriolisCharSheet from './coriolis/_sheet.svelte';
    import { userStore, currCharStore, unsavedChangesStore } from '../stores.js'

    export let id
    
    let form;
    let charData = {};
    let userId = '';

    const db = firestore();    
    const dbChars = db.collection("characters");

    $: if (id) { //watch id for changes
        getData(); //invoke your method to reload data
        unsavedChangesStore.set(false);
    }

    function getData() {

        const queryDoc = dbChars.doc(id)
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
    }


    /*beforeUpdate(function() {
        console.log('beforeUpdate');
    })*/

    
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

            navigate('/characters')
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

        if(value && !leaveMsgBound) {
            leaveMsgBound = true
            window.addEventListener('beforeunload', confirmLeave)
        } else {
            window.removeEventListener('beforeunload', confirmLeave)
            leaveMsgBound = false
        }
    })
    const unsubscribe2 = userStore.subscribe(value => {
        userId = value.id
    });

    onDestroy(() => {
        unsubscribe()
        unsubscribe2()
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
    margin: 0 auto 4rem;
}

.notification {
    position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    z-index: 100;
    
    border-radius: 1rem;
    border: 2px solid #37453a;
    color: #abcbb8;
    background: black;
    padding: 0.5rem 1rem;
    transition: opacity 0.5s, transform 0.5s;
    
    &.hidden {
        transform: translateX(-50%) translateY(-25%);
        opacity: 0;
    }

    @media #{$media-tablet-landscape-lt} {
        bottom: 0.5rem;
    }

    @media #{$media-mobile-landscape-lt} {
        width: 80%;
        text-align: center;
    }

    @media #{$media-tablet-landscape} {
        margin-left: 95px; //sidebar offset
    }
}
</style>

<form action="/sheet/" method="post" bind:this={form}>
    <div class={$unsavedChangesStore ? 'notification' : 'notification hidden'}>😲 Du hast ungespeicherte Änderungen</div>
    {#if charData.user === userId}
        <div class="actions">
            <button on:click={del}>🗑️ Charakter löschen</button>
            <button type="submit" on:click={save} disabled={!$unsavedChangesStore}>💾 Speichern</button>
        </div>    
    {/if}
    <div class="sheet">
        <CoriolisCharSheet />
    </div>
</form>