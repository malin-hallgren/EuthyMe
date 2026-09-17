import "./Header.css"
import { useRef, useState, useEffect } from "react";
import StaticText from "../text-content/StaticText.json"
import { useAuth } from "../hooks/useAuth.js";
import Logout from "./Logout.jsx"
import AccountSettings from "./AccountSettings.jsx";
import AccountSettingsContent from "./AccountSettingsContent.jsx";
import Popup from "./UI/PopUp.jsx";


export default function Header()  {
    const { isAuthenticated } = useAuth();
    const headerRef = useRef(null);
    const [isAccountSettingsOpen, setIsShowAccountSettingsOpen] = useState(false);
        
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
                        onClose={() => setIsShowAccountSettingsOpen(false)}
                    />
                </Popup>
            )}
        </>
    )
}