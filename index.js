"use strict";

import "boxicons";
import MicroModal from "micromodal";
MicroModal.init();

import dayjs, { tz } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Add default values
timezoneEl = document.querySelector(".timezone");
const timeEl = document.querySelector("h1");
const dateEl = document.querySelector(".date");
const curTimezone = dayjs.tz.guess();
timezoneEl.textContent = curTimezone;

// Fillup select element with timezones
const timezoneSelectEl = document.querySelector(".modal__select select");
const timezoneArray = Intl.supportedValuesOf("timeZone");

timezoneArray.forEach((tz) => {
  const option = document.createElement(`option`);
  option.value = tz;
  option.textContent = tz;

  if (tz === curTimezone) option.selected = true;

  timezoneSelectEl.appendChild(option);
});

// Setup time updater
function updateTime() {
  const now = dayjs();
  timeEl.textContent = dayjs.tz(now).format("HH:mm:ss");

  const currentDate = dayjs.tz(now).format("dddd, D MMMM, YYYY");
  if (currentDate !== dateEl.textContent) dateEl.textContent = currentDate;
}

updateTime();
window.addEventListener("load", () => {
  setInterval(updateTime, 1000);
});

// Setup timezone changing
const applyBtn = document.getElementById("apply-btn");
applyBtn.addEventListener("click", () => {
  dayjs.tz.setDefault(timezoneSelectEl.value);
  timezoneEl.textContent = timezoneSelectEl.value;
});
