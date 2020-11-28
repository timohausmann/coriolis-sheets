<script>
    import { Link } from "svelte-routing";
    import { firestore } from "firebase/app";
    import 'firebase/firestore';
    
    const db = firestore();

    export let handleNav
    
    /*let parties = [];
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
              ... doc.data(),
              //chars: []
          })
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });*/

    
    //@TODO collect chars per party
    let chars = [];
    const charactersRef = db.collection("characters");
    charactersRef
    .orderBy('char_name')
    .onSnapshot(snapshot => {

        if(snapshot.empty) {
            console.log("No matching documents.");
            return;
        }

        let i = 0;
        snapshot.forEach((doc) => {
            chars[i++] = {
                id: doc.id,
                char_name: doc.data().char_name
            };
        });

    }, err => {
        console.log(`Encountered error: ${err}`);
    });
    
</script>
<style>

</style>
{#each chars as char}
    <div class="nav-item" on:click={handleNav} data-href="/characters/{char.id}">
        {char.char_name}
    </div>
{/each}