<script>
    import TextField from './TextField.svelte';
    
    export let suffix
</script>

<div class="row group">
    <div class="flex-2">
        <TextField label="Name" name={'eq_name_'+ suffix} />
    </div>
    <div class="flex-1">
        <TextField label="Bonus" name={'eq_bonus_'+ suffix} />
    </div>
</div>