import './ErrorMessage.css';

export default function ErrorMessage({ message, type }) {
  return (
    <div className={`error-message ${type}`}>
      <p>{message}</p>
    </div>
  );
}