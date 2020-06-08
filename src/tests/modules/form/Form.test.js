import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import MutationObserver from "@sheerun/mutationobserver-shim";

import Form from "../../../modules/form/Form";

window.MutationObserver = MutationObserver;

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

describe("<Form/>", () => {
  it("renders without crashing", () => {
    const { getByLabelText, getByText } = render(<Form />);

    expect(getByLabelText("Date")).toBeInTheDocument();
    expect(getByLabelText("Time")).toBeInTheDocument();
    expect(getByLabelText("Location")).toBeInTheDocument();
    expect(getByLabelText("How Many Ducks")).toBeInTheDocument();
    expect(getByText("Food Type")).toBeInTheDocument();
    expect(getByLabelText("Food Amount (g)")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();

    const submitButton = getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("ignores changes to location field to allow for geoLocation", async () => {
    const { getByLabelText, getByText } = render(<Form />);

    await user.type(getByLabelText("Location"), "location");

    await waitFor(() => expect(getByText("Submit")).toBeDisabled());
  });

  it("enables submit button when a field has changed", async () => {
    const { getByLabelText, getByText } = render(<Form />);

    await user.type(getByLabelText("How Many Ducks"), "-1");

    await waitFor(() => expect(getByText("Submit")).not.toBeDisabled());
  });

  it("does not allow 0 or a negative value for 'How Many Ducks' field", async () => {
    const { getByLabelText, getByText } = render(<Form />);

    await user.type(getByLabelText("How Many Ducks"), "-1");

    await (
      await waitFor(() => expect(getByText("How Many Ducks")))
    ).toHaveClass("Mui-error");
  });
});
