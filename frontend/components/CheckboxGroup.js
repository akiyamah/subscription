// CheckboxGroup.js
const CheckboxGroup = ({ label, idPrefix, options, selectedValues, onChange }) => (
    <div className="mb-4">
      <div className="mb-1">{label}</div>
      {options.map((option) => (
        <div key={option.id}>
          <input
            type="checkbox"
            id={`${idPrefix}-${option.id}`}
            name={`${idPrefix}-${option.id}`}
            value={option.id}
            checked={selectedValues && selectedValues.includes(Number(option.id))}
            onChange={onChange}
          />
          <label htmlFor={`${idPrefix}-${option.id}`}>{option.name}</label>
        </div>
      ))}
    </div>
  );
  export default CheckboxGroup;
  