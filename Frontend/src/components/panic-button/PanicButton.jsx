import { useSettings } from "../../hooks/useSettings.js";
import { useState } from "react";

import PrimaryButton from "../UI/primary-button/PrimaryButton.jsx";
import UserDashboardText from "../../text-content/UserDashboardText.json";

export default function PanicButton() {
    const { settings } = useSettings();
    const [ panicLink ] = useState(settings?.panicLink ?? 'https://www.google.com/');

    const handlePanicButtonClick = () => {
        window.location.href = panicLink; // Redirect to the panic link
    };

    return (
        <PrimaryButton className="panic-button" onClick={handlePanicButtonClick} text={UserDashboardText.resources.panic_button} />
    );
}