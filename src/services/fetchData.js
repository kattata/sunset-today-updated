import axios from "axios";

export const getSunsetTime = async (location) => {
  const APIkey = "760a38964fc64c749dd295af1d7e65d4";
  const url = `https://api.ipgeolocation.io/astronomy?apiKey=${APIkey}&location=${location}`;
  try {
    const response = await axios.get(url);
    const sunset = response.data.sunset;
    const date = response.data.date;
    const now = response.data.current_time;
    return [date, sunset, now];
  } catch (err) {
    console.error(err);
  }
};

export const getCurrentTime = async (location) => {
  const APIkey = "760a38964fc64c749dd295af1d7e65d4";
  const url = `https://api.ipgeolocation.io/astronomy?apiKey=${APIkey}&location=${location}`;
  try {
    const response = await axios.get(url);
    const now = response.data.current_time;
    const date = response.data.date;
    return [date, now];
  } catch (err) {
    console.error(err);
  }
};
