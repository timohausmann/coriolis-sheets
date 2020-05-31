<script>

import { auth, firestore } from "firebase/app";
import 'firebase/firestore';

//import { userStore } from './stores.js';


const uid = auth().currentUser.uid;
console.log(uid);

let chars = [];

const db = firestore();
const partiesRef = db.collection('characters');

partiesRef.get().where('user', '==', uid)
  .then(snapshot => {
    if(snapshot.empty) {
      console.log('No matching documents.');
      return;
    }  

    chars = [];

    snapshot.forEach(doc => {
      chars.push({
          id: doc.id,
          ... doc.data()
      })
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

</script>

<h1>Meine Charaktere</h1>
