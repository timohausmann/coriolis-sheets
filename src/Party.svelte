<script>
  import { Navigate } from 'svelte-router-spa'
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
ul {
  list-style: none;
  margin: 2rem;
}
li :global(a) {
  display: inline-block;
  border: 1px solid #666;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>

<h1>Party Charaktere</h1>

{#if chars.length}
  <ul>
  {#each chars as char}
    <li>
      <Navigate to="/characters/{char.id}">{char.char_name}</Navigate>
    </li>
  {/each}
  </ul>
{:else}
  <p>Keine Charaktere vorhanden.</p>
{/if}
