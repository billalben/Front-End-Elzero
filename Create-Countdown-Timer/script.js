const $days = document.querySelector(".days");
const $hours = document.querySelector(".hours");
const $minutes = document.querySelector(".minutes");
const $seconds = document.querySelector(".seconds");

// const countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();
const countDownDate = new Date("Mar 30, 2024 14:01:59").getTime();

function updateTimer() {
  const dateNow = new Date().getTime();
  const dateDifference = countDownDate - dateNow;

  const days = Math.floor(dateDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((dateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((dateDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((dateDifference % (1000 * 60)) / 1000);

  $days.textContent = days.toString().padStart(2, "0");
  $hours.textContent = hours.toString().padStart(2, "0");
  $minutes.textContent = minutes.toString().padStart(2, "0");
  $seconds.textContent = seconds.toString().padStart(2, "0");

  if (dateDifference <= 1000) {
    console.log("Countdown finished");
    clearInterval(counter);

    $days.textContent = "00";
    $hours.textContent = "00";
    $minutes.textContent = "00";
    $seconds.textContent = "00";
  }
}

const counter = setInterval(updateTimer, 1000);
