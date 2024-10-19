import React from "react";
const InputText = ({ id, label, value, onChange }) => {
  return (
    <div className="input-text">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e, id)}
      />
    </div>
  );
};

export default InputText;
