<script>
    import { _ } from "svelte-i18n";
    import { auth } from "firebase/app";
    import { navigate } from "svelte-routing";
    import { hostUrl } from "./stores";

    export let queryDoc;

    const currUser = auth().currentUser;
    const uid = currUser ? currUser.uid : null;

    

    let members = [];

    const unsubscribe = queryDoc.onSnapshot((snapshot) => {
        if (!snapshot.exists) {
            console.log("No matching documents.");
            return;
        }

        const data = snapshot.data();
        members = data.members;
    });

    function leave() {
        if(!uid) return;

        const i = members.indexOf(uid);
        if(i === -1) return;

        members.splice(i, 1);
        queryDoc
            .update({members})
            .then(() => {
                navigate(`${hostUrl}/parties/${queryDoc.id}/invite/`);
            });

    }
</script>

<h2 class="subtitle">{$_("party_leave")}</h2>

<button class="button is-danger" on:click={leave}>
    <span class="icon">
      <i class="fa fa-door-open"></i>
    </span>
    <span>{$_('party_leave')}</span>
</button>