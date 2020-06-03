export default function serverFeedFactory({
  ducks,
  date,
  time,
  location,
  foodType,
  foodAmount,
}) {
  return {
    id: new Date().getTime(),
    ducks: parseInt(ducks),
    date,
    time,
    location,
    food: {
      type: foodType,
      amount: parseInt(foodAmount),
    },
  };
}
