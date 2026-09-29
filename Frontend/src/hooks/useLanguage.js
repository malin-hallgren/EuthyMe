import { useSettings } from './useSettings.js';
import { DEFAULT_LANGUAGE, getLocale } from '../text-content/locales.js';

export function useLanguage() {
    const { settings } = useSettings();
    const storedLanguage = localStorage.getItem('language');
    const language = settings?.language?.toLowerCase() ?? storedLanguage ?? DEFAULT_LANGUAGE;

    return {
        language,
        ...getLocale(language),
    };
}