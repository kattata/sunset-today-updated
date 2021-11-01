import React, { useState, useEffect } from "react";
import { getRemainingTime } from "../../services/helpers";
import { getSunsetTime } from "../../services/fetchData";
import moment from "moment";

const defaultRemainingTime = {
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const Home = () => {
  const [location, setLocation] = useState("");
  const [sunsetTime, setSunsetTime] = useState(null);
  const [now, setNow] = useState(null);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  var moment = require("moment-timezone");

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    return () => clearInterval(interval);
  });

  const updateRemainingTime = async () => {
    const countdown = await getRemainingTime(sunsetTime, location);
    setRemainingTime(countdown);
  };

  // Update input field
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const set = await getSunsetTime(location);
    const today = moment(set[0]).format("YYYY-MM-DD");
    const sunset = new Date(`${today} ${set[1]}`).getTime();
    console.log(now);
    setSunsetTime(sunset);
    setNow(now);
  };

  return (
    <section className="home">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
      </form>
      <h1>Sunset in {location}</h1>
      {remainingTime && (
        <p>
          {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
        </p>
      )}
      <h2>At {sunsetTime}</h2>
    </section>
  );
};

export default Home;
