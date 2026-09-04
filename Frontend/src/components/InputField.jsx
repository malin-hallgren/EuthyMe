import './InputField.css';

export default function InputField({ id, type, label, placeholder, value, onChange }) {
    return (
        <div className="input-field">
            <label className="input-field__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="input-field__input"
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}