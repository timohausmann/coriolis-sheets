<script>
    import { Navigate } from 'svelte-router-spa'
    import { firestore } from "firebase/app";
    import 'firebase/firestore';
    
    let parties = [];
    let chars = [];
    let test = [];
    
    const db = firestore();
    const partiesRef = db.collection('parties');
    const charactersRef = db.collection("characters");
    
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
      });

    
    //@TODO collect chars per party
    charactersRef.onSnapshot(snapshot => {

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
            console.log(doc.data().char_name)
        });

    }, err => {
        console.log(`Encountered error: ${err}`);
    });
    
</script>
<style>

</style>

<ul>
    {#each test as t}
        <li>
            {t}
        </li>
    {/each}
</ul>
<ul>
    {#each parties as party}
        <!--Navigate to="/parties/{party.id}">{party.name}</Navigate-->
        <!--b>{party.name}</b-->
    {/each}
    {#each chars as char}
        <div class="faux-a">
            <Navigate to="/characters/{char.id}">{char.char_name}</Navigate>
        </div>
    {/each}
</ul>