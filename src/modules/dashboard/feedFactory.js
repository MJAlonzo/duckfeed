export default function feedFactory({ id, ducks, date, time, location, food }) {
  const { type, amount } = food;

  return {
    id,
    dateTime: `${date} - ${time}`,
    location,
    ducks,
    foodType: type,
    foodAmount: amount,
  };
}
