<script>
    export let max;

    let value = 0;
    
    const points = new Array(parseInt(max)).fill(0);
    
    function decrease(e) {
        e.preventDefault()
        if(value > 0) value--
        
        updatePoints()
    }

    function increase(e) {
        e.preventDefault()
        if(value < max) value++

        updatePoints()
    }

    function updatePoints() {
        for(let i=0; i<max; i++) {
            points[i] = i < value
        }
    }
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
    input {
        width: 100%;
        padding: 1rem;
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
    <button on:click={decrease}>-</button>
    
	{#each points as point}
        <div class={point ? 'point point--filled' : 'point'}></div>
	{/each}
    <div class="output">{value}</div>
    <button on:click={increase}>+</button>
</div>