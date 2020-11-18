<script>
  import { Link } from "svelte-routing";
  import { firestore } from "firebase/app";
  import "firebase/firestore";
  import { onMount, onDestroy } from 'svelte';

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
      chars.push({
        id: doc.id,
        ...doc.data()
      });
    });

  }, err => {
    console.log(`Encountered error: ${err}`);
  });
</script>
<style>

</style>

<h1>Party Charaktere</h1>

{#if chars.length}
  <ul class="itemlist">
  {#each chars as char}
    <li>
      <Link to="/characters/{char.id}">{char.char_name}</Link>
    </li>
  {/each}
  </ul>
{:else}
  <p>Keine Charaktere vorhanden.</p>
{/if}
