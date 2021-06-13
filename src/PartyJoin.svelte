<script>
    import { _ } from "svelte-i18n";
    import { auth } from "firebase/app";
    import { navigate } from "svelte-routing";
    import { hostUrl } from "./stores";

    export let queryDoc;

    const currUser = auth().currentUser;
    const uid = currUser ? currUser.uid : null;

    let name = '';
    let members = [];

    const unsubscribe = queryDoc.onSnapshot((snapshot) => {
        if (!snapshot.exists) {
            console.log("No matching documents.");
            return;
        }

        const data = snapshot.data();
        name = data.name;
        members = data.members;
    });

    function acceptInvite() {
        if(!uid) return;

        if(members.indexOf(uid) === -1) {
            members.push(uid);
            queryDoc
                .update({members})
                .then(() => {
                    navigate(`${hostUrl}/parties/${queryDoc.id}/`);
                })
        }
    }
</script>

<div class="box has-background-primary">
    <div class="level">
        <p class="has-text-white">
            <strong class="has-text-white">{$_("invitation")}</strong><br />
            {$_("party_invitation", { values: { partyName: name } })}
        </p>

        <button class="button is-white" on:click={acceptInvite}>
            <span class="icon is-small">
                <i class="fas fa-check" />
            </span>
            <span>{$_("party_invitation_accept")}</span>
        </button>
    </div>
</div>
