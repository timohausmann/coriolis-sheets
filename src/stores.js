import { writable } from 'svelte/store';

export const userStore = writable({
    isSignedIn: false,
    displayName: '',
    id: ''
});

export const currCharStore = writable({
    name: '',
    readonly: true
});

export const activePartyId = writable('');

export const unsavedChangesStore = writable(false);

export const mainMenuOpen = writable(false);