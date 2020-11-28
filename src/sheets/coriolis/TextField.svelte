<script>
    import { onDestroy } from 'svelte';
    import { currCharStore, unsavedChangesStore } from '../../stores.js'

	export let label;
	export let name = '';
	export let className = ''; 
    
    let currField_value = ''
    let readonly = null;

    const unsubscribe = currCharStore.subscribe(value => {

        if(!value) return;
        
        readonly = value.readonly ? true : null;
        currField_value = value[name] ? value[name] : ''
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
        position: relative;
        padding: 0.125rem;
        color: #111;
    }
    label {
        position: absolute;
        top: 0.25rem;
        left: 0.25rem;
        font-size: 0.625rem;
        pointer-events: none;
    }
    input {
        display: block;
        margin: 0;
        width: 100%;
        border: none;
        padding-top: 0.75rem;
    }
</style>

<div class="field {className}">
    <label for={name}>{label}</label>
    <input id={name} type="text" name={name} value={currField_value} 
        readonly={readonly} on:change={onChange} on:keydown={onChange} />
</div>