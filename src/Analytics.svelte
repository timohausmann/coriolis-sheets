<script>
    import { analytics } from "firebase/app";
    import { _ } from "svelte-i18n";
    import { getLocaleFromNavigator } from 'svelte-i18n';
    import "firebase/analytics";

    const locale = getLocaleFromNavigator();
    if(['de', 'en'].indexOf(locale) === -1) locale = 'en';

    const gaOptout = localStorage.getItem('gaOptout') !== null;
    const gaAccept = localStorage.getItem('gaAccept') !== null;
    let acceptAnalytics = gaAccept;
    let hidden = false;
    let mounted = true;

    //if there is an optout/accept in localstore, let's not molest the user again
    if(gaAccept || gaOptout) {
        hidden = true;
        mounted = false;
    }
    
    if(gaAccept && !gaOptout) {
        loadAnalytics();
    }

    function acceptAll() {
        acceptAnalytics = true; //update the checkbox
        accept();
    }

    function accept() {
        if(acceptAnalytics) {
            localStorage.setItem('gaAccept', true);
            loadAnalytics();
        } else {
            localStorage.setItem('gaOptout', true);
        }

        //@todo learn about svelte animations
        window.setTimeout(() => { hidden = true; }, 200);
        window.setTimeout(() => { mounted = false; }, 2500);
    }

    function loadAnalytics() {
        analytics();
    }
</script>
{#if mounted}
    <div class={'box note' + (hidden ? ' hidden' : '')}>

        <div class="block">
        <span class="is-size-6"
            >{$_("privacy_note")}
            <a target="_blank" href={`/privacy-${locale}.html`}>{$_('learn_more')}</a></span
        ></div>
        <div class="level">
            
                    <label class="checkbox">
                        <input type="checkbox" checked disabled />
                        {$_('cookies_technical')}
                    </label>
                
                <label class="checkbox">
                    <input type="checkbox" bind:checked={acceptAnalytics} />
                        {$_('cookies_analytics')}
                </label>
            
                <div class="buttons">
                    <button class="button is-light" on:click={accept}>{$_('accept_selection')}</button>
                    <button class="button is-info" on:click={acceptAll}>{$_('accept_all')}</button>
                </div>
            
        </div>
    </div>

    <!-- gaAccept is only true if it was already set onload -->
    {#if acceptAnalytics && hidden && !gaAccept}
        <div class="box thanks">
            <p>{$_('thank_you')}</p>
        </div>
    {/if}
{/if}
<style>
    .box {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        transition: 0.4s;
    }
    .box.note {
        width: 66%;
    }
    .box.hidden {
        opacity: 0;
        transform: translateX(-50%) scale(0.95);
        pointer-events: none;
    }

    .box.thanks {
        animation: thankyou 1.4s 2 alternate forwards cubic-bezier(0.68, -0.6, 0.32, 1.6);
    }
    @keyframes thankyou {
        0% {
            transform: translateX(-50%) translateY(200%);
        }
        80% {
            transform: translateX(-50%) translateY(0%);
        }
    }
</style>
