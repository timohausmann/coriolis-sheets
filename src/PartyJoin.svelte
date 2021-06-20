<script>
    import { _ } from "svelte-i18n";
    import { firestore } from "firebase/app";
    import { onDestroy } from "svelte";
    import { navigate } from "svelte-routing";
    import { userStore } from "./stores.js";
    import userPartiesStore from "./stores/userPartiesStore.js";

    export let id;
    export let partyName;

    const db = firestore();
    const usersRef = db.collection("users");

    const unsubscribe = {};

    let userPartiesIds = [];
    unsubscribe.userPartiesStore = userPartiesStore.subscribe((value) => {
        userPartiesIds = value.map(p => p.id);
    });

    onDestroy(() => {
        for (let key in unsubscribe) {
            unsubscribe[key]();
        }
    });

    function acceptInvite() {

        const i = userPartiesIds.indexOf(id);
        if(i !== -1) return;

        userPartiesIds.push(id);

        //we cannot be sure that every user has a user doc right now, so use set
        usersRef.doc($userStore.id)
            .set({
                parties: userPartiesIds
            }, { merge: true })
            .then(() => {
                navigate(`${location.origin}/parties/${id}/`);
            })
            .catch(err => {
                console.log('Error while joining party', err);
            })
    }
</script>

<div class="box has-background-primary">
    <div class="level">
        <div>
            <p class="title has-text-white">{$_("invitation")}</p>
            <p class="subtitle has-text-white">
                {$_("party_invitation", { values: { partyName } })}
            </p>
        </div>

        {#if $userStore.isSignedIn}
            <button class="button is-white" on:click={acceptInvite}>
                <span class="icon is-small">
                    <i class="fas fa-check" />
                </span>
                <span>{$_("party_invitation_accept")}</span>
            </button>
        {/if}
    </div>
</div>

{#if !$userStore.isSignedIn}
    <div class="notification is-info">
        <strong>{$_('note')}:</strong>
            {$_('note_login_invite')}
    </div>
{/if}
