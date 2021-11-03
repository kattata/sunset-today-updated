import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getBackgroundImg } from "../../services/fetchData";
import { useHistory } from "react-router-dom";
import "./location.scss";

const Location = ({
  remainingTime,
  sunsetTime,
  localTime,
  randomImg,
  loading,
  setRemainingTime,
}) => {
  const { location } = useParams();
  const history = useHistory();

  const goBack = () => {
    history.push("/");
    setRemainingTime({
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
  };

  console.log(randomImg);

  return (
    <section className="location">
      <button onClick={goBack} className="back-btn">
        Back
      </button>
      <img src={randomImg} alt="random img" className="random-bg" />
      <div className="sunset-info">
        <p>Sunset in {location} in</p>
        {!loading ? (
          <h1>
            {remainingTime.hours}:{remainingTime.minutes}:
            {remainingTime.seconds}
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
        {remainingTime.hasPassed && (
          <p className="missed-msg">
            Sorry, you missed it. Come back tomorrow!
          </p>
        )}
        <p>
          At {sunsetTime.sunsetTime}, {sunsetTime.sunsetDate} local time
        </p>
        <p>Local time: {localTime}</p>
      </div>
    </section>
  );
};

export default Location;
