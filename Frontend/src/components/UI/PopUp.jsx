import react from "react";
import './PopUp.css';

export default function PopUp({ children, isOpen, onClose }) {

    return (
        <>
            {isOpen && (
                <div className="popup-backdrop" onClick={onClose}>
                    {/* stopPropagation hindrar att popupen stängs när man klickar inuti själva formuläret */}
                    <div onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            )}
        </>
    )
}
