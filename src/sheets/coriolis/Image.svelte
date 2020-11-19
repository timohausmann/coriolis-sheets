<script>
    import { onDestroy } from 'svelte';
    import { storage } from "firebase/app";
    import "firebase/storage";
    import { currCharStore, unsavedChangesStore } from '../../stores.js'

    let objectUrl = ''; //the avatarURL ... https:// (firestore) or blob:// (new upload)
    let avatarValue = ''; //the hidden inputfield value (https, blob or 'delete')
    let fileInput; //the file input element
    let readonly = null;
    
    const storageRef = storage().ref();

    const unsubscribe = currCharStore.subscribe(value => {

        if(!value) return;
        
        readonly = value.readonly ? true : null;

        if(value.avatar) {
            storageRef.child(value.avatar).getDownloadURL().then(function(url) {
                objectUrl = avatarValue = url;
            });
        } else {
            objectUrl = avatarValue = '';
        }
    })
    
    function handleChange(e) {
        objectUrl = avatarValue = window.URL.createObjectURL(e.target.files[0]);
        unsavedChangesStore.set(true);
    }
    function handleRemove(e) {
        e.preventDefault();
        unsavedChangesStore.set(true);

        window.URL.revokeObjectURL(objectUrl)
        objectUrl = '';
        avatarValue = 'delete';
        fileInput.value = null;
    }

    onDestroy(() => {
        unsubscribe()
    })
</script>
<style lang="scss">
    .imageArea {
        position: relative;
    }
    .remove {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        font-size: 0.75rem;
    }
    img {
        display: block;
        width: 100%;
        height: auto;
    }
</style>

<div class="imageArea">
    {#if objectUrl} 
        <img src={objectUrl} alt="Character Avatar" bind:this={fileInput} />
        {#if !readonly}
            <button class="remove" on:click={handleRemove}>🗑️</button>
        {/if}
    {:else if !readonly}
        <input type="file" on:change={handleChange} />
    {/if}
    <input type="hidden" name="char_avatar" value={avatarValue} />
</div>