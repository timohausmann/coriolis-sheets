<script>
  import { auth, firestore } from "firebase/app";
  import "firebase/firestore";

  //import { onMount, onDestroy } from 'svelte';
  import Charlink from './Charlink.svelte';

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

      const data = doc.data();
      const charData = {
        id: doc.id,
        name: data.char_name,
        avatar: data.avatar
      };

      chars[i++] = charData;
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

<main class="content">

  <div class="actions">
    <button on:click={newCharPrompt}>➕ Neuen Charakter erstellen</button>
  </div>

  <div class="section">
    <h1 class="h2">Meine Charaktere</h1>

    {#if chars.length}
      <ul class="itemlist">
      {#each chars as char}
        <li>
          <Charlink id={char.id} name={char.name} avatar={char.avatar} />
        </li>
      {/each}
      </ul>
    {:else}
      <p class="p">Du hast noch keine Charaktere.</p>
    {/if}
  </div>
</main>