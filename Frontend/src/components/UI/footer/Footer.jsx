import { useLanguage } from '../../../hooks/useLanguage.js';

import './Footer.css'

export default function Footer()  {
    const { StaticText } = useLanguage();

    return (
        <footer className="footer">
            <p className="footer-text-title">{StaticText.title}</p>
            <p className="footer-text">{StaticText.copyright}</p>
        </footer>
    )
}