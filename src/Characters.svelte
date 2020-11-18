<script>
  import { Link } from 'svelte-routing'
  import { auth, firestore } from "firebase/app";
  import "firebase/firestore";
  import { onMount, onDestroy } from 'svelte';

  export let location

  //import { userStore } from './stores.js';

  const currUser = auth().currentUser;
  const uid = currUser ? currUser.uid : null;

  let chars = [];

  const db = firestore();
  const dbChars = db.collection("characters");

  const query = dbChars.where("user", "==", uid)

    
  const observer = query.onSnapshot(snapshot => {
    console.log(`Received query snapshot of size ${snapshot.size}`);

    chars = [];

    if(snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    let i=0;
    snapshot.forEach(doc => {
      chars[i++] = {
        id: doc.id,
        ...doc.data()
      };
    });


  }, err => {
    console.log(`Encountered error: ${err}`);
  });

  function newCharPrompt() {
    const name = window.prompt('Bitte gib den Namen deines Charakters ein.')
    const safeName = name.trim()

    if(!safeName.length) {
      alert('Comon, dein Name darf nicht leer sein.')
      return
    }

    let addDoc = dbChars.add({
      char_name: name,
      user: uid
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
  }
</script>
<style>

</style>

<h1>Meine Charaktere</h1>

<div class="actions">
  <button on:click={newCharPrompt}>➕ Neuen Charakter erstellen</button>
</div>

{#if chars.length}
  <ul class="itemlist">
  {#each chars as char}
    <li>
      <Link to="/characters/{char.id}">{char.char_name}</Link>
    </li>
  {/each}
  </ul>
{:else}
  <p>Du hast noch keine Charaktere.</p>
{/if}
