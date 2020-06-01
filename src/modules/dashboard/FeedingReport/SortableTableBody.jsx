import React from "react";
import PropTypes from "prop-types";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

SortableTableBody.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      ducks: PropTypes.number,
      dateTime: PropTypes.string,
      location: PropTypes.string,
      foodType: PropTypes.string,
      foodAmount: PropTypes.number,
    })
  ),
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

function SortableTableBody({ rows, order, orderBy }) {
  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy)).map((row) => (
        <TableRow key={row.id}>
          <TableCell align="right">{row.ducks}</TableCell>
          <TableCell>{row.dateTime}</TableCell>
          <TableCell>{row.location}</TableCell>
          <TableCell>{row.foodType}</TableCell>
          <TableCell align="right">{row.foodAmount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default SortableTableBody;
