import { useHistory } from "react-router-dom";
import { passCoordinates } from "../../services/getRemainingTime";
import {
  getSunsetTime,
  getLocalTime,
  getBackgroundImg,
} from "../../services/fetchData";
import "./home.scss";

const Home = ({
  handleChange,
  location,
  setLocalTime,
  setSunsetTime,
  passRandomImg,
  setLoading,
}) => {
  const history = useHistory();

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    const img = await getBackgroundImg();
    passRandomImg(img);

    setLoading(false);
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
        </div>
      </div>
    </section>
  );
};

export default Home;
