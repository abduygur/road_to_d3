import React from "react";

export const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
    <select
      name="pets"
      id={id}
      onChange={(event) => onSelectedValueChange(event.target.value)}
    >
      <option value="">--Please choose an option--</option>
      {options.map(({ value, label }) => (
        <option value={value} selected={value === selectedValue}>
          {label}
        </option>
      ))}
    </select>
  );