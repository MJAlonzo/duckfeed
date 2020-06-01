import React from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import SortableTableHead from "./SortableTableHead";
import SortableTableBody from "./SortableTableBody";

FeedingReport.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      ducks: PropTypes.number,
      time: PropTypes.string,
      location: PropTypes.string,
      foodType: PropTypes.string,
      foodAmount: PropTypes.number,
    })
  ),
  ariaLabel: PropTypes.string,
};

export default function FeedingReport({ rows, ariaLabel }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("time");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
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
  );
}
