import "./Header.css"
import StaticText from "../text-content/StaticText.json"
import { useAuth } from "../hooks/useAuth.js";
import Logout from "./Logout.jsx"
import {AccountIcon} from "./UI/icons/AccountCircleIcon.jsx";

export default function Header()  {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {!isAuthenticated && (
                <header className= "header header-login">
                    <h1 className="header-title-login">{StaticText.title}</h1>
                </header>
            )}

            {isAuthenticated && (
                <header className="header header-auth">
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