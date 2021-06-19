<script>
    import { auth, storage, firestore } from 'firebase/app';
    import 'firebase/firestore';
    import 'firebase/storage';
    import { onDestroy } from 'svelte';
    import { Link, navigate } from 'svelte-routing';
    import { _ } from 'svelte-i18n';

    import Dropdown from '../ui/Dropdown.svelte';
    import CoriolisCharSheet from './coriolis/_char.svelte';
    import CoriolisShipSheet from './coriolis/_ship.svelte';
    import {
        userStore,
        currCharStore,
        unsavedChangesStore,
    } from '../stores.js';

    export let id = '';
    export let template = 'character'; //character, ship
    export let isDemo = false;

    const sheetConfig = {
        character: {
            db: 'characters',
            component: CoriolisCharSheet,
        },
        ship: {
            db: 'ships',
            component: CoriolisShipSheet,
        },
    };

    const currentSheet = sheetConfig[template];

    let form;
    let charData = {};
    let userId = '';
    let hasData = false;
    let isOwner = false;

    const unsubscribe = {};

    const db = firestore();
    const dbSheet = db.collection(currentSheet.db);

    //mark id as reactive
    //@todo this is doubled in Router (#key), find best way
    $: if (id) {
        getData();
        unsavedChangesStore.set(false);
    } else if (isDemo) {
        //allow typing for demo sheet
        currCharStore.set({ readonly: false });
    }

    function getData() {
        const queryDoc = dbSheet.doc(id);

        unsubscribe.queryDoc = queryDoc.onSnapshot(
            (snapshot) => {
                //console.log('getData Received doc snapshot', snapshot.exists, snapshot);

                hasData = snapshot.exists;

                if (!snapshot.exists) {
                    console.log('No matching documents.');
                    return;
                }

                charData = snapshot.data();
                isOwner = charData.owner === userId;

                charData.id = id;
                charData.readonly = !isOwner;
                currCharStore.set(charData);
            },
            (err) => {
                console.log(`Encountered error: ${err}`);
            }
        );
    }

    function save(e) {
        e.preventDefault();

        const queryDoc = dbSheet.doc(id);
        const uid = auth().currentUser.uid;

        const formData = new FormData(form);
        const sheetData = {
            owner: uid,
        };
        let avatarBlobUrl = null;

        formData.forEach((value, key) => {
            if (key === 'char_avatar') {
                if (value.indexOf('blob:') === 0) {
                    avatarBlobUrl = value;
                } else if (value === 'delete') {
                    //if we get a "delete" from char_avatar, null the field to delete it
                    sheetData.avatar = null;
                }
            }

            //parse ints
            if (parseInt(value) == value) {
                sheetData[key] = parseInt(value);
            } else {
                sheetData[key] = value;
            }
        });

        if (!sheetData.name || !sheetData.name.trim().length) {
            alert($_('alert_empty_name'));
            return;
        }

        if (avatarBlobUrl) {
            const storageRef = storage().ref();
            (async function () {
                console.log('trying to upload', avatarBlobUrl);
                const blob = await fetch(avatarBlobUrl).then((r) => r.blob());
                const fileRef = storageRef.child(`avatar/${id}.jpg`);
                fileRef.put(blob).then(function (snapshot) {
                    //console.log('Uploaded a blob!');
                    snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        //console.log("File available at", downloadURL);
                        queryDoc.update({ avatar: `avatar/${id}.jpg` });
                    });
                });
            })();
        }

        console.log('attempting to save sheet data ...', sheetData);

        queryDoc
            .update(sheetData)
            .then(function () {
                console.log('Document successfully written!');
                unsavedChangesStore.set(false);
            })
            .catch(function (error) {
                console.error('Error writing document: ', error);
                alert('Error writing document :(');
            });
    }

    function del(e) {
        e.preventDefault();

        if (
            window.confirm(
                $_('char_delete_confirm', {
                    values: { name: charData.name },
                })
            )
        ) {
            dbSheet.doc(id).delete();
            navigate('/characters');
        }
    }

    function confirmLeave(e) {
        e.preventDefault();
        e.returnValue = $_('confirm_unsaved_changes');
        return prompt;
    }

    let leaveMsgBound = false;
    unsubscribe.unsavedChangesStore = unsavedChangesStore.subscribe((value) => {
        if (isDemo) return;

        if (value && !leaveMsgBound) {
            leaveMsgBound = true;
            window.addEventListener('beforeunload', confirmLeave);
        } else {
            window.removeEventListener('beforeunload', confirmLeave);
            leaveMsgBound = false;
        }
    });
    unsubscribe.userStore = userStore.subscribe((value) => {
        userId = value.id;
    });

    onDestroy(() => {
        for (let key in unsubscribe) {
            unsubscribe[key]();
        }
        unsavedChangesStore.set(false);
    });
</script>

<form action="/sheet/" method="post" bind:this={form}>
    <div class="section section--intro has-background-white">
        <div class="container">
            <!-- Demo Notes -->
            {#if isDemo}
                {#if $userStore.isSignedIn}
                    <div class="notification is-info is-light">
                        <strong>Note:</strong>
                        this ist just an empty demo sheet. <Link
                            to="/characters"
                            >Go to characters to create a new sheet</Link
                        >.
                    </div>
                {:else}
                    <div class="notification is-info is-light">
                        <strong>Note:</strong>
                         you need to be logged in to save the sheet.
                    </div>
                {/if}
            {/if}

            <!-- Character not found -->
            {#if !hasData && !isDemo}
                <div class="block">
                    <h1 class="title">{$_('sheet_not_found')}</h1>
                </div>
                <h2 class="subtitle">
                    {$_('id_not_found_text')}
                </h2>
            {/if}

            <!-- Character headline + actions -->
            {#if hasData}
                <div class="level">
                    {#if charData.name}
                        <h1 class="title">{charData.name}</h1>
                    {/if}
                    {#if isOwner}
                        <div class="buttons">
                            <button
                                class="button is-primary"
                                type="submit"
                                on:click={save}
                                disabled={!$unsavedChangesStore}
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-save" />
                                </span>
                                <span>{$_('save')}</span>
                            </button>
                            <Dropdown
                                options={[
                                    {
                                        label: $_('char_delete'),
                                        icon: 'trash',
                                        onClick: del,
                                    },
                                ]}
                            />
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    </div>

    {#if hasData || isDemo}
        <div class="section">
            <div class="container">
                <div class="sheet">
                    <svelte:component this={currentSheet.component} />
                </div>
            </div>
        </div>
    {/if}
</form>

{#if isOwner}
    <div class={$unsavedChangesStore ? 'unsavedNote' : 'unsavedNote hidden'}>
        😲 {$_('unsaved_changes')}
    </div>
{/if}

<style lang="scss">
    @import '../_vars.scss';

    .container {
        max-width: 960px !important;
    }

    .sheet {
        margin-bottom: 4rem;
    }

    .unsavedNote {
        position: fixed;
        left: 50%;
        bottom: 1rem;
        transform: translateX(-50%);
        z-index: 100;

        border-radius: 1rem;
        border: 2px solid #37453a;
        color: #abcbb8;
        background: black;
        padding: 0.5rem 1rem;
        transition: opacity 0.5s, transform 0.5s;

        &.hidden {
            transform: translateX(-50%) translateY(-25%);
            opacity: 0;
        }

        @media #{$media-tablet-landscape-lt} {
            bottom: 0.5rem;
        }

        @media #{$media-mobile-landscape-lt} {
            width: 80%;
            text-align: center;
        }

        @media #{$media-tablet-landscape} {
            margin-left: 95px; //sidebar offset
        }
    }

    .buttons {
        justify-content: flex-end;
    }
</style>
