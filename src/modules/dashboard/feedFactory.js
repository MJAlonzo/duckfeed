export default function feedFactory({ id, ducks, date, time, location, food }) {
  const { type, amount } = food;

  return {
    id,
    ducks,
    dateTime: `${date} - ${time}`,
    location,
    foodType: type,
    foodAmount: amount,
  };
}
