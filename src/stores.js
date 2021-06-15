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

//@ŧodo env
//export const hostUrl = 'https://coriolis-86cdc.web.app';
export const hostUrl = 'http://localhost:5000';