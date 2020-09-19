'use strict';

const axios = require("axios");

async function fetchTimezone() {
  const response = await axios.get("http://worldtimeapi.org/api/ip");

  if (!response.data || !response.data.timezone) {
    throw Error("Response didnt contain the timezone");
  }

  return response.data.timezone;
}

async function fetchTime(timezone) {
  const response = await axios.get(
    `http://worldtimeapi.org/api/timezone/${timezone}`
  );

  return response.data.datetime;
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
