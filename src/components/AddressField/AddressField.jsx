import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";

import TextField from "@material-ui/core/TextField";

import { GOOGLE_API_KEY } from "../../constants";

AddressField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  address: PropTypes.string,
  setAddress: PropTypes.func,
};

export default function AddressField({ id, label, address, setAddress }) {
  const [location, setLocation] = useState("");

  Geocode.setApiKey(GOOGLE_API_KEY);

  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          (response) => {
            setLocation(response.results[0].formatted_address);
          },
          (error) => {
            console.error(error);
          }
        );
      });
    }

    getLocation();
  }, []);

  useEffect(() => {
    if (!address && location) {
      setAddress(location);
    }
  }, [address, location, setAddress]);

  return (
    <TextField
      id={id}
      fullWidth
      label={label}
      value={address}
      margin="normal"
      onChange={(e) => {
        setAddress(e.target.value);
      }}
    />
  );
}
