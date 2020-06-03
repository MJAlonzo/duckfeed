import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MutationObserver from "@sheerun/mutationobserver-shim";

import Dashboard from "../../../modules/dashboard/Dashboard";

window.MutationObserver = MutationObserver;

const db = jest.fn(() => {
  const get = async () => {
    const data = {
      docs: [await Promise.resolve(import("./serverFeedFixture"))],
    };

    return data;
  };

  return {
    collection: jest.fn(() => ({
      get,
    })),
  };
});

describe("<Dashboard/>", () => {
  it("renders without crashing", async () => {
    const { getByText } = render(<Dashboard />);

    await waitFor(() => expect(getByText("birdFeed")).toBeInTheDocument());

    expect(
      getByText("1691 Pear St, Victoria, BC V8P 2A5, Canada")
    ).toBeInTheDocument();
  });
});
