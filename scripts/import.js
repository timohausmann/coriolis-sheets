const admin = require('firebase-admin');

const collectionName = 'characters';
const importFile = 'characters-2021-06-17T09-23-40.json';
const importData = require(`./${importFile}`);

(async () => {

    /**
     * How to get your serviceAccountKey:
     * Go to https://console.firebase.google.com/
     * Open Project Settings > Service Accounts
     */
    var serviceAccount = require("./keys/coriolis-sheets.serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://coriolis-sheets.firebaseio.com"
    });

    const firestore = admin.firestore();
    const collectionRef = firestore.collection(collectionName);

    const querySnapshot = await collectionRef.get();
    if (querySnapshot.empty) {
        console.log(`Collection ${collectionName} is empty.`);
    } else {
        console.log(`Collection ${collectionName} is not empty.`);
        console.log('Found', querySnapshot.size, 'documents.');
    }

    //collect existing document IDs
    const existingIds = [];
    querySnapshot.forEach(function (documentSnapshot) {
        existingIds.push(documentSnapshot.id);
    });

    for (let id in importData) {

        //skip existing IDs
        if (existingIds.indexOf(id) > -1) {
            console.log(`Document ${id} already exists. Skipping ...`)
            continue;
        }

        collectionRef.doc(id).set(importData[id]).then(documentReference => {
            console.log(`✔ Created new document: ${id}`);
        });
    }
    
})();