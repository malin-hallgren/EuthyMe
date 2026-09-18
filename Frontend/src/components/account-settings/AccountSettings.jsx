import { AccountIcon } from "../UI/icons/AccountCircleIcon.jsx";
import AccountSettingsText from "../../text-content/AccountSettingsText.json";

export default function AccountSettings({onClick})  {
    
    return (

        <button className="account-button" onClick={() => onClick()}>
            <AccountIcon className="custom-icon account-icon" />
            <span>{AccountSettingsText.button_title}</span>
        </button>
    )
}