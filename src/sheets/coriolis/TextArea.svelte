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
    textarea {
        display: block;
        margin: 0;
        width: 100%;
        height: 100%;
        min-height: 6rem;
        border: none;
        padding-top: 0.75rem;
        resize: vertical;
    }
</style>

<div class="field {className}">
    <label>{label}</label>
    <textarea name={name} on:change={onChange} on:keydown={onChange}
        readonly={readonly}>{currField_value}</textarea>
</div>