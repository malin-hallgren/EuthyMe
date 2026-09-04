import react from 'react';
import './ContentCard.css';

export default function ContentCard({ children }) {

    return (
        <div className="content-card">
            {children}
        </div>
    )
}