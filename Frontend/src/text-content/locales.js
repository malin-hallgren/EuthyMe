import enAdminDashboardText from './en/AdminDashboardText.json';
import enAccountSettingsText from './en/AccountSettingsText.json';
import enErrorMessagesText from './en/ErrorMessagesText.json';
import enLoginRegisterText from './en/LoginRegisterText.json';
import enNotFoundText from './en/NotFoundText.json';
import enSettingsText from './en/SettingsText.json';
import enStaticText from './en/StaticText.json';
import enUserDashboardText from './en/UserDashboardText.json';

import svAdminDashboardText from './sv/AdminDashboardText.json';
import svAccountSettingsText from './sv/AccountSettingsText.json';
import svErrorMessagesText from './sv/ErrorMessagesText.json';
import svLoginRegisterText from './sv/LoginRegisterText.json';
import svNotFoundText from './sv/NotFoundText.json';
import svSettingsText from './sv/SettingsText.json';
import svStaticText from './sv/StaticText.json';
import svUserDashboardText from './sv/UserDashboardText.json';

const locales = {
    en: {
        AdminDashboardText: enAdminDashboardText,
        AccountSettingsText: enAccountSettingsText,
        ErrorMessagesText: enErrorMessagesText,
        LoginRegisterText: enLoginRegisterText,
        NotFoundText: enNotFoundText,
        SettingsText: enSettingsText,
        StaticText: enStaticText,
        UserDashboardText: enUserDashboardText,
    },
    sv: {
        AdminDashboardText: svAdminDashboardText,
        AccountSettingsText: svAccountSettingsText,
        ErrorMessagesText: svErrorMessagesText,
        LoginRegisterText: svLoginRegisterText,
        NotFoundText: svNotFoundText,
        SettingsText: svSettingsText,
        StaticText: svStaticText,
        UserDashboardText: svUserDashboardText,
    },
};

export const DEFAULT_LANGUAGE = 'en';

export function getLocale(language) {
    const normalizedLanguage = language?.toLowerCase();
    return locales[normalizedLanguage] ?? locales[DEFAULT_LANGUAGE];
}

export default locales;