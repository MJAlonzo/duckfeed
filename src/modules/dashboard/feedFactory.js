export default function feedFactory({ id, ducks, time, location, food }) {
  const { type, amount } = food;

  return {
    id,
    ducks,
    time,
    location,
    foodType: type,
    foodAmount: amount,
  };
}
