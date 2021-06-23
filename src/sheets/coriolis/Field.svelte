<script>
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
    let metaTitle = '';

    const unsubscribe = currCharStore.subscribe(value => {

        if(!value) return;
        readonly = value.readonly ? true : null;
        currField_value = value[name] ? parseInt(value[name]) : ''

        if(base) {
            const baseField_value = parseInt(value[base]);

            //show sum for common skill or skilled special skill
            if(skillType === 'common' || (baseField_value > 0 && currField_value > 0)) {
                meta = '∑ ' + (currField_value + value[base]) || '0';

                //uggh yeah it's bad but it works
                const parts = label.split(' (');
                metaTitle = `${currField_value || 0} ${parts[0]} + ${value[base] || 0} ${parts[1].replace(')', '')}`;
            }
        }
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
	.sheetField {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0,0,0,0.2);
        color: #111;
        padding: 0.25rem;
        margin: 0 0.25rem;
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
    <label for={name} title={metaTitle}>{label} 
        {#if meta}
            <small>{meta}</small>
        {/if}
    </label>
    <input id={name} type="number" name={name} min="0" max={max} value={currField_value}
        readonly={readonly} on:change={onChange} on:keydown={onChange} />
</div>