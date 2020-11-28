<script>
    import { onDestroy } from 'svelte';
    import { currCharStore, unsavedChangesStore } from '../../stores.js'

    export let label;
    export let max = 99;
    export let name = '';
    
    let currField_value = ''
    let readonly = null;

    const unsubscribe = currCharStore.subscribe(value => {

        if(!value) return;
        readonly = value.readonly ? true : null;
        currField_value = value[name] ? parseInt(value[name]) : ''
    })

    function onChange(e) {
        if(readonly) return;
        unsavedChangesStore.set(true);
    }

    onDestroy(() => {
        unsubscribe()
    })

</script>

<style>
	.field {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.2);
        color: #111;
        padding: 0.25rem;
        margin: 0 0.25rem;
    }
    .field:last-child {
        border-bottom: none;
    }
    label {
        line-height: 1;
    }
    input {
        margin: 0;
        width: 3.5rem;
        border-radius: 0.25rem;
        border: none;
    }
</style>

<div class="field">
    <label for={name}>{label}</label>
    <input id={name} type="number" name={name} min="0" max={max} value={currField_value}
        readonly={readonly} on:change={onChange} on:keydown={onChange} />
</div>