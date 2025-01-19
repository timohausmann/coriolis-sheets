<script>
    import Field from './Field.svelte';
    import Points from './Points.svelte';

    export let max = 99;
    export let rows = 1;
    export let label;
    export let name;
</script>

<Field label={label} name={name} max={max} />
<Points name={name} max={max} rows={rows} />