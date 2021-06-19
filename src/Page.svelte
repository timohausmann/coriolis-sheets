<script>
    export let title = '';
    export let subtitle = '';
</script>
<div class="section section--intro has-background-white">
    <div class="container">
        <h1 class="title">{title}</h1>
        {#if subtitle}
            <h2 class="subtitle">{subtitle}</h2>
        {/if}
    </div>
</div>

<div class="section">
    <div class="container">
        <slot></slot>
    </div>
</div>