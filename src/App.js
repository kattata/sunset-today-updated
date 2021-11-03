import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Location from "./pages/location/Location";
import "./styles/main.scss";
import { useHistory } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { getRemainingTime, passCoordinates } from "./services/helpers";
import { getSunsetTime, getLocalTime } from "./services/fetchData";

const defaultRemainingTime = {
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const App = () => {
  const [location, setLocation] = useState("");
  const [sunsetTime, setSunsetTime] = useState({
    sunsetDate: null,
    sunsetTime: null,
  });
  const [localTime, setLocalTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  // Countdown
  useEffect(() => {
    if (sunsetTime.sunsetTime !== null) {
      const interval = setInterval(() => {
        updateRemainingTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  // Update countdown every second
  const updateRemainingTime = async () => {
    const countdown = await getRemainingTime(
      sunsetTime.sunsetDate,
      sunsetTime.sunsetTime
    );

    setRemainingTime(countdown);
  };

  // Update input field
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Get data from IP Geoocation - sunset date and time + latitude and longitude
  //   const data = await getSunsetTime(location);

  //   setSunsetTime({
  //     sunsetDate: data.date,
  //     sunsetTime: data.sunset,
  //   });

  //   const lat = data.lat;
  //   const long = data.long;

  //   passCoordinates(lat, long);

  //   // Get data from Timezone DB - local time of the selected city
  //   const localTime = await getLocalTime(lat, long);
  //   setLocalTime(localTime);

  //   // Redirect to location page
  //   if (location) {
  //     history.push(`/location/${location}`);
  //     // console.log(location);
  //   }
  // };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home
              handleChange={handleChange}
              remainingTime={remainingTime}
              sunsetTime={sunsetTime}
              localTime={localTime}
              location={location}
              setLocalTime={setLocalTime}
              setSunsetTime={setSunsetTime}
            />
          </Route>
          <Route exact path="/location/:location">
            <Location
              remainingTime={remainingTime}
              sunsetTime={sunsetTime}
              localTime={localTime}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
