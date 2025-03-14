<script>
    import { auth, firestore } from "firebase/app";
    import "firebase/firestore";
    import { navigate } from "svelte-routing";
    import { onDestroy } from "svelte";
    import userCharsStore from "./stores/userCharsStore.js";
    import userPartiesStore from "./stores/userPartiesStore.js";
    import Tiles from "./ui/Tiles.svelte";
    import Modal from "./ui/Modal.svelte";
    import Dropdown from "./ui/Dropdown.svelte";
    import { _ } from "svelte-i18n";

    import CharacterCreateModal from "./CharacterCreateModal.svelte";
    import PartyJoin from "./PartyJoin.svelte";
    import PartyInvite from "./PartyInvite.svelte";
    import PartyLeave from "./PartyLeave.svelte";
    import ShipCreateModal from "./ShipCreateModal.svelte";

    export let id;
    export let isInvite = false;
    export let location;

    const currUser = auth().currentUser;
    const uid = currUser ? currUser.uid : null;

    let partyName = ""; //current name
    let isMember = false;
    let isOwner = false;

    let newPartyName = ""; //text prompt input
    let textPromptActive = false;
    let dangerPromptActive = false;
    let selectCharPromptActive = false;
    let createCharPromptActive = false;
    let createShipPromptActive = false;

    let userChars = [];
    let userParties = [];
    let userCharsInParty = [];
    let chars = [];
    let ships = [];

    const db = firestore();
    const dbChars = db.collection("characters");
    const dbShips = db.collection("ships");
    const partiesRef = db.collection("parties");
    const queryDoc = partiesRef.doc(id);

    const unsubscribe = {};

    unsubscribe.queryDoc = queryDoc.onSnapshot((snapshot) => {
        if (!snapshot.exists) {
            console.log("No matching documents.");
            return;
        }
        const data = snapshot.data();
        partyName = data.name;

        isOwner = data.owner === uid;
        
        //@todo make this into a component or sth
        const charsQuery = dbChars
            .where("char_parties", "array-contains", id)
            .orderBy("name");
        const shipsQuery = dbShips
            .where("ship_party", "==", id)
            .orderBy("name");

        unsubscribe.charsQuery = charsQuery.onSnapshot(
            (snapshot) => {
                console.log(`Received query snapshot of size ${snapshot.size}`);

                chars = [];

                if (snapshot.empty) {
                    console.log("No matching documents.");
                    return;
                }

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    chars.push({
                        id: doc.id,
                        name: data.name,
                        avatar: data.avatar,
                        meta: data.char_concept,
                    });
                });
            },
            (err) => {
                console.log(`Encountered error: ${err}`);
            }
        );

        unsubscribe.shipsQuery = shipsQuery.onSnapshot(
            (snapshot) => {
                console.log(`Received query snapshot of size ${snapshot.size}`);

                ships = [];

                if (snapshot.empty) {
                    console.log("No matching documents.");
                    return;
                }

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    ships.push({
                        id: doc.id,
                        name: data.name,
                        avatar: "",
                        meta: data.shipyard,
                    });
                });
            },
            (err) => {
                console.log(`Encountered error: ${err}`);
            }
        );
    });

    unsubscribe.userCharsStore = userCharsStore.subscribe((value) => {
        userChars = value;

        userCharsInParty = value.filter((el) => {
            if (!el.char_parties || el.char_parties.length === 0) return false;
            return el.char_parties.indexOf(id) !== -1;
        });
        userCharsInParty = userCharsInParty.map((el) => el.id);
    });

    unsubscribe.userPartiesStore = userPartiesStore.subscribe((value) => {
        userParties = value;

        const userPartiesIds = userParties.map(p => p.id);
        isMember = userPartiesIds.indexOf(id) !== -1;
    });

    /*unsubscribe.activePartyId = activePartyId.subscribe((value) => {
        if($activePartyId !== id) {
            navigate(`/parties/${$activePartyId}`);
        }
    })*/

    onDestroy(() => {
        for (let key in unsubscribe) {
            unsubscribe[key]();
        }
    });

    function openCharPrompt() {
        selectCharPromptActive = true;
    }
    function closeCharPrompt() {
        selectCharPromptActive = false;
    }
    function confirmCharPrompt() {
        for (let char of userChars) {
            const char_parties = char.char_parties || [];

            const charInSelection = userCharsInParty.indexOf(char.id);
            const partyInDatabase = char_parties.indexOf(id);

            //wenn aktueller Char ausgewählt ist && nicht im char_parties array ...
            if (charInSelection > -1 && partyInDatabase === -1) {
                char_parties.push(id);
            } else if (charInSelection === -1 && partyInDatabase > -1) {
                char_parties.splice(partyInDatabase, 1);
            }

            dbChars.doc(char.id).update({ char_parties });
        }
    }

    function openShipPrompt() {
        createShipPromptActive = true;
    }

    function openDangerPrompt() {
        dangerPromptActive = true;
    }

    function closeDangerPrompt() {
        dangerPromptActive = false;
    }
    function confirmDangerPrompt() {
        queryDoc.delete();
        navigate("/parties");

        //@todo remove this party from all users
    }

    function openTextPrompt() {
        textPromptActive = true;
    }

    function closeTextPrompt() {
        textPromptActive = false;
    }
    function confirmTextPrompt() {
        const safeName = newPartyName.trim();
        if (!safeName.length) {
            alert($_("alert_empty_name"));
            return;
        }

        queryDoc.update({ name: safeName }).then(function () {
            console.log("Document successfully written!");
        });
    }

    function handleCreateCharacter() {
        closeCharPrompt();

        createCharPromptActive = true;
    }
</script>

<div class="section section--intro has-background-white">
    <div class="container">
        <div class="level">
            <h1 class="title">{partyName}</h1>

            {#if isOwner}
                <Dropdown
                    label="Admin Actions"
                    options={[
                        {
                            label: $_("rename"),
                            icon: "pen",
                            onClick: openTextPrompt,
                            divider: true,
                        },
                        {
                            label: $_("delete"),
                            icon: "trash",
                            onClick: openDangerPrompt,
                        },
                    ]}
                />
            {/if}
        </div>
    </div>
</div>


<div class="section">
    <div class="container">

        {#if !isMember && isInvite}
            <PartyJoin {id} {partyName} />
        {/if}

        <div class="level">
            <h2 class="title is-4">{$_("party_chars")}</h2>
            {#if isMember}
                <div class="buttons">
                    <button 
                        class="button is-primary" 
                        on:click={openCharPrompt}
                        >
                        <span class="icon is-small">
                            <i class="fa fa-plus" />
                        </span>
                        <span> {$_("party_add_char")}</span>
                    </button>
                </div>
            {/if}
        </div>

        <Tiles {chars} />

        <hr class="has-background-grey-lighter" />

        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <h2 class="title is-4">{$_("party_ships")}</h2>
                </div>
                <div class="level-item">
                    <span class="tag is-info is-uppercase new">{$_("new")}</span>
                </div>
            </div>
            {#if isMember}
                <div class="level-right">
                    <div class="buttons">
                        <button 
                            class="button is-primary"
                            on:click={openShipPrompt}
                            >
                            <span class="icon is-small">
                                <i class="fa fa-plus" />
                            </span>
                            <span>{$_("ship_create")}</span>
                        </button>
                    </div>
                </div>
            {/if}
        </div>

        <Tiles
            chars={ships}
            route="ships"
            empty={$_("party_no_ships")}
        />

        <hr class="has-background-grey-lighter" />

        <!--h2 class="subtitle">{$_("party_members")}</h2>

        <p><em>Not yet implemented.</em></p>

        <hr /-->

        {#if isMember}
            <PartyInvite {id} />

            <hr class="has-background-grey-lighter" />

            <PartyLeave {id} />
        {/if}
    </div>
</div>

{#if selectCharPromptActive}
    <Modal
        title={$_("party_add_char")}
        on:close={closeCharPrompt}
        on:confirm={confirmCharPrompt}
    >
        <div class="block">
            <p class="has-text-grey">
                {$_("party_manage_chars", { values: { partyName } })}
            </p>
        </div>
        <div class="block">
            {#if $userCharsStore.length}
                <div class="columns is-multiline is-mobile">
                    {#each $userCharsStore as char}
                        <div class="column is-one-third">
                            <label class="checkbox" title={char.name}>
                                <input
                                    type="checkbox"
                                    bind:group={userCharsInParty}
                                    value={char.id}
                                />
                                {char.name}
                            </label>
                        </div>
                    {/each}
                </div>
            {:else}
                <p>{$_("char_none")}</p>
            {/if}
        </div>
        <div class="block">
            <button class="button is-link is-inverted" on:click={handleCreateCharacter}>{$_("char_create")}</button>
        </div>
    </Modal>
{/if}

{#if textPromptActive}
    <Modal
        title={$_("rename")}
        confirm={$_("rename")}
        on:close={closeTextPrompt}
        on:confirm={confirmTextPrompt}
    >
        <input
            class="input is-primary"
            type="text"
            placeholder={partyName}
            bind:value={newPartyName}
            autofocus
        />
    </Modal>
{/if}

{#if dangerPromptActive}
    <Modal
        title={$_("delete")}
        confirm={$_("delete")}
        danger={true}
        on:close={closeDangerPrompt}
        on:confirm={confirmDangerPrompt}
    >
        <p>{$_("party_delete_warning", { values: { partyName } })}</p>
    </Modal>
{/if}

<CharacterCreateModal bind:active={createCharPromptActive} data={{ char_parties: [id] }} />
<ShipCreateModal bind:active={createShipPromptActive} data={{ ship_party: id }} />

<style>
    label.checkbox {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
    .new {
        rotate: -2.5deg;
        animation: new 0.5s infinite alternate;
    }
    @keyframes new {
        0% {
            scale: 1;
        }
        100% {
            scale: 1.1;
        }
    }
</style>
