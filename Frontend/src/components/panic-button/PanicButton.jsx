import { useSettings } from "../../hooks/useSettings.js";
import { useLanguage } from '../../hooks/useLanguage.js';
import { useState } from "react";

import PrimaryButton from "../UI/primary-button/PrimaryButton.jsx";
export default function PanicButton() {
    const { settings } = useSettings();
    const { UserDashboardText } = useLanguage();
    const [ panicLink ] = useState(settings?.panicLink ?? 'https://www.google.com/');

    const handlePanicButtonClick = () => {
        window.location.href = panicLink; // Redirect to the panic link
    };

    return (
        <PrimaryButton className="panic-button" onClick={handlePanicButtonClick} text={UserDashboardText.resources.panic_button} />
    );
}