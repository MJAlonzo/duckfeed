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
    date: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    foodType: PropTypes.string,
    foodAmount: PropTypes.number,
  }),
  handleFeedChange: PropTypes.func,
};

export default function Form({
  feed: { ducks, date, time, location, foodType, foodAmount },
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
        id="date"
        label="Date"
        type="date"
        value={date}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          handleFeedChange(e.target.value, "date");
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
        address={location}
        setAddress={(value) => {
          handleFeedChange(value, "location");
        }}
      />
      <Select
        label="Food Type"
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
        label="Food Amount (g)"
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
