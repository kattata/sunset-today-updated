import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getRemainingTime, passCoordinates } from "../../services/helpers";
import { getSunsetTime, getLocalTime } from "../../services/fetchData";
import "./home.scss";

const defaultRemainingTime = {
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const Home = ({
  handleChange,
  location,
  remainingTime,
  sunsetTime,
  localTime,
  setLocalTime,
  setSunsetTime,
}) => {
  const history = useHistory();
  // const [location, setLocation] = useState("");
  // const [sunsetTime, setSunsetTime] = useState({
  //   sunsetDate: null,
  //   sunsetTime: null,
  // });
  // const [localTime, setLocalTime] = useState(null);
  // const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  // // Countdown;
  // useEffect(() => {
  //   if (sunsetTime.sunsetTime !== null) {
  //     const interval = setInterval(() => {
  //       updateRemainingTime();
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // });

  // const updateRemainingTime = async () => {
  //   const countdown = await getRemainingTime(
  //     sunsetTime.sunsetDate,
  //     sunsetTime.sunsetTime
  //   );

  //   setRemainingTime(countdown);
  // };

  // // Update input field
  // const handleChange = (e) => {
  //   setLocation(e.target.value);
  // };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get data from IP Geoocation - sunset date and time + latitude and longitude
    const data = await getSunsetTime(location);

    setSunsetTime({
      sunsetDate: data.date,
      sunsetTime: data.sunset,
    });

    const lat = data.lat;
    const long = data.long;

    passCoordinates(lat, long);

    // Get data from Timezone DB - local time of the selected city
    const localTime = await getLocalTime(lat, long);
    setLocalTime(localTime);

    // Redirect to location page
    history.push(`/location/${location}`);
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
          {/* <p>Sunset in {location} in</p>
          {remainingTime && (
            <h2>
              {remainingTime.hours}:{remainingTime.minutes}:
              {remainingTime.seconds}
            </h2>
          )}
          <p>
            At {sunsetTime.sunsetTime}, {sunsetTime.sunsetDate} local time
          </p>
          <p>Local time: {localTime}</p> */}
        </div>
      </div>
    </section>
  );
};

export default Home;
