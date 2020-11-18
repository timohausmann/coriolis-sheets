import { writable } from 'svelte/store';

export const userStore = writable({
    isSignedIn: false,
    displayName: '',
    id: ''
});

export const currCharStore = writable({
    char_name: 'CHAR_NAME',
    readonly: true
});

export const unsavedChangesStore = writable(false);