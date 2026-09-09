import ContentCard from './ContentCard';
import './PopUp.css';

export default function PopUp({ children, isOpen, onClose }) {

    return (
        <>
            {isOpen && (
                <div className="popup-backdrop" onClick={onClose}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <ContentCard className="popup-content">
                            <button className="popup-close-button" onClick={onClose}>
                                &times;
                            </button>
                            {children}
                        </ContentCard>
                    </div>
                </div>
            )}
        </>
    )
}
