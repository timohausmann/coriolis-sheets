import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./fbConfig";

import App from './App.svelte';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = new App({
	target: document.body,
	props: {}
});

export default app;