<script>
    import { _ } from 'svelte-i18n';
    import TextField from './TextField.svelte';
    
    export let suffix
</script>

<div class="row group">
    <div class="flex-2">
        <TextField label={$_('sheet_name')} name={'eq_name_'+ suffix} />
    </div>
    <div class="flex-1">
        <TextField label={$_('sheet_bonus')} name={'eq_bonus_'+ suffix} />
    </div>
</div>