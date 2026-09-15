import ContentCard from './ContentCard';
import './PopUp.css';

export default function PopUp({ children, isOpen, onClose }) {

    return (
        <>
            {isOpen && (
                <div className="popup-backdrop" onClick={onClose}>
                    <div className="popup-content-wrapper" onClick={(e) => e.stopPropagation()}>
                        <ContentCard className="popup-content">
                            <div className="popup-header">
                                <button className="popup-close-button" onClick={onClose}>
                                    &times;
                                </button>
                            </div>
                            {children}
                        </ContentCard>

                    </div>
                </div>
            )}
        </>
    )
}
