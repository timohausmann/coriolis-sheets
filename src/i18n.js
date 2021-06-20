import { init, register, getLocaleFromNavigator } from 'svelte-i18n';

const availableLanguages = ['de', 'en'];
const fallbackLocale = 'en';

for (let lang of availableLanguages) {
    register(lang, () => {
        return window.fetch(`/i18n/${lang}.json`)
            .then(data => data.json())
            .catch(error => console.log('i18n fetch error', lang, error))
    });
}

let initialLocale = getLocaleFromNavigator();
if (availableLanguages.indexOf(initialLocale) === -1) initialLocale = fallbackLocale;

init({
    fallbackLocale,
    initialLocale, 
});