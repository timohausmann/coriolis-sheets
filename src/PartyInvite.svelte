<script>
    import { _ } from "svelte-i18n";
    export let id;

    let input;

    const inviteUrl = `${location.origin}/parties/${id}/invite/`;

    function copy() {
        input.select();
        input.setSelectionRange(0, 99999); /* For mobile devices */

        document.execCommand("copy");
    }
</script>

<h2 class="subtitle">{$_("party_invite")}</h2>

<div class="block">
    <p>{$_("party_invite_text")}</p>
</div>

<div class="block">
<div class="field has-addons">
    <p class="control has-icons-left is-expanded">
        <input
            class="input"
            type="text"
            value={inviteUrl}
            readonly
            bind:this={input}
        />
        <span class="icon is-small is-left">
            <i class="fas fa-link" />
        </span>
    </p>
    <div class="control">
        <button class="button is-primary" on:click={copy}>
            <span class="icon is-small">
                <i class="fas fa-copy" />
            </span>
        </button>
    </div>
</div>
</div>