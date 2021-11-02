import React, { useState, useEffect } from "react";
import { getRemainingTime } from "../../services/helpers";
import {
  getBackgroundImg,
  getSunsetTime,
  getLocalTime,
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
  const [sunsetTime, setSunsetTime] = useState({
    sunsetDate: null,
    sunsetTime: null,
  });
  const [coordinates, setCoordinates] = useState({
    lat: null,
    long: null,
  });
  const [localTime, setLocalTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  // Countdown;
  useEffect(() => {
    if (sunsetTime.sunsetTime !== null) {
      const interval = setInterval(() => {
        updateRemainingTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const updateRemainingTime = async () => {
    // const countdown = await getRemainingTime(1635883200000, LocalTime);
    if (coordinates) {
      const countdown = await getRemainingTime(
        sunsetTime.sunsetDate,
        sunsetTime.sunsetTime,
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

    // Get data from IPGElocation - sunset date and time + latitude and longitude
    const data = await getSunsetTime(location);

    setSunsetTime({
      sunsetDate: data.date,
      sunsetTime: data.sunset,
    });

    const lat = data.lat;
    const long = data.long;

    setCoordinates(lat, long);

    // Get data from Timezone DB - local time of the selected city
    const localTime = await getLocalTime(lat, long);
    setLocalTime(localTime);

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
          <p>At {sunsetTime.sunsetTime} local time</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
