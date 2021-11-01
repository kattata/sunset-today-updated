import React, { useState, useEffect } from "react";
import axios from "axios";
import { getRemainingTime } from "../../services/helpers";

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

  // Location IQ API
  const locationIQAccessToken = "pk.fe0e6ba8a0f9d8ab93e5520ca08ba9dd";

  const getCoordinates = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${locationIQAccessToken}&q=${location}&format=json&limit=1`;
    try {
      const response = await axios.get(url);
      const item = response.data[0];
      setLocationInfo({
        lat: item.lat,
        long: item.lon,
        name: item.display_name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Sunrise Sunset API
  const getSunsetTime = async () => {
    const url = `https://api.sunrise-sunset.org/json?lat=${locationInfo.lat}&lng=${locationInfo.long}&formatted=0`;
    try {
      const response = await axios.get(url);
      const item = response.data.results.sunset;
      setSunsetTime(item);
    } catch (err) {
      console.error(err);
    }
  };

  // Update input field
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await getCoordinates();
    await getSunsetTime();
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
