<script>
	import TextField from './TextField.svelte';
    
    export let suffix
</script>

<div class="row group">
    <TextField className="flex-3" label="Name" name={'weap_name_'+ suffix} />
    <TextField className="flex-1" label="Bonus" name={'weap_bonus_'+ suffix} />
    <TextField className="flex-1" label="Ini" name={'weap_ini_'+ suffix} />
    <TextField className="flex-1" label="Schaden" name={'weap_dmg_'+ suffix} />
    <TextField className="flex-1" label="Krit" name={'weap_crit_'+ suffix} />
    <TextField className="flex-1" label="Reichw." name={'weap_range_'+ suffix} />
    <TextField className="flex-3" label="Anmerkung" name={'weap_comment_'+ suffix} />
</div>