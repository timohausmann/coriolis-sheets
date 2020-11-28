import { init, register, getLocaleFromNavigator } from 'svelte-i18n';

register('de', () => {
    return window.fetch('/i18n/de.json')
        .then(data => data.json())
        .catch(error => console.log('i18n fetch error', error))
});

register('en', () => {
    return window.fetch('/i18n/en.json')
        .then(data => data.json())
        .catch(error => console.log('i18n fetch error', error))
});

init({
    fallbackLocale: 'de',
    initialLocale: getLocaleFromNavigator(),
});