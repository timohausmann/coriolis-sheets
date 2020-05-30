import { writable } from 'svelte/store';

export const userStore = writable({
    isSignedIn: false,
    displayName: ''
});