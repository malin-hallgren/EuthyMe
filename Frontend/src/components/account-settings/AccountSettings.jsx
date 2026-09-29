import { AccountIcon } from "../UI/icons/AccountCircleIcon.jsx";
import { useLanguage } from '../../hooks/useLanguage.js';

export default function AccountSettings({onClick})  {
    const { AccountSettingsText } = useLanguage();
    
    return (

        <button className="account-button" onClick={() => onClick()}>
            <AccountIcon className="custom-icon account-icon" />
            <span>{AccountSettingsText.button_title}</span>
        </button>
    )
}