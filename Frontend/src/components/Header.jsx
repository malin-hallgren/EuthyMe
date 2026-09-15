import "./Header.css"
import { useRef, useState, useEffect } from "react";
import StaticText from "../text-content/StaticText.json"
import { useAuth } from "../hooks/useAuth.js";
import { useSettings } from "../hooks/useSettings.js";
import { updateSettings } from "../services/SettingsService.js";
import Logout from "./Logout.jsx"
import AccountSettings from "./AccountSettings.jsx";
import AccountSettingsContent from "./AccountSettingsContent.jsx";
import Popup from "./UI/Popup.jsx";


export default function Header()  {
    const { isAuthenticated } = useAuth();
    const { settings, setSettings } = useSettings();
    const headerRef = useRef(null);
    const [isAccountSettingsOpen, setIsShowAccountSettingsOpen] = useState(false);

    const handleSaveSettings = async (newSettings) => {
        const showMeds = newSettings.showMeds ?? settings.showMeds;
        const updatedSettings = {
            displayName: newSettings.displayName ?? settings.displayName,
            showMeds: showMeds === true || showMeds === "true",
            panicLink: newSettings.panicLink ?? settings.panicLink,
            language: newSettings.language ?? settings.language ?? "EN",
            theme: newSettings.theme ?? settings.theme ?? "light",
        };

        try {
            await updateSettings(updatedSettings);
            setSettings(updatedSettings);
            return true;
        } catch (error) {
            console.error("Error updating settings:", error);
            return false;
        }
    }

        
    useEffect(() => {
        if (!headerRef.current) return;
    
        const updateHeaderHeight = () => {
            const height = headerRef.current.getBoundingClientRect().height;
        
            document.documentElement.style.setProperty(
                "--header-height",
                `${height}px`
            );
        };
    
        const observer = new ResizeObserver(updateHeaderHeight);
        observer.observe(headerRef.current);
        updateHeaderHeight();
    
        return () => observer.disconnect();
    }, [isAuthenticated]);

    return (
        <>
            {!isAuthenticated && (
                <header ref={headerRef} className= "header header-login">
                    <h1 className="header-title-login">{StaticText.title}</h1>
                </header>
            )}

            {isAuthenticated && (
                <header ref={headerRef} className="header header-auth">
                    <h1 className="header-title-auth">{StaticText.title}</h1>
                    <section className="header-buttons-section">
                        <AccountSettings onClick={() => setIsShowAccountSettingsOpen(true)}/>
                        <Logout />
                    </section>
                </header>
                
            )}

            {isAccountSettingsOpen && (
                <Popup isOpen={isAccountSettingsOpen} onClose={() => setIsShowAccountSettingsOpen(false)}>
                    <AccountSettingsContent
                        displayName={settings.displayName}
                        showMeds={settings.showMeds}
                        panicLink={settings.panicLink}
                        language={settings.language}
                        theme={settings.theme}
                        onSaveSettings={handleSaveSettings}
                        onClose={() => setIsShowAccountSettingsOpen(false)}
                        onSavePasswords= {(passwords) => {
                            // Handle password change logic here
                            setIsShowAccountSettingsOpen(false);
                        }}
                    
                    />
                </Popup>
            )}
        </>
    )
}