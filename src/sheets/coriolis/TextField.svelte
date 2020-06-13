<script>
    import { onDestroy } from 'svelte';
    import { currCharStore } from '../../stores.js'

	export let label;
	export let name = '';
	export let className = ''; 
    
    let currField_value = ''
    const unsubscribe = currCharStore.subscribe(value => {

        if(!value) return;
        
        currField_value = value[name] ? value[name] : ''
    })

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
    }
</style>

<div class="field {className}">
    <label>{label}</label>
    <input type="text" name={name} value={currField_value} />
</div>