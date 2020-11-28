<script>
    import { locale, locales } from 'svelte-i18n'
</script>

<style lang="scss">

    @import './vars.scss'; 

    select {
        font-size: 0.875rem;
        padding: 0.25rem;
        color: white;
        background: transparent;
        border: 1px solid rgba(255,255,255,0.3);
    }
    option {
        color: black;
    }
    
</style>

<div class="nav-item">
    <select bind:value={$locale}>
        {#each $locales as locale}
            <option value={locale}>{locale}</option>
        {/each}
    </select>
</div>