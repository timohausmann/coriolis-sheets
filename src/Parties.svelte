<script>

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

<h1>Parties</h1>
<ul>
    {#each parties as party}
        <li>{party.name}</li>
    {/each}
</ul>