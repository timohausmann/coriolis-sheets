<script>
	import TextField from './TextField.svelte';
	export let min;
	export let max;
</script>
<style>
	.field {
        padding: 0.25rem;
        align-items: center;
    }
    input {
        width: 100%;
        padding: 1rem;
    }
    .output {
        text-align: center;
    }
</style>

<div class="field row">
    <input class="flex-3" type="range" min="{min}" max="{max}" value="0" />
    <div class="output flex-1">1</div>
</div>