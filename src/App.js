import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Form from "./modules/form/Form";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Form />
    </div>
  );
}

export default App;
