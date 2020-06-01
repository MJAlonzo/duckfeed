import React, { useState, createRef, useEffect } from "react";
import update from "immutability-helper";
import ReCAPTCHA from "react-google-recaptcha";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

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

const date = new Date().toISOString().slice(0, 16);

const initialFeed = {
  ducks: 0,
  date: date.split("T")[0],
  time: date.split("T")[1],
  location: "",
  foodType: "",
  foodAmount: 0,
};

function Form() {
  const [feed, setFeed] = useState(initialFeed);
  const [formValidation, setFormValidation] = useState({
    ducksIsValid: true,
    dateIsValid: true,
    timeIsValid: true,
    locationIsValid: true,
    foodTypeIsValid: true,
    foodAmountIsValid: true,
  });

  const [notification, setNotification] = useState(initialNotification);

  const classes = useStyles();

  useEffect(() => {
    getLocation(initialFeed, setFeed);
  }, []);

  function handleFeedChange(value, key) {
    const newFeed = update(feed, {
      [key]: { $set: value },
    });

    handleValidation(value, key);

    setFeed(newFeed);
  }

  function handleValidation(value, key) {
    let isValid = true;

    switch (key) {
      case "ducks":
        isValid = value > 0;
        break;
      case "foodAmount":
        isValid = value > 0;
        break;
      case "date":
        console.log(value);
        isValid = value instanceof Date && !isNaN(value.valueOf());
        break;
      case "time":
        isValid = value && new Date(value).getTime() > 0;
        break;
      case "location":
        isValid = value !== "";
        break;
      case "foodType":
        isValid = value !== "";
        break;
      default:
        isValid = true;
    }

    const newFormValidation = update(formValidation, {
      [`${key}IsValid`]: { $set: isValid },
    });

    setFormValidation(newFormValidation);
  }

  function handleDismissNotification() {
    setNotification(initialNotification);
  }

  function canSubmit() {
    return !Object.values(formValidation).some(
      (fieldIsValid) => fieldIsValid === false
    );
  }

  function handleSubmit() {
    if (canSubmit()) {
      addFeeding(feed, setNotification);
    }
    recaptchaRef.current.reset();
  }

  function reset() {
    setFeed(initialFeed);
  }

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
            <CardHeader title="Help feed the ducks!" />
            <CardContent>
              <FormFields
                feed={feed}
                formValidation={formValidation}
                handleFeedChange={handleFeedChange}
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
                disabled={!canSubmit()}
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
      />
    </div>
  );
}

export default Form;

function Notification({ notification, handleDismiss }) {
  const { open, severity, message } = notification;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleDismiss}>
      <Alert onClose={handleDismiss} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
