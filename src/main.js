import { initializeApp, auth } from "firebase/app";

import App from './App.svelte';
import firebaseConfig from "./fbConfig";
import { isSignedIn } from './stores.js';

// Initialize Firebase
initializeApp(firebaseConfig);

auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('We have a user!', user);
        isSignedIn.set(true);
    } else {
        console.log('We are not authed I guess!', user);
        isSignedIn.set(false);
    }
});

const app = new App({
	target: document.body,
	props: {}
});

export default app;