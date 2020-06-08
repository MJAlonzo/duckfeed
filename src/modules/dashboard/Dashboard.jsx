import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import useFetchFeeds from "../../utils/useFetchFeeds";
import FeedingReport from "./FeedingReport";

const useStyles = makeStyles((theme) => ({
  innerGrid: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

function Dashboard() {
  const feeds = useFetchFeeds();
  const classes = useStyles();

  return (
    <Grid container>
      <Grid className={classes.innerGrid} item xs={12}>
        {feeds && feeds.length ? (
          <FeedingReport rows={feeds} ariaLabel="duck feeding report" />
        ) : (
          <Skeleton variant="rect" height={300} />
        )}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
