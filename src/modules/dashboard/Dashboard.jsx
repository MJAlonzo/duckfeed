import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import { db } from "../../core/firebase";
import feedFactory from "./feedFactory";
import Table from "../../components/Table";

const useStyles = makeStyles((theme) => ({
  innerGrid: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

function Dashboard() {
  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    db.collection("feeds")
      .get()
      .then((querySnapshot) => {
        const feedsData = querySnapshot.docs.map((doc) => doc.data());
        setFeeds(feedsData.map((feed) => feedFactory(feed)));
      });
  }, []);

  const classes = useStyles();

  return (
    <Grid container>
      <Grid className={classes.innerGrid} item xs={12}>
        <Typography variant="h4">Dashboard</Typography>
        {`<Filter Row>`}
        {feeds && feeds.length ? (
          <Table rows={feeds} ariaLabel="duck feeding report" />
        ) : (
          <Skeleton variant="rect" height={300} />
        )}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
