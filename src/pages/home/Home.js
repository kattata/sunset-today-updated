import React, { useState, useEffect } from "react";
import axios from "axios";
import { getRemainingTime } from "../../services/helpers";
import { getLocationInfo, getSunsetTime } from "../../services/fetchData";

const defaultRemainingTime = {
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const Home = () => {
  const [location, setLocation] = useState("");
  const [locationInfo, setLocationInfo] = useState({
    lat: "",
    long: "",
    name: "",
  });
  const [sunsetTime, setSunsetTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    // if (sunsetTime) {
    //   let idk = sunsetTime.toLocaleString();
    //   console.log(idk);
    // }
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(timezone);
  }, []);

  // Countdown
  // Try moment.js for converting timezone
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    return () => clearInterval(interval);
  });

  const updateRemainingTime = () => {
    setRemainingTime(getRemainingTime(sunsetTime));
  };

  // Sunrise Sunset API

  // Update input field
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // fetch data from Location IQ API - fetchData.js
    const fetchedLocationInfo = await getLocationInfo(location);
    setLocationInfo(fetchedLocationInfo);

    // fetch data from Sunrise Sunset API - fetchData.js
    const fetchedSunsetTime = await getSunsetTime(
      locationInfo.lat,
      locationInfo.long
    );
    setSunsetTime(fetchedSunsetTime);
  };

  return (
    <section className="home">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
      </form>
      <h1>Sunset in {location}</h1>
      <p>
        {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
      </p>
      <h2>At {sunsetTime}</h2>
    </section>
  );
};

export default Home;
