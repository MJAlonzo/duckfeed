import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Dropdown from "../../../components/Dropdown";

describe("<Dropdown/>", () => {
  const props = {
    value: "test",
    onChange: () => {},
    label: "Test Label",
    id: "testDropdown",
    options: [
      {
        value: "option1",
        label: "Option 1",
      },
      {
        value: "option2",
        label: "Option 2",
      },
    ],
    error: false,
  };

  it("renders without crashing", () => {
    const { getByLabelText } = render(<Dropdown {...props} />);

    expect(getByLabelText("Test Label")).toBeInTheDocument();
  });
});
