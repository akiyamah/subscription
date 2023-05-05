// frontend/components/DropdownSelect.js

import React from 'react';

  const DropdownSelect = ({ label, id, value, options, disabled, onChange }) => (
    <div className="mb-4">
      <label className="mb-1" htmlFor={id}>{label}</label>
      <select className="input-form" id={id} value={value} onChange={onChange} disabled={disabled}>
        
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );

  export default DropdownSelect;