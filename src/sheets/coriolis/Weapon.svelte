<script>
    import { _ } from 'svelte-i18n';
	import TextField from './TextField.svelte';
    
    export let suffix
</script>
<style>
    .weapon {
        flex-wrap: wrap;
        flex-direction: row;
    }
</style>

<div class="row group weapon">
    <TextField className="flex-3 mobile-full" label={$_('sheet_name')} name={'weap_name_'+ suffix} />
    <TextField className="flex-1" label={$_('sheet_bonus')} name={'weap_bonus_'+ suffix} />
    <TextField className="flex-1" label={$_('sheet_ini')} name={'weap_ini_'+ suffix} />
    <TextField className="flex-1" label={$_('sheet_damage')} name={'weap_dmg_'+ suffix} />
    <TextField className="flex-1" label={$_('sheet_crit')} name={'weap_crit_'+ suffix} />
    <TextField className="flex-1" label={$_('sheet_range')} name={'weap_range_'+ suffix} />
    <TextField className="flex-3 mobile-full" label={$_('sheet_note')} name={'weap_comment_'+ suffix} />
</div>