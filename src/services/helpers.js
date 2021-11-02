import { getLocalTime } from "./fetchData";
import moment from "moment";

let latitude;
let longitude;

export const passCoordinates = (lat, long) => {
  latitude = lat;
  longitude = long;
};

export const getRemainingTime = async (today, sunset) => {
  // In order to get reliable remaining time no matter where you check, I needed to create an independent system
  // Date of sunset in miliseconds
  const todayMs = convertTodayToMS(today);

  // Date of sunset in miliseconds
  const sunsetMs = convertSunsetToMS(todayMs, sunset);

  // Current time in the local timezone in miliseconds
  const localNow = await convertLocalTimeToMS(latitude, longitude);
  const distance = sunsetMs - localNow;

  if (distance < 0) {
    return {
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const countdown = {
    hours: getHours(distance),
    minutes: getMinutes(distance),
    seconds: getSeconds(distance),
  };

  return countdown;
};

const convertTodayToMS = (date) => {
  const todayMs = moment(date).format("YYYY-MM-DD");
  return todayMs;
};

const convertSunsetToMS = (today, sunset) => {
  const sunsetMs = new Date(`${today} ${sunset}`).getTime();
  return sunsetMs;
};

const convertLocalTimeToMS = async (lat, long) => {
  const current = await getLocalTime(lat, long);
  const now = new Date(`${current}`).getTime();
  return now;
};

const getSeconds = (distance) => {
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return seconds;
};

const getMinutes = (distance) => {
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  return minutes;
};

const getHours = (distance) => {
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return hours;
};
