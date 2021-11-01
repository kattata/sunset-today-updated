import { getCurrentTime } from "./fetchData";

export const getRemainingTime = async (sunsetTime, location, country) => {
  const current = await getCurrentTime(location, country);
  const now = new Date(`${current}`).getTime();
  const distance = sunsetTime - now;

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
