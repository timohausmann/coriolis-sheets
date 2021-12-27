<script>
	import { availableLanguages } from './../i18n.js';
    import { locale, locales } from 'svelte-i18n';
    import Dropdown from "../ui/Dropdown.svelte";

    function getLabel(code) {
        return availableLanguages[code] || code;
    }
</script>

<div class="navbar-item">
    <Dropdown
        label={$locale.toUpperCase()}
        options={$locales.map(l => ({
            label: getLabel(l),
            onClick: () => { $locale = l }
        }))}
    />
</div>

<style>
    @media screen and (max-width: 1023px) {
        .navbar-item {
            text-align: right;
        }
    }
</style>