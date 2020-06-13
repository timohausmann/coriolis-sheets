import { writable } from 'svelte/store';

export const userStore = writable({
    isSignedIn: false,
    displayName: ''
});

export const currCharStore = writable({
    char_name: 'CHAR_NAME'
});