import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";

import Notification from "../../../components/Notification";

describe("<Notification/>", () => {
  const props = {
    notification: {
      open: true,
      severity: "success",
      message: "Test Notification",
    },
    handleDismiss: () => {},
    handleExited: () => {},
  };

  it("renders without crashing", () => {
    const { getByText } = render(<Notification {...props} />);

    expect(getByText("Test Notification")).toBeInTheDocument();
  });

  it("calls handleDismiss on close", () => {
    const mockHandleDismiss = jest.fn();
    const { getByLabelText } = render(
      <Notification {...props} handleDismiss={mockHandleDismiss} />
    );

    user.click(getByLabelText("Close"));

    expect(mockHandleDismiss).toHaveBeenCalled();
  });
});
