import arrow from "../../assets/left-arrow.svg";
import { useParams } from "react-router";
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

  const formatSunsetDate = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return {
      day,
      month,
      year,
    };
  };

  const formattedSunsetTime = formatSunsetDate(sunsetTime.sunsetDate);

  const formatLocalTime = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const hours = date.slice(11, 13);
    const minutes = date.slice(14, 16);
    return {
      day,
      month,
      year,
      hours,
      minutes,
    };
  };

  const formattedLocalTime = formatLocalTime(localTime);

  return (
    <section className="location">
      <button onClick={goBack} className="back-btn">
        <img src={arrow} alt="left arrow" />
        Back
      </button>
      <img src={randomImg} alt="random img" className="random-bg" />
      <div className="countdown-info">
        {!loading ? (
          <h1>
            {remainingTime.hours}:{remainingTime.minutes}:
            {remainingTime.seconds}
          </h1>
        ) : (
          <h1>Loading...</h1>
        )}
        <p>Until sunset in {location}</p>
        {remainingTime.hasPassed && (
          <p className="missed-msg">
            Sorry, you missed it. Come back tomorrow!
          </p>
        )}
      </div>
      <div className="location-info">
        <p>
          Local time: {formattedLocalTime.hours}:{formattedLocalTime.minutes},{" "}
          {formattedLocalTime.day}/{formattedLocalTime.month}/
          {formattedLocalTime.year}
        </p>
        <p>
          Sunset time: {sunsetTime.sunsetTime}, {formattedSunsetTime.day}/
          {formattedSunsetTime.month}/{formattedSunsetTime.year}
        </p>
      </div>
    </section>
  );
};

export default Location;
