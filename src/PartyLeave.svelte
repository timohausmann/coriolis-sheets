<script>
    import { _ } from "svelte-i18n";
    import { auth, firestore } from "firebase/app";
    import { onDestroy } from "svelte";
    import { navigate } from "svelte-routing";
    import { hostUrl } from "./stores";
    import userPartiesStore from "./stores/userPartiesStore.js";

    export let id;

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

    function leave() {

        const i = userPartiesIds.indexOf(id);
        if(i === -1) return;

        userPartiesIds.splice(i, 1);

        usersRef.doc(uid)
            .update({parties: userPartiesIds})
            .then(() => {
                navigate(`${hostUrl}/parties/${id}/invite/`);
            });

        //@todo remove all characters of this user from the party
    }
</script>

<h2 class="subtitle">{$_("party_leave")}</h2>

<button class="button is-danger" on:click={leave}>
    <span class="icon">
      <i class="fa fa-door-open"></i>
    </span>
    <span>{$_('party_leave')}</span>
</button>