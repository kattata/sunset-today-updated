export const getRemainingTime = (sunsetTime) => {
  const sunsetTimestamp = new Date(sunsetTime).getTime();
  const nowTimestamp = new Date().getTime();
  const distance = sunsetTimestamp - nowTimestamp;

  if (distance < 0) {
    return {
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  return {
    hours: getHours(distance),
    minutes: getMinutes(distance),
    seconds: getSeconds(distance),
  };
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
