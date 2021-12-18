import React from "react";

const Input = ({ label, name, defaultValue, type, required, disabled }) => {
  return (
    <label htmlFor={name} className="flex flex-col my-3 ">
      <span className="text-white">{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className="input"
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </label>
  );
};

export default Input;
