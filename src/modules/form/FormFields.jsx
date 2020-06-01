import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";

import AddressField from "../../components/AddressField";
import Select from "../../components/Select";

const numberFieldProps = {
  type: "number",
  min: 0,
};

Form.propTypes = {
  feed: PropTypes.shape({
    id: PropTypes.string,
    ducks: PropTypes.number,
    time: PropTypes.string,
    location: PropTypes.string,
    foodType: PropTypes.string,
    foodAmount: PropTypes.number,
  }),
  handleFeedChange: PropTypes.func,
};

export default function Form({
  feed: { ducks, time, location, foodType, foodAmount },
  handleFeedChange,
}) {
  return (
    <>
      <TextField
        id="ducks"
        fullWidth
        label="How Many Ducks"
        value={ducks}
        inputProps={numberFieldProps}
        margin="normal"
        onChange={(e) => {
          handleFeedChange(e.target.value, "ducks");
        }}
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
          handleFeedChange(e.target.value, "time");
        }}
      />
      <AddressField
        id="location"
        label="Location"
        value={location}
        setAddress={(value) => {
          handleFeedChange(value, "location");
        }}
      />
      <Select
        id="foodType"
        onChange={(e) => {
          handleFeedChange(e.target.value, "foodType");
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
      />
      <TextField
        id="foodAmount"
        fullWidth
        label="Food Amount"
        value={foodAmount}
        inputProps={numberFieldProps}
        margin="normal"
        onChange={(e) => {
          handleFeedChange(e.target.value, "foodAmount");
        }}
      />
    </>
  );
}
