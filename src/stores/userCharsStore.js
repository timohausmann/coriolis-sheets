import { readable } from 'svelte/store';
import { auth, firestore } from "firebase/app";
import "firebase/firestore";

const userCharsStore = readable([], function start(set) {

    const currUser = auth().currentUser;
    const unsubscribe = currUser ? storeCharacters(currUser.uid) : null;

    function storeCharacters(uid) {
        const query = firestore()
            .collection("characters")
            .where("owner", "==", uid)
            .orderBy("name");

        let userChars = [];

        return query.onSnapshot(
            (snapshot) => {

                if (snapshot.empty) {
                    console.log("userCharsStore: No matching documents.");
                } else {
                    console.log(`userCharsStore: Received query snapshot of size ${snapshot.size}`);
                }

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

export default userCharsStore;