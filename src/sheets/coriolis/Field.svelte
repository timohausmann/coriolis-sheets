<script>
    import { _ } from 'svelte-i18n';
    import { onDestroy } from 'svelte';
    import { currCharStore, unsavedChangesStore } from '../../stores.js'

    export let label;
    export let max = 99;
    export let name = '';
    export let base = ''; //Coriolis Base Attr for Skills
    export let skillType = ''; //Coriolis "common" or "special"

    let currField_value = ''
    let readonly = null;
    let meta = '';
    let baseField_value = 0;

    const unsubscribe = currCharStore.subscribe(value => {

        if(!value) return;
        readonly = value.readonly ? true : null;
        currField_value = value[name] ? parseInt(value[name]) : ''

        if(base) {
            baseField_value = parseInt(value[base]);
            updateMeta();
        }
    })

    function updateMeta() {
        //show sum for common skill or skilled special skill
        if(skillType === 'common' && baseField_value > 0 || (baseField_value > 0 && currField_value > 0)) {
            meta = `(+ ${baseField_value} ${$_(base)} = ${currField_value + baseField_value})`;
        }
    }

    function onChange(e) {
        if(readonly) return;
        unsavedChangesStore.set(true);
    }

    onDestroy(() => {
        unsubscribe()
    })

</script>

<style>
	.sheetField {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.2);
        color: #111;
        padding: 0.25rem;
        margin: 0 0.25rem;
        gap: 0.5rem;
    }
    .sheetField:last-child {
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
    small {
        font-size: 0.75rem;
        opacity: 0.8;
    }
</style>

<div class="sheetField">
    <label for={name}>{label} 
        {#if meta}
            <small>{meta}</small>
        {/if}
    </label>
    <input id={name} type="number" name={name} min="0" max={max} value={currField_value}
        readonly={readonly} on:change={onChange} on:keydown={onChange} />
</div>