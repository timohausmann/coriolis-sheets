<script>
    import { _, locale } from 'svelte-i18n';

    const currentYear = new Date().getFullYear();

    const privacyAvailable = ['de', 'en', 'es'];
    $: privacyLang = privacyAvailable.includes($locale) ? $locale : 'en';
</script>

<footer class="footer">
    <div class="columns">
        <div class="column">
            <div class="block tinynav">
                <a
                    class="tinynav-item"
                    target="_blank"
                    href={`/privacy-${privacyLang}.html`}
                >
                    {$_('nav_privacy')}
                </a>
                <a class="tinynav-item" target="_blank" href={`/imprint.html`}>
                    {$_('nav_imprint')}
                </a>
                <a
                    class="tinynav-item"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://paypal.me/thausmann/5`}
                >
                    {$_('nav_donate')}
                </a>
            </div>

            <div class="block">
                &copy; Coriolis Sheets 2020&mdash;{currentYear}
            </div>
        </div>
        <div class="column">
            <p>
                Coriolis is a science fiction role playing game by <a
                    href="https://freeleaguepublishing.com/en/games/coriolis-2/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Fria Ligan</a>. 
                This website is a fan project and not affiliated with Fria Ligan
                or Coriolis in any capacity.
            </p>
        </div>
    </div>
</footer>

<style lang="scss">
    @use './_vars.scss' as vars;

    .tinynav {
        display: flex;
    }

    @media #{vars.$media-tablet-landscape-lt} {
        .tinynav {
            flex-direction: column;
        }

        .tinynav-item {
            padding-bottom: 1rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            &:last-child {
                border-bottom: none;
            }
        }
    }

    @media #{vars.$media-tablet-landscape} {
        .tinynav-item {
            padding-right: 1rem;
            margin-right: 1rem;
        }

        .tinynav-item {
            border-right: 1px solid rgba(0, 0, 0, 0.1);

            &:last-child {
                border-right: none;
            }
        }
    }
</style>
