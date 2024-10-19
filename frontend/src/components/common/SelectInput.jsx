import React from "react";
const SelectInput = ({ label, id, options, value, onChange }) => {
  return (
    <div className="select-input">
      <label htmlFor={id}>{label}</label>
      <select name={id} id={id} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
