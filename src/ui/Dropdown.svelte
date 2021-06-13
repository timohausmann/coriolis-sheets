<script>
    export let label = '';
    export let options = [];

    export let hoverable = true;
    export let align = 'right';
    let dropdownClass = 'dropdown';
    dropdownClass += ' is-' + align;
    if(hoverable) dropdownClass += ' is-hoverable';

    
    options = options.map(o => {
        
        o.href = o.href || '#';
        o.onClick = o.onClick || (() => {});
        if(o.icon && o.icon.indexOf('fa') != 0) {
            o.icon = `fas fa-${o.icon}`;
        }

        return o;
    })
    

    const randomId = "dropdown-menu-" + Math.random().toString(36).substring(2);
</script>

<div class={dropdownClass}>
    <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls={randomId}>
            {#if label}
                <span>{label}</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true" />
                </span>
            {:else}
            <span class="icon is-small">
                    <i class="fas fa-ellipsis-h" aria-hidden="true" />
                </span>
            {/if}
        </button>
    </div>
    <div class="dropdown-menu" id={randomId} role="menu">
        <div class="dropdown-content">
            {#each options as option}
                <a
                    role="button"
                    href={option.href}
                    class="dropdown-item"
                    on:click={option.onClick}
                >
                    {#if option.icon}
                        <span class="icon is-small">
                            <i class={option.icon} aria-hidden="true" />
                        </span>
                    {/if}

                    <span>{option.label}</span>
                </a>

                {#if option.divider}
                    <hr class="dropdown-divider" />
                {/if}
            {/each}
        </div>
    </div>
</div>
