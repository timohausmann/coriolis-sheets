import { readable, writable } from 'svelte/store';
import { auth, firestore } from "firebase/app";
import "firebase/firestore";
import { activePartyId } from './stores';

let _activePartyId = '';
activePartyId.subscribe((value) => _activePartyId = value);

export const userCharsStore = readable([], function start(set) {

    const currUser = auth().currentUser;
    const unsubscribe = currUser ? storeCharacters(currUser.uid) : null;

    function storeCharacters(uid) {
        const query = firestore()
            .collection("characters")
            .where("user", "==", uid)
            .orderBy("char_name");

        let userChars = [];

        return query.onSnapshot(
            (snapshot) => {

                /*if (snapshot.empty) {
                    console.log("userCharsStore: No matching documents.");
                } else {
                    console.log(`userCharsStore: Received query snapshot of size ${snapshot.size}`);
                }*/

                userChars = [];
                let i = 0;
                snapshot.forEach((doc) => {
                    const charData = {
                        id: doc.id,
                        ...doc.data()
                    };

                    userChars[i++] = charData;
                });

                set(userChars);
            },
            (err) => {
                console.log(`Encountered error: ${err}`);
            }
        );
    }

    //@todo end connection
    return function stop() {
        if (typeof unsubscribe === 'function') unsubscribe();
    }
});

export const userPartiesStore = readable([], function start(set) {

    const currUser = auth().currentUser;
    const unsubscribe = currUser ? storeParties(currUser.uid) : null;

    function storeParties(uid) {
        const query = firestore()
            .collection("parties")
            .where("members", "array-contains", uid)
            .orderBy("name");

        let userParties = [];

        return query.onSnapshot(
            (snapshot) => {

                /*if (snapshot.empty) {
                    console.log("userPartiesStore: No matching documents.");
                } else {
                    console.log(`userPartiesStore: Received query snapshot of size ${snapshot.size}`);
                }*/

                userParties = [];
                let i = 0;
                snapshot.forEach((doc) => {
                    const partyData = {
                        id: doc.id,
                        ...doc.data()
                    };

                    userParties[i++] = partyData;
                });

                set(userParties);

                //set the active party
                if (userParties.length > 0 && _activePartyId === '') {
                    activePartyId.set(userParties[0].id);
                }
            },
            (err) => {
                console.log(`Encountered error: ${err}`);
            }
        );
    }

    //@todo end connection
    return function stop() {
        if (typeof unsubscribe === 'function') unsubscribe();
    }
});