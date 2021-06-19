<script>
    import { locale, locales } from 'svelte-i18n'
    import Dropdown from "../ui/Dropdown.svelte";
</script>


<div class="navbar-item">
    <Dropdown
        label={$locale.toUpperCase()}
        options={$locales.map(l => ({
            label: l,
            onClick: () => { $locale = l }
        }))}
    />
</div>