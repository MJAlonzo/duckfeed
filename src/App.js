import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  grid: {
    height: "100%",
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const [ducks, setDucks] = useState(0);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodAmount, setFoodAmount] = useState(0);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <TextField
              id="ducks"
              fullWidth
              label="How Many Ducks"
              value={ducks}
              inputProps={{ type: "number" }}
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
              margin="normal"
              onChange={(e) => {
                setFoodAmount(e.target.value);
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
