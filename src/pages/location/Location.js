import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getBackgroundImg } from "../../services/fetchData";
import { useHistory } from "react-router-dom";
import "./location.scss";

const Location = ({ remainingTime, sunsetTime, localTime, randomImg }) => {
  const { location } = useParams();
  const history = useHistory();

  const goBack = () => {
    history.push("/");
  };

  console.log(randomImg);

  return (
    <section className="location">
      <button onClick={goBack}>Back</button>
      <img src={randomImg} alt="random img" className="random-bg" />
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
