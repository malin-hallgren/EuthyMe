import {useState, useEffect} from 'react';
import {SettingsContext} from './SettingsContext.js';
import {getSettings} from '../../services/SettingsService.js';
import {useAuth} from '../../hooks/useAuth.js';

export const SettingsProvider = ({children}) => {
    const [settings, setSettings] = useState(null);
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        const loadSettings = async () => {
            try {
                const response = await getSettings();
                setSettings(response);
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadSettings();
    }, [isAuthenticated]);

    return (
        <SettingsContext.Provider value={{settings: isAuthenticated ? settings : null, setSettings}}>
            {children}
        </SettingsContext.Provider>
    );
}