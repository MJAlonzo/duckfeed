import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { db } from "../../core/firebase";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: "100vh",
    minHeight: "700px",
  },
  grid: {
    height: "100%",
  },
}));

const numberFieldProps = {
  type: "number",
  min: 0,
};

const initialNotification = {
  open: false,
  message: "",
  severity: "",
};

function Form() {
  const [ducks, setDucks] = useState(0);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodAmount, setFoodAmount] = useState(0);

  const [notification, setNotification] = useState(initialNotification);

  const classes = useStyles();

  const addFeeding = () => {
    const data = {
      id: new Date().getTime(),
      ducks,
      time,
      location,
      foodType,
      foodAmount,
    };

    db.collection("feeds")
      .doc(data.id.toString())
      .set(data)
      .then(() => {
        setNotification({
          open: true,
          message: "Thanks for feeding the ducks!",
          severity: "success",
        });
      })
      .catch((error) => {
        setNotification({
          open: true,
          message: "There was an error saving the form, please try again.",
          severity: "error",
        });
      });
  };

  function handleDismissNotification() {
    setNotification(initialNotification);
  }

  function handleSubmit() {
    console.log(ducks);
    console.log(time);
    console.log(location);
    console.log(foodType);
    console.log(foodAmount);

    addFeeding();
  }

  function reset() {
    setDucks(0);
    setTime("");
    setLocation("");
    setFoodType("");
    setFoodType("");
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
              <TextField
                id="ducks"
                fullWidth
                label="How Many Ducks"
                value={ducks}
                inputProps={numberFieldProps}
                margin="normal"
                onChange={(e) => {
                  setDucks(e.target.value);
                }}
              />
              <TextField
                id="time"
                fullWidth
                label="Time"
                value={time}
                margin="normal"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
              <TextField
                id="location"
                fullWidth
                label="Location"
                value={location}
                margin="normal"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <TextField
                id="foodType"
                fullWidth
                label="Food Type"
                value={foodType}
                margin="normal"
                onChange={(e) => {
                  setFoodType(e.target.value);
                }}
              />
              <TextField
                id="foodAmount"
                fullWidth
                label="Food Amount"
                value={foodAmount}
                inputProps={numberFieldProps}
                margin="normal"
                onChange={(e) => {
                  setFoodAmount(e.target.value);
                }}
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
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
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
