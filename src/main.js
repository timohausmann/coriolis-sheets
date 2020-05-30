import { initializeApp } from "firebase/app";
import "firebase/auth";
//import "firebase/firestore";

import App from './App.svelte';
import firebaseConfig from "./fbConfig";

// Initialize Firebase
initializeApp(firebaseConfig);

const app = new App({
	target: document.body,
	props: {}
});

export default app;