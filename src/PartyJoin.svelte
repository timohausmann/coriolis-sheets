<script>
    import { _ } from "svelte-i18n";
    import { auth, firestore } from "firebase/app";
    import { onDestroy } from "svelte";
    import { navigate } from "svelte-routing";
    import userPartiesStore from "./stores/userPartiesStore.js";

    export let id;
    export let partyName;

    const db = firestore();
    const usersRef = db.collection("users");

    const currUser = auth().currentUser;
    const uid = currUser ? currUser.uid : null;

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

    let name = '';

    function acceptInvite() {

        const i = userPartiesIds.indexOf(id);
        if(i !== -1) return;

        userPartiesIds.push(id);

        //we cannot be sure that every user has a user doc right now, so use set
        usersRef.doc(uid)
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
        <p class="has-text-white">
            <strong class="has-text-white">{$_("invitation")}</strong><br />
            {$_("party_invitation", { values: { partyName } })}
        </p>

        <button class="button is-white" on:click={acceptInvite}>
            <span class="icon is-small">
                <i class="fas fa-check" />
            </span>
            <span>{$_("party_invitation_accept")}</span>
        </button>
    </div>
</div>
