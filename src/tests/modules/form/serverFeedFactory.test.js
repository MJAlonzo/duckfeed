import serverFeedFactory from "../../../modules/form/serverFeedFactory";
import feedFixture from "./feedFixture";

describe("serverFeedFactory", () => {
  it("returns a feed object in the expected format", () => {
    const actual = serverFeedFactory(feedFixture());

    // Remove `id` since it's generated from date obj and is dynamic
    delete actual.id;

    expect(actual).toMatchObject({
      ducks: 6,
      date: "2020-06-02",
      time: "13:05",
      location: "1691 Pear St, Victoria, BC V8P 2A5, Canada",
      food: {
        type: "birdFeed",
        amount: 10,
      },
    });
  });
});
