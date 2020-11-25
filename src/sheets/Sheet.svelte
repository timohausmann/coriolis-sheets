<script>
    import { auth, storage, firestore } from "firebase/app";
    import 'firebase/firestore';
    import 'firebase/storage';
    import { onDestroy } from 'svelte'
    import { navigate } from "svelte-routing";
    //import { v4 as uuidv4 } from 'uuid';

    import CoriolisCharSheet from './coriolis/_char.svelte';
    //import CoriolisShipSheet from './coriolis/_ship.svelte';
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
            
            //console.log('snapshot.data()', snapshot.data())

            charData = snapshot.data()
            charData.id = id;
            charData.readonly = charData.user !== userId;
            
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

        const queryDoc = dbChars.doc(id);
        const uid = auth().currentUser.uid;

        const formData = new FormData(form);
        const sheetData = {
            user: uid
        };
        let avatarBlobUrl = null;

        formData.forEach((value, key) => {
            if(!value) return;

            //extract file blobs to files
            /*if(key.indexOf('file_') === 0) {
                let fileKey = key.replace('file_', '');
                files[fileKey] = value;
                sheetData[key] = id
                return;
            }*/
            if(key === 'char_avatar') {
                if(value.indexOf('blob:') === 0) {
                    avatarBlobUrl = value;
                } else if(value === 'delete') {
                    //if we get a "delete" from char_avatar, null the field to delete it
                    sheetData.avatar = null;
                }
            }

            //parse ints
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

        /*if(Object.keys(files).length) {
            const storageRef = storage().ref();
            for(let key in files) {
                (async function() {
                    console.log('trying to upload', files[key]);
                    const blob = await fetch(files[key]).then(r => r.blob());
                    const fileRef = storageRef.child(`${key}/${id}.jpg`);
                    fileRef.put(blob).then(function(snapshot) {
                        console.log('Uploaded a blob!');
                    });
                })();
            }
        }*/

        if(avatarBlobUrl) {
            const storageRef = storage().ref();
            (async function() {
                console.log('trying to upload', avatarBlobUrl);
                const blob = await fetch(avatarBlobUrl).then(r => r.blob());
                const fileRef = storageRef.child(`avatar/${id}.jpg`);
                fileRef.put(blob).then(function(snapshot) {
                    //console.log('Uploaded a blob!');
                    snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        //console.log("File available at", downloadURL);
                        queryDoc.update({'avatar': `avatar/${id}.jpg`})
                    });
                    
                });
            })();
        }
        
        console.log('attempting to save sheet data ...', sheetData);

        queryDoc.update(sheetData)
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

        if(window.confirm(`Bist du sicher dass du ${charData.char_name} löschen möchtest? Dies kann nicht rückgängig gemacht werden!`)) {
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

.delete {
    cursor: pointer;
    padding: 0.4em;
    border-radius: 0.25rem;
    transition: background 0.2s;
    &:hover {
        background: rgba(255,0,0,0.2);
    }
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

<main class="content">
    <form action="/sheet/" method="post" bind:this={form}>
        <div class={$unsavedChangesStore ? 'notification' : 'notification hidden'}>😲 Du hast ungespeicherte Änderungen</div>
        {#if charData.user === userId}
            <div class="actions">
                <div class="delete" on:click={del}>🗑️ Charakter löschen</div>
                <button type="submit" on:click={save} disabled={!$unsavedChangesStore}>💾 Speichern</button>
            </div>    
        {/if}
        <div class="sheet">
            <CoriolisCharSheet />
        </div>
    </form>
</main>