import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

import Select from "../../components/Select";

const numberFieldProps = {
  type: "number",
  min: 0,
};

Form.propTypes = {
  feed: PropTypes.shape({
    id: PropTypes.string,
    ducks: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    foodType: PropTypes.string,
    foodAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  formValidation: PropTypes.shape({
    ducksIsValid: PropTypes.bool,
    timeIsValid: PropTypes.bool,
    dateIsValid: PropTypes.bool,
    locationIsValid: PropTypes.bool,
    foodTypeIsValid: PropTypes.bool,
    foodAmountIsValid: PropTypes.bool,
  }),
  handleFieldChange: PropTypes.func,
};

export default function Form({
  feed: { ducks, date, time, location, foodType, foodAmount },
  formValidation: {
    ducksIsValid,
    dateIsValid,
    timeIsValid,
    locationIsValid,
    foodTypeIsValid,
    foodAmountIsValid,
  },
  handleFieldChange,
}) {
  return (
    <>
      <TextField
        id="date"
        label="Date"
        type="date"
        value={date}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          handleFieldChange("date", e.target.value);
        }}
        error={!dateIsValid}
      />
      <TextField
        id="time"
        label="Time"
        type="time"
        margin="normal"
        value={time}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={(e) => {
          handleFieldChange("time", e.target.value);
        }}
        error={!timeIsValid}
      />
      <TextField
        id="location"
        fullWidth
        label="Location"
        value={location}
        margin="normal"
        onChange={(e) => {
          handleFieldChange("location", e.target.value);
        }}
        error={!locationIsValid}
      />
      <TextField
        id="ducks"
        fullWidth
        label="How Many Ducks"
        value={ducks}
        inputProps={numberFieldProps}
        margin="normal"
        onChange={(e) => {
          handleFieldChange("ducks", e.target.value);
        }}
        error={!ducksIsValid}
      />
      <Select
        label="Food Type"
        id="foodType"
        onChange={(e) => {
          handleFieldChange("foodType", e.target.value);
        }}
        value={foodType}
        options={[
          {
            value: "bread",
            label: "Bread",
          },
          {
            value: "birdFeed",
            label: "Bird Feed",
          },
          {
            value: "seeds",
            label: "Seeds",
          },
          {
            value: "other",
            label: "Other",
          },
        ]}
        error={!foodTypeIsValid}
      />
      <TextField
        id="foodAmount"
        fullWidth
        label="Food Amount (g)"
        value={foodAmount}
        inputProps={numberFieldProps}
        margin="normal"
        onChange={(e) => {
          handleFieldChange("foodAmount", e.target.value);
        }}
        error={!foodAmountIsValid}
      />
    </>
  );
}
