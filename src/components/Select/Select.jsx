import React from "react";
import PropTypes from "prop-types";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Select as MaterialSelect } from "@material-ui/core";

Select.propTypes = {
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
};

export default function Select({ value, onChange, label, id, options }) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <MaterialSelect
        native
        value={value}
        onChange={onChange}
        inputProps={{
          name: id,
          id,
        }}
      >
        {options.map((option, index) => (
          <option key={`${index}-${value}-${label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </MaterialSelect>
    </FormControl>
  );
}
