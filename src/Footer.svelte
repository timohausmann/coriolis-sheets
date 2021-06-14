<script>
  import { _ } from "svelte-i18n";
  import { getLocaleFromNavigator } from "svelte-i18n";

  const locale = getLocaleFromNavigator();
  if (["de", "en"].indexOf(locale) === -1) locale = "en";

  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">

    <div class="columns">
    <div class="column">

      
        <div class="block is-size-6" style="display: flex;">
            <a class="tinynav" target="_blank" href={`/privacy-${locale}.html`}>{$_("nav_privacy")}</a> 
            <a class="tinynav" target="_blank" href={`/imprint.html`}>{$_("nav_imprint")}</a>
        </div>

        <div class="block">
            &copy; Coriolis Character Sheets 2020 – {currentYear}
        </div>
      
  </div>
    <div class="column">
      <p>
          Coriolis is a science fiction role playing game by <a href="https://freeleaguepublishing.com/en/games/coriolis-2/">Fria Ligan</a>. 
          This website is a fan project and not affiliated with Fria Ligan or Coriolis in any professional capacity.
        </p>
  </div>

  </div>
</footer>
<style>.tinynav {
    padding-right: 1rem;
    margin-right: 1rem;
}
.tinynav:not(:last-child) {
    border-right: 1px solid rgba(0,0,0,0.35);
}

</style>
