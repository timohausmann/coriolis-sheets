<script>

import { Navigate } from 'svelte-router-spa'
import { firestore } from "firebase/app";
import 'firebase/firestore';

let parties = [];

const db = firestore();
const partiesRef = db.collection('parties');

partiesRef.get()
  .then(snapshot => {
    if(snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    parties = [];

    snapshot.forEach(doc => {
      //console.log(doc.id, '=>', doc.data());
      parties.push({
          id: doc.id,
          ... doc.data()
      })
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
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
}
</style>

<h1>Parties</h1>
<ul>
    {#each parties as party}
        <li>
          <Navigate to="/parties/{party.id}">{party.name}</Navigate>
        </li>
    {/each}
</ul>