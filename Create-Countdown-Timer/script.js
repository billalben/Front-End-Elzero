// The End Of The Year Date To Countdown To
// 1000 milliseconds = 1 Second

let countDownDate = new Date("Dec 31, 2023 23:59:59").getTime();
// console.log(countDownDate);

let counter = setInterval(() => {
  // Get Date Now
  let dateNow = new Date().getTime();

  // Find The Date Difference Between Now And Countdown Date
  let dateDiff = countDownDate - dateNow;

  // Get Time Units
  // let days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.querySelector(".days").textContent = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").textContent = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").textContent = minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").textContent = seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff <= 1000) {
    clearInterval(counter);
  }
}, 1000);