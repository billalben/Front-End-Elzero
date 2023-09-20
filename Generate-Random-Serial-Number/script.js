let btnEl = document.querySelector(".generate");
let serialEl = document.querySelector(".serial");

btnEl.onclick = function () {
  let characters = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charsLength = characters.length;
  let charsCount = 10;
  let randomSerial = "";
  for (let i = 0; i < charsCount; i++) {
    randomSerial += characters[Math.floor(Math.random() * charsLength)];
  }
  serialEl.textContent = randomSerial;
  // serialEl.appendChild(document.createTextNode(randomSerial));
}