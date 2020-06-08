import { useState, useEffect } from "react";

import { db } from "../core/firebase";
import feedFactory from "../modules/dashboard/feedFactory";

export default function useFetchFeeds() {
  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    function getFeeds() {
      return Promise.resolve()
        .then(() => {
          const feedCollection = db.collection("feeds");

          if (feedCollection) {
            return feedCollection.get();
          } else {
            throw new Error();
          }
        })
        .catch((error) => {
          throw new Error(`Error: Getting feeds collection: ${error}`);
        })
        .then((querySnapshot) => {
          const feedsData = querySnapshot.docs.map((doc) => doc.data());

          return feedsData;
        })
        .catch((error) => {
          throw new Error(`Error retrieving feeds: ${error}`);
        });
    }

    getFeeds()
      .then((data) => {
        setFeeds(data.map((feed) => feedFactory(feed)));
      })
      .catch((error) => {
        console.error(`Error retrieving feeds ${error.message}`);
      });
  }, []);

  return feeds;
}
