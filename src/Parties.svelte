<script>
import { firestore } from "firebase/app";
import 'firebase/firestore';
import { Link } from "svelte-routing";
import { _ } from 'svelte-i18n';

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

  function newPartyPrompt() {
    window.alert('This feature is not available yet.');
    return;
    const name = window.prompt($_('party_input_name'))
    if(!name) return;

    const safeName = name.trim()
    if(!safeName.length) {
      alert($_('alert_empty_name'))
      return
    }

    const newParty = {
      name: name,
      roles: {}
    };
    newParty[uid] = 'owner';

    partiesRef.add(newParty).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
  }

</script>
<style>

</style>

<main class="content">

  <div class="actions">
    <button on:click={newPartyPrompt}>➕ {$_('party_create')}</button>
  </div>

  <div class="section">
    <h1 class="h2">{$_('nav_my_parties')}</h1>
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