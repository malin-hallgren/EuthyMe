import {useState} from 'react';
import {useSettings} from '../hooks/useSettings.js';
import SecondaryButton from './UI/SecondaryButton.jsx';
import ScaleSelector from './UI/ScaleSelector.jsx';
import PrimaryButton from './UI/PrimaryButton.jsx';
import InputField from './InputField.jsx';
import AccountSettingsText from '../text-content/AccountSettingsText.json';

export default function AccountSettingsContent({displayName ="", email = "", onSaveSettings, onSavePasswords, onClose}) {
    const { settings, setSettings } = useSettings();
    const [displayNameInput, setDisplayNameInput] = useState(displayName);

    const [currentPasswordInput, setCurrentPasswordInput] = useState('');
    const [newPasswordInput, setNewPasswordInput] = useState('');
    const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');

    const [showMedsCheckbox, setShowMedsCheckbox] = useState(settings?.showMeds ?? true);

    const [panicLinkInput, setPanicLinkInput] = useState(settings?.panicLink ?? '');

    const showMedsOptions = {
        true: { text: AccountSettingsText.accountSettings.show_meds_option },
        false: { text:AccountSettingsText.accountSettings.hide_meds_option }
    };


    return (
        <>
            <h2>{AccountSettingsText.accountSettings.title}</h2>
            <form className="account-form settings-form" onSubmit={(e) => {e.preventDefault(); onSaveSettings({displayName: displayNameInput, showMeds: showMedsCheckbox, panicLink: panicLinkInput}); onClose();}}>
                <InputField
                    label={AccountSettingsText.accountSettings.display_name}
                    id="displayName"
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                />

                <InputField
                    label={AccountSettingsText.accountSettings.panic_link}
                    id="panicLink"
                    value={panicLinkInput}
                    onChange={(e) => setPanicLinkInput(e.target.value)}
                />

                <ScaleSelector
                    label="Log Medication"
                    name="showMeds"
                    value={showMedsCheckbox}
                    selected={showMedsCheckbox}
                    onChange={(value) => setShowMedsCheckbox(value)}
                    optionsMap={showMedsOptions}
                />

                <PrimaryButton type="submit" text={AccountSettingsText.accountSettings.save_settings}></PrimaryButton>
            </form>
            <h3>{AccountSettingsText.accountSettings.changePassword.title}</h3>
            <form className="account-form password-form" onSubmit={(e) => {e.preventDefault(); onSavePasswords({currentPassword: currentPasswordInput, newPassword: newPasswordInput, confirmNewPassword: confirmNewPasswordInput}); onClose();}}>
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
                <SecondaryButton type="submit" text={AccountSettingsText.accountSettings.changePassword.save_password}></SecondaryButton>
            </form>
        </>
    )
}

