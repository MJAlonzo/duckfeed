import React from "react";
import { Route, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Form from "./modules/form/Form";
import Dashboard from "./modules/dashboard/Dashboard";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    justifyContent: "space-between",
  },
  activeLink: {
    display: "none",
  },
}));

function App() {
  const location = useLocation();
  const classes = useStyles();

  return (
    <>
      <AppBar position={location.pathname === "/" ? "fixed" : "static"}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6">Duck Feed Tracker</Typography>
          {location.pathname === "/" ? (
            <IconButton
              component="a"
              href="/dashboard"
              color="inherit"
              aria-label="Report"
            >
              <TableChartOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              component="a"
              href="/"
              color="inherit"
              aria-label="Report"
            >
              <ExitToAppIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Route exact path="/" component={Form} />
      <Route path="/dashboard" component={Dashboard} />
    </>
  );
}

export default App;
