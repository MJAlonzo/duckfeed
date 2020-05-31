export default function serverFeedFactory({
  ducks,
  time,
  location,
  foodType,
  foodAmount,
}) {
  return {
    id: new Date().getTime(),
    ducks,
    time: time,
    location,
    food: {
      type: foodType,
      amount: foodAmount,
    },
  };
}
