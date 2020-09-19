'use strict';

const axios = require("axios");

async function fetchTimezone() {
  const timezone = await axios.get("http://worldtimeapi.org/api/ip");

  return timezone.data.timezone;
}

async function fetchTime(timezone) {
  const time = await axios.get(
    `http://worldtimeapi.org/api/timezone/${timezone}`
  );

  return time.data.datetime;
}

async function getFormattedTime() {
  const timezone = await fetchTimezone();

  const time = await fetchTime(timezone);

  return `It's ${time} in ${timezone}`;
}

module.exports = {
  fetchTimezone: fetchTimezone,
  fetchTime: fetchTime,
  getFormattedTime: getFormattedTime,
};
