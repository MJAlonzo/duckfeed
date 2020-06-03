import React, { useState } from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import SortableTableHead from "./SortableTableHead";
import SortableTableBody from "./SortableTableBody";

FeedingReport.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      ducks: PropTypes.number,
      dateTime: PropTypes.string,
      location: PropTypes.string,
      foodType: PropTypes.string,
      foodAmount: PropTypes.number,
    })
  ),
  ariaLabel: PropTypes.string,
};

export default function FeedingReport({ rows, ariaLabel }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("time");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <Toolbar>
        <Typography variant="h6">Feeding Report</Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table aria-label={ariaLabel}>
          <SortableTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <SortableTableBody rows={rows} order={order} orderBy={orderBy} />
        </Table>
      </TableContainer>
    </>
  );
}
