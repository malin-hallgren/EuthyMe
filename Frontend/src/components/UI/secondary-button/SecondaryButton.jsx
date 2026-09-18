import "./SecondaryButton.css";
 
// Default settings: When isLoading is true button is disabled and loadingText is shown.
export default function SecondaryButton({ text, onClick, type, disabled, isLoading, loadingText}){
    return(
        <button className="secondary-button" onClick={onClick} type={type} disabled={disabled || isLoading} >
            {isLoading ? loadingText: text}
        </button>
    );
}