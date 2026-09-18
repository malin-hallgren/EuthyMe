import {useState} from 'react';
import { useSettings } from "../../hooks/useSettings.js";
import { updateSettings } from "../../services/SettingsService.js";
import { updatePassword } from "../../services/AuthServices.js";

import SecondaryButton from '../UI/secondary-button/SecondaryButton.jsx';
import ScaleSelector from '../UI/scale-selector/ScaleSelector.jsx';
import PrimaryButton from '../UI/primary-button/PrimaryButton.jsx';
import InputField from '../UI/input-field/InputField.jsx';
import ContentCard from '../UI/content-card/ContentCard.jsx';

import AccountSettingsText from '../../text-content/AccountSettingsText.json';

import './AccountSettingsContent.css';

export default function AccountSettingsContent({onClose}) {
    const { settings, setSettings } = useSettings();
    const [displayNameInput, setDisplayNameInput] = useState(settings.displayName);
    const [theme, setTheme] = useState(settings?.theme ?? 'light');

    const [currentPasswordInput, setCurrentPasswordInput] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState([]);

    const initialShowMeds = settings?.showMeds ?? true;
    const [showMedsCheckbox, setShowMedsCheckbox] = useState(
        initialShowMeds === true || initialShowMeds === 'true'
    );

    const [panicLinkInput, setPanicLinkInput] = useState(settings?.panicLink ?? '');

    const showMedsOptions = {
        true: { text: AccountSettingsText.accountSettings.show_meds_option },
        false: { text:AccountSettingsText.accountSettings.hide_meds_option }
    };

    const isPasswordFormComplete = newPasswordInput !== '' && confirmNewPasswordInput !== '' && currentPasswordInput !== '';

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

    const handleSavePasswords = async (passwords) => {
        const errors = [];
        try {
            if (passwords.newPassword !== passwords.confirmPassword) {
                errors.push("New password and confirmation do not match.");
            }
            if (passwords.newPassword.length < 6) {
                errors.push("New password must be at least 6 characters long.");
            }
            if (passwords.oldPassword === passwords.newPassword) {
                errors.push("New password cannot be the same as the current password.");
            }
            if (passwords.newPassword.search(/\d/) == -1) {
                errors.push("New password must contain at least one digit.");
            }
            if (passwords.newPassword.search(/[a-z]/) == -1) {
                errors.push("New password must contain at least one lowercase letter.");
            }
            if (passwords.newPassword.search(/[A-Z]/) == -1) {
                errors.push("New password must contain at least one uppercase letter.");
            }
            if (errors.length > 0) {
                setPasswordError(errors);
                return false;
            }

            await updatePassword(passwords);
            setPasswordError([]);
            setCurrentPasswordInput('');
            setNewPasswordInput('');
            setConfirmNewPasswordInput('');
            return true;
        }
        catch (error) {
            console.error("Error updating password:", error);
            setPasswordError(["An error occurred while updating the password. Check your current password and try again."]);
            return false;
        }
    }


    return (
        <div className="account-settings-content">
            <form className="account-form settings-form" onSubmit={async (e) => {e.preventDefault(); const saved = await handleSaveSettings({displayName: displayNameInput, showMeds: showMedsCheckbox, panicLink: panicLinkInput, theme}); if (saved) onClose();}}>
                <h2 className="settings-form-title">{AccountSettingsText.accountSettings.title}</h2>
                <InputField
                    label={AccountSettingsText.accountSettings.display_name}
                    id="displayName"
                    placeholder={settings.displayName}
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                />

                <InputField
                    label={AccountSettingsText.accountSettings.panic_link}
                    id="panicLink"
                    placeholder={settings.panicLink}
                    value={panicLinkInput}
                    onChange={(e) => setPanicLinkInput(e.target.value)}
                />

                <ScaleSelector
                    label={AccountSettingsText.accountSettings.log_medications}
                    name="showMeds"
                    value={showMedsCheckbox}
                    selected={showMedsCheckbox}
                    onChange={(value) => setShowMedsCheckbox(value === true || value === 'true')}
                    optionsMap={showMedsOptions}
                />
                
                <section className="theme-selector">
                    <h3>{AccountSettingsText.accountSettings.theme_selector_title}</h3>
                    <div className="theme-options">
                        <label className="theme-option">
                            <input
                                type="radio"
                                name="theme"
                                value="light"
                                checked={theme === "light"}
                                onChange={(e) => setTheme(e.target.value)}
                                className="theme-radio radio-light"
                            />
                            <ContentCard className="light-theme-card">
                                <p>{AccountSettingsText.accountSettings.theme_light}</p>
                            </ContentCard>
                        </label>
                        
                        <label className="theme-option">
                            <input
                                type="radio"
                                name="theme"
                                value="dark"
                                checked={theme === "dark"}
                                onChange={(e) => setTheme(e.target.value)}
                                className="theme-radio"
                            />
                            <ContentCard className="dark-theme-card">
                                <p>{AccountSettingsText.accountSettings.theme_dark}</p>
                            </ContentCard>
                        </label>
                    </div>  
                </section>

                <PrimaryButton type="submit" text={AccountSettingsText.accountSettings.save_settings}></PrimaryButton>
            </form>
  
            <form className="account-form password-form" onSubmit={(e) => {
                e.preventDefault(); 
                handleSavePasswords({
                    oldPassword: currentPasswordInput, 
                    newPassword: newPasswordInput, 
                    confirmPassword: confirmNewPasswordInput
                }).then((saved) => {
                    if (saved) onClose();
                })}}>
                <h2 className="password-form-title">{AccountSettingsText.accountSettings.changePassword.title}</h2>

                <InputField
                    label={AccountSettingsText.accountSettings.changePassword.current_password}
                    id="currentPassword"
                    type="password"
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                />
                <InputField
                    label={AccountSettingsText.accountSettings.changePassword.new_password}
                    id="newPassword"
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                />
                <InputField
                    label={AccountSettingsText.accountSettings.changePassword.confirm_new_password}
                    id="confirmNewPassword"
                    type="password"
                    value={confirmNewPasswordInput}
                    onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
                />
                <SecondaryButton type="submit" text={AccountSettingsText.accountSettings.changePassword.save_password} disabled={!isPasswordFormComplete}></SecondaryButton>
                { passwordError.length > 0 && (
                    <div className="password-error-container">
                        {passwordError.map((error, index) => (<p key={index} className="password-error-message">{error}</p>))}
                    </div>
                )}
            </form>
        </div>
    );
}

