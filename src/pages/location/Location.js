import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getBackgroundImg } from "../../services/fetchData";

const Location = ({ remainingTime, sunsetTime, localTime }) => {
  const { location } = useParams();

  return (
    <section className="location">
      {/* <img src={randomImg} alt="random img" className="random-bg" /> */}
      <p>Sunset in {location} in</p>
      {remainingTime && (
        <h2>
          {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}
        </h2>
      )}
      <p>
        At {sunsetTime.sunsetTime}, {sunsetTime.sunsetDate} local time
      </p>
      <p>Local time: {localTime}</p>
    </section>
  );
};

export default Location;
