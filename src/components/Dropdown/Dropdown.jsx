import React from "react";
import PropTypes from "prop-types";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

Dropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  error: PropTypes.bool,
};

export default function Dropdown({
  value,
  onChange,
  label,
  id,
  options,
  error,
}) {
  return (
    <FormControl fullWidth margin="normal" error={error}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        inputProps={{
          name: id,
          id,
        }}
      >
        <option value=""></option>
        {options.map((option, index) => (
          <option key={`${index}-${value}-${label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
