"use strict";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

timezoneEl = document.querySelector(".timezone");
const timeEl = document.querySelector("h1");
const dateEl = document.querySelector(".date");

timezoneEl.textContent = dayjs.tz.guess();

function updateTime() {
  const now = dayjs();
  timeEl.textContent = now.format("hh:mm:ss");

  const currentDate = now.format("dddd, D MMMM, YYYY");
  if (currentDate !== dateEl.textContent) dateEl.textContent = currentDate;
}

updateTime();
window.addEventListener("load", () => {
  setInterval(updateTime, 1000);
});
