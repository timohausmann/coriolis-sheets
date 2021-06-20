<script>
    import { _ } from "svelte-i18n";
	import { onDestroy } from 'svelte';
    import { userStore } from "./stores.js";
    import userCharsStore from "./stores/userCharsStore.js";
    import Tiles from "./ui/Tiles.svelte";
    import CharacterCreateModal from "./CharacterCreateModal.svelte";

    export let location;

    let chars = [];
    let textPromptActive = false;

    const unsubscribe = {};

    unsubscribe.userCharsStore = userCharsStore.subscribe(value => {
        chars = value.map(data => ({
            id: data.id,
            name: data.name,
            avatar: data.avatar,
            meta: data.char_concept,
        }));
    });

    onDestroy(() => {
        for(let key in unsubscribe) {
            unsubscribe[key]();
        }
    });

</script>

<div class="section section--intro has-background-white">
    <div class="container">
        <div class="level">
            <h1 class="title">{$_("nav_my_characters")}</h1>

            {#if $userStore.isSignedIn}
                <div class="buttons">
                    <button class="button is-primary" on:click={() => textPromptActive = true}>
                        <span class="icon is-small"><i class="fa fa-plus" /></span>
                        <span>{$_("char_create")}</span></button
                    >
                </div>
            {/if}
        </div>
    </div>
</div>


<div class="section">
    <div class="container">

        <Tiles {chars} empty={$_("char_none")} />
    </div>
</div>


<CharacterCreateModal bind:active={textPromptActive} />