const btnEl = document.querySelector(".generate");
const serialEl = document.querySelector(".serial");
const characters = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charsCount = 10;

btnEl.addEventListener("click", generateRandomSerial);

function generateRandomSerial() {
  let randomSerial = "";
  for (let i = 0; i < charsCount; i++) {
    randomSerial += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  serialEl.textContent = randomSerial;
}

generateRandomSerial();
