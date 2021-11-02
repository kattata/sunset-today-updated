import axios from "axios";
import moment from "moment";

export const getSunsetTime = async (location) => {
  const apiKey = "760a38964fc64c749dd295af1d7e65d4";
  const url = `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&location=${location}`;
  try {
    const response = await axios.get(url);

    const sunset = response.data.sunset;
    const date = response.data.date;
    const lat = response.data.location.latitude;
    const long = response.data.location.longitude;

    return {
      date,
      sunset,
      lat,
      long,
    };
  } catch (err) {
    console.error(err);
  }
};

const convertTodayToMS = (date) => {
  const todayMs = moment(date).format("YYYY-MM-DD");
  return todayMs;
};

const convertSunsetToMS = (today, sunset) => {
  const sunsetMs = new Date(`${today} ${sunset}`).getTime();
  return sunsetMs;
};

export const getTimeZone = async (lat, long) => {
  const apiKey = `II60YTR24QZC`;
  const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${long}`;
  try {
    const response = await axios.get(url);
    const localTime = response.data.formatted;
    // console.log(localTime);
    return localTime;
  } catch (err) {
    console.error(err);
  }
};

export const getBackgroundImg = async () => {
  const apiKey = "IVoOzXojUU_edYCTpfIKbSccTms-_l51psRtzE3UxAU";
  const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=sunset`;
  try {
    const response = await axios.get(url);
    const image = response.data.urls.regular;
    console.log(image);
    return image;
  } catch (err) {
    console.error(err);
  }
};
