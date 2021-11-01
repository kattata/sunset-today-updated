import axios from "axios";

export const getLocationInfo = async (location) => {
  const locationIQAccessToken = "pk.fe0e6ba8a0f9d8ab93e5520ca08ba9dd";
  const url = `https://us1.locationiq.com/v1/search.php?key=${locationIQAccessToken}&q=${location}&format=json&limit=1`;
  try {
    const response = await axios.get(url);
    const item = response.data[0];
    return {
      lat: item.lat,
      long: item.lon,
      name: item.display_name,
    };
  } catch (err) {
    console.error(err);
  }
};

export const getSunsetTime = async (latitude, longitude) => {
  const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;
  try {
    const response = await axios.get(url);
    const item = response.data.results.sunset;
    console.log(item);
    // setSunsetTime(item);
    return item;
  } catch (err) {
    console.error(err);
  }
};
