import React, { useState, createRef, useEffect } from "react";
import update from "immutability-helper";
import ReCAPTCHA from "react-google-recaptcha";
import _isEqual from "lodash/isEqual";
import _omit from "lodash/omit";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import Notification from "../../components/Notification";
import addFeeding from "./addFeeding";
import FormFields from "./FormFields";
import getLocation from "./getLocation";
import { RECAPTCHA_SITE_KEY } from "../../constants";

const recaptchaRef = createRef();

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100vh",
    minHeight: "700px",
  },
  grid: {
    height: "100%",
  },
}));

const initialNotification = {
  open: false,
  message: "",
  severity: "",
};

function getLocalDateTime() {
  const localDateTimeString = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  return {
    date: localDateTimeString.split("T")[0],
    time: localDateTimeString.split("T")[1],
  };
}

const initialFeed = {
  ducks: 0,
  ...getLocalDateTime(),
  location: "",
  foodType: "",
  foodAmount: 0,
};

const initialFormValidation = {
  ducksIsValid: true,
  dateIsValid: true,
  timeIsValid: true,
  locationIsValid: true,
  foodTypeIsValid: true,
  foodAmountIsValid: true,
};

function Form() {
  const [feed, setFeed] = useState(initialFeed);
  const [formValidation, setFormValidation] = useState(initialFormValidation);

  const [notification, setNotification] = useState(initialNotification);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    getLocation(initialFeed, setFeed);
  }, []);

  useEffect(() => {
    if (!_isEqual(_omit(feed, "location"), _omit(initialFeed, "location"))) {
      setCanSubmit(true);
    }
  }, [feed]);

  function handleFieldChange(field, value) {
    const newFeed = update(feed, {
      [field]: { $set: value },
    });

    handleValidation(field, value);

    setFeed(newFeed);
  }

  function validateField(field, value) {
    let isValid = true;

    switch (field) {
      case "date":
        isValid = !isNaN(new Date(value));
        break;
      case "time":
        isValid = !isNaN(new Date(`${getLocalDateTime().date}T${value}`));
        break;
      case "location":
        isValid = value !== "";
        break;
      case "ducks":
        isValid = value > 0;
        break;

      case "foodType":
        isValid = value !== "";
        break;
      case "foodAmount":
        isValid = value > 0;
        break;
      default:
        isValid = true;
    }

    return isValid;
  }

  function handleValidation(field, value) {
    const isValid = validateField(field, value);
    const newFormValidation = update(formValidation, {
      [`${field}IsValid`]: { $set: isValid },
    });

    setFormValidation(newFormValidation);

    return isValid;
  }

  function handleDismissNotification() {
    const closedNotification = update(notification, {
      open: { $set: false },
    });

    setNotification(closedNotification);
  }

  function handleExitedNotification() {
    setNotification(initialNotification);
  }

  function validateForm() {
    return !Object.keys(feed).some(
      (field) => !handleValidation(field, feed[field])
    );
  }

  function handleSubmit() {
    if (validateForm()) {
      addFeeding(feed, setNotification);
      reset();
    }
    recaptchaRef.current.reset();
  }

  function reset() {
    setFeed(initialFeed);
    setFormValidation(initialFormValidation);
  }

  const classes = useStyles();

  return (
    <div className={classes.formContainer}>
      <Grid
        className={classes.grid}
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Let's feed the Ducks!" />
            <CardContent>
              <FormFields
                feed={feed}
                formValidation={formValidation}
                handleFieldChange={handleFieldChange}
              />
            </CardContent>
            <CardActions>
              <Button
                onClick={() => {
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!canSubmit}
                onClick={() => {
                  recaptchaRef.current.execute();
                }}
              >
                Submit
              </Button>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={() => {
                  handleSubmit();
                }}
              />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Notification
        notification={notification}
        handleDismiss={handleDismissNotification}
        handleExited={handleExitedNotification}
      />
    </div>
  );
}

export default Form;
