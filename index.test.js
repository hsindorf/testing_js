/**
 * @jest-environment node
 */
'use strict';

const { fetchTimezone, fetchTime, getFormattedTime } = require("./index");
const { timezonePdt, timePdt } = require("./fixtures");
const nock = require("nock");

describe("Time application", () => {
  const baseUrl = "http://worldtimeapi.org/api";

  beforeEach(() => {
    nock.cleanAll();
  });

  describe("fetchTimezone gets timezone from external API", () => {
    it("returns the timezone for the user's IP", async () => {
      nock(baseUrl).get("/ip").reply(200, timezonePdt);

      const timezone = await fetchTimezone();
      expect(timezone).toEqual("America/Los_Angeles");
    });

    it("throws an error if the external api returns a non-2xx status code", async () => {});

    it("throws an error if the response doesn't contain the timezone", async () => {});
  });

  describe("fetchTime gets the time from an external API", () => {
    it("returns the time for the provided timezone", async () => {
      nock(baseUrl).get("/timezone/America/Los_Angeles").reply(200, timePdt);

      const timezone = await fetchTime("America/Los_Angeles");
      expect(timezone).toEqual("2020-09-19T11:52:48.747351-07:00");
    });

    it("throws an error if the external api returns a non-2xx status code", async () => {});

    it("throws an error if the response doesn't contain the time", async () => {});
  });

  describe("getFormattedTime", () => {
    it("returns the formatted time when the API requests are successful", async () => {});

    it("throws an error if the timezone request fails", async () => {});

    it("throws an error if the time request fails", async () => {});
  });
});
