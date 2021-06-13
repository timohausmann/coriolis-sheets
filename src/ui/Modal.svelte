<script>
    import { createEventDispatcher } from 'svelte';
    import { _ } from "svelte-i18n";

    const dispatch = createEventDispatcher();

    export let title;
    export let active = true;

    export let danger = false;
    export let confirm = $_("confirm");
    export let cancel = $_("cancel");

    export function onClose() {};

    if(active) {
        document.documentElement.classList.add('is-clipped');
    }

    const buttonClass = danger ? 'is-danger' : 'is-primary';
    const headClass = danger ? 'has-background-danger has-text-white' : '';

    function handleConfirm() {
        dispatch('confirm');
        close();
    }

    /*function handleCancel() {
        close({
            cancel: true
        });
    }*/

    function close(eventData = {}) {
        //active = false;
        dispatch('close', eventData);
        document.documentElement.classList.remove('is-clipped');
    }
</script>
<style>
    .modal {
        padding: 0 20px;
    }
    .modal-card, .modal-content {
        margin: 0;
    }
    .modal-card-title {
        flex-shrink: 1;
        color: inherit;
    }
    .modal-card-foot {
        justify-content: space-between;
    }
    .level {
        width: 100%;
    }
</style>
<div class={'modal' + (active ? ' is-active' : '') }>
    <div class="modal-background" on:click={close} />
    <div class="modal-content">
        <div class="modal-card">
            <header class={`modal-card-head ${headClass}`}>
                <p class="modal-card-title">{title}</p>
                <button class="delete" aria-label="close" on:click={close} />
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
            <footer class="modal-card-foot">
                <div class="level">
                    <button class="button" on:click={close}>{cancel}</button>
                    <button class={`button ${buttonClass}`} on:click={handleConfirm}>{confirm}</button>
                </div>
            </footer>
        </div>
    </div>
    <!--button class="modal-close is-large" aria-label="close" /-->
</div>