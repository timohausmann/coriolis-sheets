import { readable } from 'svelte/store';
import { auth, firestore } from "firebase/app";
import "firebase/firestore";
import { activePartyId } from '../stores';

let _activePartyId = '';
activePartyId.subscribe((value) => _activePartyId = value);


const userPartiesStore = readable([], function start(set) {

    const currUser = auth().currentUser;
    const unsubscribe = currUser ? storeParties(currUser.uid) : null;

    //get party data from all parties, that are listed in user/{userId}
    function storeParties(uid) {

        const db = firestore();
        const usersRef = db.collection("users");
        const partiesRef = db.collection("parties");

        let userParties = [];
        let unsubscribePartyIDs;

        return usersRef.doc(uid).onSnapshot(userSnapshot => {

            const partyIds = userSnapshot.data().parties;

            userParties = [];
            if (typeof unsubscribePartyIDs === 'function') unsubscribePartyIDs();

            unsubscribePartyIDs = partiesRef
                .where(firestore.FieldPath.documentId(), 'in', partyIds)
                //.orderBy("name") //throws an error
                .onSnapshot(partiesSnapshot => {

                    /*if (partiesSnapshot.empty) {
                        console.log("userPartiesStore: No matching documents.");
                    } else {
                        console.log(`userPartiesStore: Received query snapshot of size ${partiesSnapshot.size}`);
                    }*/

                    let i = 0;
                    partiesSnapshot.forEach((doc) => {
                        const partyData = {
                            id: doc.id,
                            ...doc.data()
                        };

                        userParties[i++] = partyData;
                    });

                    //sort by name
                    userParties.sort((a, b) => {
                        return a.name.charCodeAt(0) - b.name.charCodeAt(0);
                    })

                    set(userParties);

                    //set the active party
                    if (userParties.length > 0 && _activePartyId === '') {
                        activePartyId.set(userParties[0].id);
                    }
                },
                    (err) => {
                        console.log(`Encountered partiesSnapshot error: ${err}`);
                    }
                );
        },
            (err) => {
                console.log(`Encountered userSnapshot error: ${err}`);
            }
        );
    }

    //@todo end connection
    return function stop() {
        if (typeof unsubscribe === 'function') unsubscribe();
    }
});

export default userPartiesStore;