import feedFactory from "../../../modules/dashboard/feedFactory";
import serverFeedFixture from "./serverFeedFixture";

describe("feedFactory", () => {
  it("returns a feed object in the expected format", () => {
    const actual = feedFactory(serverFeedFixture());

    expect(actual).toMatchObject({
      id: 1591081534749,
      dateTime: "2020-06-02 - 13:05",
      location: "1691 Pear St, Victoria, BC V8P 2A5, Canada",
      ducks: 6,
      foodType: "birdFeed",
      foodAmount: 10,
    });
  });
});
