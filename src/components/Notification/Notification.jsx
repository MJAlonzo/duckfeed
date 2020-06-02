import React from "react";
import PropTypes from "prop-types";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

Notification.propTypes = {
  notification: PropTypes.shape({
    open: PropTypes.bool,
    severity: PropTypes.string,
    message: PropTypes.string,
  }),
  handleDismiss: PropTypes.func,
};

export default function Notification({ notification, handleDismiss }) {
  const { open, severity, message } = notification;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleDismiss}>
      <Alert onClose={handleDismiss} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
