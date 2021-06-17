const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const collectionName = 'characters';

(async () => {

    /**
     * How to get your serviceAccountKey:
     * Go to https://console.firebase.google.com/
     * Open Project Settings > Service Accounts
     */
    var serviceAccount = require("./keys/coriolis-86cdc.serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://coriolis-86cdc.firebaseio.com"
    });

    const firestore = admin.firestore();
    const collectionRef = firestore.collection(collectionName);

    const querySnapshot = await collectionRef.get();
    if (querySnapshot.empty) {
        console.log(`Collection ${collectionName} is empty.`);
        return;
    }

    console.log('Found', querySnapshot.size, 'documents.');

    const json = {};

    querySnapshot.forEach(function (documentSnapshot) {
        json[documentSnapshot.id] = documentSnapshot.data();
    });

    const now = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
    const filePath = path.resolve(`./${collectionName}-${now}.json`);

    console.log('writing file to', filePath, '...')

    await fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
        if (err) console.log(err);
    });

})();