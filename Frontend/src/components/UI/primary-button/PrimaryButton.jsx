 import "./PrimaryButton.css";
 
// Default settings: When isLoading is true button is disabled and loadingText is shown.
export default function PrimaryButton({ text, onClick, type, disabled, isLoading, loadingText}){
    return(
        <button className="primary-button" onClick={onClick} type={type} disabled={disabled || isLoading} >
            {isLoading ? loadingText: text}
        </button>
    );
}