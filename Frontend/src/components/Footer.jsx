import StaticText from "../text-content/StaticText.json"
import './Footer.css'

export default function Footer()  {
    return (
        <footer className="footer">
            <p className="footer-text-title">{StaticText.title}</p>
            <p className="footer-text">{StaticText.copyright}</p>
        </footer>
    )
}