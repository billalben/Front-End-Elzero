/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// settings levels
// settings levels
const levels = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// default level
let defaultLevelName = "Easy";
let defaultLevelSeconds = levels[defaultLevelName];

// catch selector
const startButton = document.querySelector(".start");
const lvlNameSpan = document.querySelector(".message .lvl");
const secondsSpan = document.querySelector(".message .seconds");
const theWord = document.querySelector(".the-word");
const upcomingWords = document.querySelector(".upcoming-words");
const input = document.querySelector(".input");
const timeLeftSpan = document.querySelector(".time span");
const scoreGot = document.querySelector(".score .got");
const scoreTotal = document.querySelector(".score .total");
const finishMessage = document.querySelector(".finish");

// setting level name + seconds + score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// disable paste event
input.onpaste = function () {
  return false;
};

// start game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // generate word function
  generateWords();
};

function generateWords() {
  // get random word from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get index of the word
  let wordIndex = words.indexOf(randomWord);
  // remove word from array
  words.splice(wordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  // empty upcoming word
  upcomingWords.innerHTML = "";
  // generate words
  for (let i = 0; i < words.length; i++) {
    // create div element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // call start play function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      // compare words
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
        // empty input fill
        input.value = '';
        // increase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          generateWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanTxt = document.createTextNode("Congratulations");
          span.appendChild(spanTxt);
          finishMessage.appendChild(span);
          // remove upcoming words box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanTxt = document.createTextNode("Game Over");
        span.appendChild(spanTxt);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
