import { db } from "../../core/firebase";
import serverFeedFactory from "./serverFeedFactory";

export default function addFeeding(feed, setNotification) {
  const data = serverFeedFactory(feed);

  db.collection("feeds")
    .doc(data.id.toString())
    .set(data)
    .then(() => {
      setNotification({
        open: true,
        message: "Thanks for feeding the ducks!",
        severity: "success",
      });
    })
    .catch((error) => {
      setNotification({
        open: true,
        message: "There was an error saving the form, please try again.",
        severity: "error",
      });
    });
}
