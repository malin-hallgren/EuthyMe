import {useState, useEffect} from 'react';
import {SettingsContext} from './SettingsContext.js';
import {getSettings} from '../../services/SettingsService.js';
import {useAuth} from '../../hooks/useAuth.js';

export const SettingsProvider = ({children}) => {
    const [settings, setSettings] = useState(null);
    const {isAuthenticated} = useAuth();
    const visibleSettings = isAuthenticated ? settings : null;

    useEffect(() => {
        const theme = isAuthenticated && settings?.theme?.toLowerCase() === 'dark'
            ? 'dark'
            : 'light';

        document.documentElement.dataset.theme = theme;
    }, [isAuthenticated, settings?.theme]);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        let cancelled = false;

        async function loadSettings() {
            try {
                const response = await getSettings();

                if (!cancelled) {
                    setSettings(response);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error('Error loading settings:', error);
                }
            }
        }

        loadSettings();

        return () => {
            cancelled = true;
        };
    }, [isAuthenticated]);

    return (
        <SettingsContext.Provider value={{settings: visibleSettings, setSettings}}>
            {children}
        </SettingsContext.Provider>
    );
}