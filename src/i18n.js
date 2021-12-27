import { init, register, getLocaleFromNavigator } from 'svelte-i18n';

const fallbackLocale = 'en';

export const availableLanguages = {
    de: '🇩🇪 Deutsch',
    en: '🇬🇧 English',
    es: '🇪🇸 Español',
};

for (let lang of Object.keys(availableLanguages)) {
    register(lang, () => {
        return window.fetch(`/i18n/${lang}.json`)
            .then(data => data.json())
            .catch(error => console.log('i18n fetch error', lang, error))
    });
}

let initialLocale = getLocaleFromNavigator();
if (!availableLanguages.hasOwnProperty(initialLocale)) initialLocale = fallbackLocale;

init({
    fallbackLocale,
    initialLocale, 
});