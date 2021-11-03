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
  hasPassed: true,
};

const App = () => {
  const [location, setLocation] = useState("");
  const [sunsetTime, setSunsetTime] = useState({
    sunsetDate: null,
    sunsetTime: null,
  });
  const [localTime, setLocalTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [randomImg, setRandomImg] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Retrieve Unsplash image from handleSubmit
  const passRandomImg = (img) => {
    setRandomImg(img);
  };

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
              passRandomImg={passRandomImg}
              setLoading={setLoading}
            />
          </Route>
          <Route exact path="/location/:location">
            <Location
              remainingTime={remainingTime}
              sunsetTime={sunsetTime}
              localTime={localTime}
              randomImg={randomImg}
              loading={loading}
              setRemainingTime={setRemainingTime}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
