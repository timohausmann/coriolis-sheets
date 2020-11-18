<script>
    import { onDestroy } from 'svelte';
    import { currCharStore, unsavedChangesStore } from '../../stores.js'

    export let max;
    export let name;

    let currField_value = 0;
    let readonly = null;

    const fieldname = `${name}_points`;
    const points = new Array(parseInt(max)).fill(0);
    
    function decrease(e) {
        e.preventDefault()
        if(currField_value > 0) currField_value--
        
        updatePoints()
        unsavedChangesStore.set(true);
    }

    function increase(e) {
        e.preventDefault()
        if(currField_value < max) currField_value++

        updatePoints()
        unsavedChangesStore.set(true);
    }

    function updatePoints() {
        for(let i=0; i<max; i++) {
            points[i] = i < currField_value
        }
    }


    const unsubscribe = currCharStore.subscribe(value => {
        if(!value) return;
        readonly = value.readonly ? true : null;
        currField_value = value[fieldname] ? value[fieldname] : 0
        updatePoints()
    })

    onDestroy(() => {
        unsubscribe()
    })
</script>
<style>
	.field {
        justify-content: space-between;
        padding: 0.25rem;
        align-items: center;
    }
    button {
        width: 2rem;
    }
    .point {
        position: relative;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background: white;
    }
    .point::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.375rem;
        height: 0.375rem;
        transform: translateX(-50%) translateY(-50%) scale(0);
        border-radius: 50%;
        background: rgba(42, 54, 44, 0.9);
        transition: transform 0.25s;
    }
    .point--filled::after {
        transform: translateX(-50%) translateY(-50%) scale(1);
    }
    .output {
        width: 1.5rem;
        text-align: center;
    }
</style>

<div class="field row">
    
    <button on:click={decrease} disabled={readonly}>-</button>
    
	{#each points as point}
        <div class={point ? 'point point--filled' : 'point'}></div>
	{/each}
    <div class="output">{currField_value}</div>
    <button on:click={increase} disabled={readonly}>+</button>
    <input type="hidden" name={fieldname} value={currField_value} />
</div>