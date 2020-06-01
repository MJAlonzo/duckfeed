import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";

import TextField from "@material-ui/core/TextField";

import { GOOGLE_API_KEY } from "../../constants";

AddressField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  setAddress: PropTypes.func,
};

export default function AddressField({ id, label, value, setAddress }) {
  Geocode.setApiKey(GOOGLE_API_KEY);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      Geocode.fromLatLng(
        position.coords.latitude,
        position.coords.longitude
      ).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setAddress(address);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }, [setAddress]);

  return (
    <TextField
      id={id}
      fullWidth
      label={label}
      value={value}
      margin="normal"
      onChange={(e) => {
        setAddress(e.target.value);
      }}
    />
  );
}
