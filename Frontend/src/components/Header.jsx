import "./Header.css"
import { useRef, useEffect } from "react";
import StaticText from "../text-content/StaticText.json"
import { useAuth } from "../hooks/useAuth.js";
import Logout from "./Logout.jsx"
import {AccountIcon} from "./UI/icons/AccountCircleIcon.jsx";

export default function Header()  {
    const { isAuthenticated } = useAuth();
    const headerRef = useRef(null);
        
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
                        {/* TODO: Add functionality to account button */}
                        <button className="account-button"> 
                            <AccountIcon className="custom-icon account-icon" />
                            <span>Account</span>
                        </button>
                        <Logout />
                    </section>
                </header>
                
            )}
        </>
    )
}