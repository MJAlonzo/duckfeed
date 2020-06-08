import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MutationObserver from "@sheerun/mutationobserver-shim";

import Dashboard from "../../../modules/dashboard/Dashboard";

window.MutationObserver = MutationObserver;

jest.mock("firebase", () => {
  const get = async () =>
    await Promise.resolve({
      docs: [
        {
          data: () => ({
            id: 1591081534749,
            ducks: 6,
            date: "2020-06-02",
            time: "13:05",
            location: "1691 Pear St, Victoria, BC V8P 2A5, Canada",
            food: {
              type: "birdFeed",
              amount: 10,
            },
          }),
        },
      ],
    });

  return {
    initializeApp: jest.fn(() => ({
      firestore: jest.fn(
        jest.fn(() => ({
          collection: jest.fn(() => ({
            get,
          })),
        }))
      ),
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

    expect(getByText("2020-06-02 - 13:05")).toBeInTheDocument();
  });
});
