import React, { useState } from "react";
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
import { RECAPTCHA_SITE_KEY } from "../../constants";

const recaptchaRef = React.createRef();

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

const initialFeed = {
  ducks: 0,
  time: "",
  location: "",
  foodType: "",
  foodAmount: 0,
};

function Form() {
  const [feed, setFeed] = useState(initialFeed);

  const [notification, setNotification] = useState(initialNotification);

  const classes = useStyles();

  function handleFeedChange(value, key) {
    const newFeed = update(feed, {
      [key]: { $set: value },
    });

    setFeed(newFeed);
  }

  function handleDismissNotification() {
    setNotification(initialNotification);
  }

  function handleSubmit() {
    addFeeding(feed, setNotification);
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
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Help feed the ducks!" />
            <CardContent>
              <FormFields feed={feed} handleFeedChange={handleFeedChange} />
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
