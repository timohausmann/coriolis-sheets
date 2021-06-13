<script>
    import { Link } from "svelte-routing";
    import { _ } from "svelte-i18n";
    import CharBox from "./CharBox.svelte";

    export let route = 'characters';
    export let empty = $_("party_no_chars");
    export let chars = [];
</script>

{#key chars}
    {#if chars.length}
        <div class="tile is-ancestor" style="flex-wrap: wrap">
            {#each chars as char}
                <div class="tile tile is-parent is-6">
                    <div class="tile is-child">
                        <Link to={`/${route}/${char.id}`}>
                            <CharBox char={char} />
                        </Link>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>{empty}</p>
    {/if}
{/key}