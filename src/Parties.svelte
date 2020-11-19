<script>
import { firestore } from "firebase/app";
import 'firebase/firestore';
import { Link } from "svelte-routing";

export let location

let parties = [];

const db = firestore();
const partiesRef = db.collection('parties');

partiesRef
  .orderBy('name')
  .get()
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

</style>

<main class="content">
  <div class="section">
    <h1 class="h2">Parties</h1>
    <ul class="itemlist">
        {#each parties as party}
            <li>
              <Link to="/parties/{party.id}">
                <div class="avatar"></div>
                {party.name}
              </Link>
            </li>
        {/each}
    </ul>
  </div>
</main>