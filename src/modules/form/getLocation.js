import Geocode from "react-geocode";

import { GOOGLE_API_KEY } from "../../constants";

Geocode.setApiKey(GOOGLE_API_KEY);

export default function getLocation(feed, setFeed) {
  navigator.geolocation.getCurrentPosition((position) => {
    Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      (response) => {
        const location = response.results[0].formatted_address;

        setFeed({
          ...feed,
          location,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  });
}
