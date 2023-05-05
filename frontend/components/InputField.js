// InputField.js
const InputField = ({ label, id, type, value, onChange }) => (
    <div className="mb-4">
      <label className="mb-1" htmlFor={id}>{label}</label>
      <input
        className="input-form"
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
  

  export default InputField;