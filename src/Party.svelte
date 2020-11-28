<script>
  import { Link } from "svelte-routing";
  import { firestore } from "firebase/app";
  import "firebase/firestore";
  import { onMount, onDestroy } from 'svelte';
  import Charlink from './Charlink.svelte';
  import { _ } from 'svelte-i18n';

  export let id;
  export let location;

  let chars = [];

  const db = firestore();
  const dbChars = db.collection("characters");
    
  const observer = dbChars.onSnapshot(snapshot => {
    console.log(`Received query snapshot of size ${snapshot.size}`);

    chars = [];

    if(snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach(doc => {
      
      const data = doc.data();
      chars.push({
        id: doc.id,
        name: data.char_name,
        avatar: data.avatar
      });
    });

  }, err => {
    console.log(`Encountered error: ${err}`);
  });
</script>
<style>

</style>

<main class="content">
  <div class="section">
    <h1 class="h2">{$_('party_chars')}</h1>

    {#if chars.length}
      <ul class="itemlist">
      {#each chars as char}
        <li>
          <Charlink id={char.id} name={char.name} avatar={char.avatar} />
        </li>
      {/each}
      </ul>
    {:else}
      <p>{$_('party_no_chars')}</p>
    {/if}
  </div>

</main>