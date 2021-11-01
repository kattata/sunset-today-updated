import React, { useState, useEffect } from "react";
import { getRemainingTime } from "../../services/helpers";
import { getLocationInfo, getSunsetTime } from "../../services/fetchData";
import moment from "moment";

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
  const [now, setNow] = useState(null);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  var moment = require("moment-timezone");

  // useEffect(() => {
  //   const now = moment().format("DD MM YYYY hh:mm:ss");
  //   // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //   if (sunsetTime) {
  //     // const sunDate = moment(sunsetTime)
  //     //   .parseZone(sunsetTime)
  //     //   .format("DD MM YYYY hh:mm:ss");
  //     const zone = moment.tz.guess();
  //     const sunDate = moment.tz(sunsetTime, zone).format();
  //     // const sunDate = moment.tz.zone(zone).parse(Date.UTC(sunsetTime));
  //     // let a = moment.tz(`${sunsetTime}, ${timezone}`);
  //     // let converted = a.utc().format();
  //     // console.log(converted);
  //     // let a = moment.parseZone(sunsetTime).utcOffset(timezone);
  //     console.log("now " + now);
  //     console.log("zone " + zone);
  //     console.log("sunset " + sunDate);
  //   }
  // }, [sunsetTime]);

  // Countdown
  // Try moment.js for converting timezone
  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    return () => clearInterval(interval);
  });

  const updateRemainingTime = () => {
    setRemainingTime(getRemainingTime(sunsetTime, now));
  };

  // Update input field
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // // fetch data from Location IQ API - fetchData.js
    // const fetchedLocationInfo = await getLocationInfo(location);
    // setLocationInfo(fetchedLocationInfo);

    // // fetch data from Sunrise Sunset API - fetchData.js
    // const fetchedSunsetTime = await getSunsetTime(
    //   locationInfo.lat,
    //   locationInfo.long
    // );

    const set = await getSunsetTime(location);
    const today = moment(set[0]).format("YYYY-MM-DD");
    const sunset = new Date(`${today} ${set[1]}`).getTime();
    const now = new Date(`${today} ${set[2]}`).getTime();
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
      <p>
        {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
      </p>
      <h2>At {sunsetTime}</h2>
    </section>
  );
};

export default Home;
