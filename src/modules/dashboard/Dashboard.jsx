import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";

import { db } from "../../core/firebase";

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
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data);
        setFeeds(data);
      });
  }, []);
  const classes = useStyles();

  return (
    <Grid container>
      <Grid className={classes.innerGrid} item xs={12}>
        <Typography variant="h4">Dashboard</Typography>
        {`<Filter Row>`}
        {feeds && feeds.length ? (
          <TableContainer component={Paper}>
            <Table aria-label="duck feeding report">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Ducks</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Food Type</TableCell>
                  <TableCell align="right">Food Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feeds.map((feed) => (
                  <TableRow key={feed.id}>
                    <TableCell align="right">{feed.ducks}</TableCell>
                    <TableCell>{feed.time}</TableCell>
                    <TableCell>{feed.location}</TableCell>
                    <TableCell>{feed.foodType}</TableCell>
                    <TableCell align="right">{feed.foodAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Skeleton variant="rect" height={300} />
        )}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
