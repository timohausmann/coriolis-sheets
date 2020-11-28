import { initializeApp, auth, analytics } from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import App from './App.svelte';
import firebaseConfig from "./fbConfig";
import { userStore } from './stores.js';
import './i18n.js';

// Initialize Firebase
initializeApp(firebaseConfig);
analytics();

auth().onAuthStateChanged(function (user) {
    if (user) {
        //console.log('We have a user!', user);
        userStore.set({
			isSignedIn: true,
			displayName: user.displayName,
			id: user.uid
		});
    } else {
        //console.log('We are not authed I guess!', user);
        userStore.set({
			isSignedIn: false,
			displayName: '',
			id: ''
		});
    }

	const app = new App({
		target: document.body,
		props: {}
	});
});