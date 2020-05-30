import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  grid: {
    height: "100%",
  },
}));

const numberFieldProps = {
  type: "number",
  min: 0,
};

function App() {
  const [ducks, setDucks] = useState(0);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodAmount, setFoodAmount] = useState(0);

  const classes = useStyles();

  function handleSubmit() {
    console.log(ducks);
    console.log(time);
    console.log(location);
    console.log(foodType);
    console.log(foodAmount);
  }

  function reset() {
    setDucks(0);
    setTime("");
    setLocation("");
    setFoodType("");
    setFoodType("");
  }

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Card>
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
    </div>
  );
}

export default App;
