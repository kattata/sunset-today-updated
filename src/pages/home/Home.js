import React, { useState, useEffect } from "react";
import { getRemainingTime } from "../../services/helpers";
import {
  getBackgroundImg,
  getSunsetTime,
  getTimeZone,
} from "../../services/fetchData";
import moment from "moment";
import "./home.scss";

const defaultRemainingTime = {
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const Home = () => {
  const [location, setLocation] = useState("");
  const [sunsetTime, setSunsetTime] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    long: null,
  });
  const [timezone, setTimezone] = useState(null);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  var moment = require("moment-timezone");

  // Countdown;
  useEffect(() => {
    if (sunsetTime !== null) {
      const interval = setInterval(() => {
        updateRemainingTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const updateRemainingTime = async () => {
    // const countdown = await getRemainingTime(1635883200000, timezone);
    if (coordinates) {
      const countdown = await getRemainingTime(
        sunsetTime,
        "-33.8548157",
        "151.2164539"
      );
      setRemainingTime(countdown);
    }
  };

  // Update input field
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await getSunsetTime(location);
    const lat = data.lat;
    const long = data.long;

    setCoordinates(lat, long);
    const zone = await getTimeZone(lat, long);
    setTimezone(zone);

    const today = moment(data.date).format("YYYY-MM-DD");
    const sunset = new Date(`${today} ${data.sunset}`).getTime();
    setSunsetTime(sunset);

    // await getBackgroundImg();
  };

  return (
    <section className="home">
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="search-container">
          <h1>Sunset Today</h1>
          <p>
            If you're keen on watching the sunset today, search for your (or
            any!) city and see how much time is left until that beautiful moment
          </p>
          <form onSubmit={handleSubmit} className="location-form">
            <input
              type="text"
              onChange={handleChange}
              placeholder="Type in a city and press Enter"
            />
          </form>
          <p>Sunset in {location}</p>
          {remainingTime && (
            <p>
              {remainingTime.hours}:{remainingTime.minutes}:
              {remainingTime.seconds}
            </p>
          )}
          <p>At {sunsetTime}</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
