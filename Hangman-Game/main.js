// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let letterAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Work
letterAndSpace.forEach((letter) => {
  // Create Empty Span
  let span = document.createElement("span");

  // If Letter Is Space
  if (letter === " ") {
    // Add Class To Span
    span.className = "with-space";
  }

  // Append Spans To The Letters Guess Container
  letterGuessContainer.appendChild(span);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // Outside Loop

    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }

      // Play Fail Sound
      document.getElementById("fail").play();
    } else {
      document.getElementById("success").play();
    }
  }
});

// End Game
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text Node
  let divText = document.createTextNode(
    `Game Over, The Word Is: ${randomValueValue}`
  );

  // Append Text To Div
  div.appendChild(divText);

  // Add Class on Div
  div.className = "popup";

  // Append to The Body
  document.body.appendChild(div);
}