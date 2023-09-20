// select elements
let countSpan = document.querySelector(".quiz-info .count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let theResultContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// set options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObjects = JSON.parse(this.responseText);
      let qCount = questionsObjects.length;

      // create bullets + set questions count
      createBullets(qCount);

      // add question data
      addQuestionData(questionsObjects[currentIndex], qCount);

      // start countdown
      countdown(10, qCount);

      // click on submit
      submitButton.onclick = () => {
        // get right answer
        let theRightAnswer = questionsObjects[currentIndex].right_answer;

        // increase index
        currentIndex++;

        // check the answer
        checkAnswer(theRightAnswer, qCount);

        // remove previous question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // add question data
        addQuestionData(questionsObjects[currentIndex], qCount);

        // handle bullets class
        handleBullets();

        // start countdown
        clearInterval(countdownInterval);
        countdown(10, qCount);

        // show results
        showResults(qCount);
      };
    }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // create spans
  for (let i = 0; i < num; i++) {
    // create bullet
    let theBullet = document.createElement("span");

    // check if its first span
    if (i === 0) {
      theBullet.className = "on";
    }

    // append bullets to main bullet container
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // create h2 question title
    let questionTitle = document.createElement("h2");

    // create question text
    let questionText = document.createTextNode(obj.title);

    // append text to heading
    questionTitle.appendChild(questionText);

    // append h2 to quiz area
    quizArea.appendChild(questionTitle);

    // create the answers
    for (let i = 1; i <= 4; i++) {
      // create main answer
      let mainDiv = document.createElement("div");

      // add class to main div
      mainDiv.className = "answer";

      // create radio input
      let radioInput = document.createElement("input");

      // add type + name + id + data-attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // make first option checked
      if (i === 1) {
        radioInput.checked = true;
      }

      // create label
      let theLabel = document.createElement("label");

      // add for attribute
      theLabel.htmlFor = `answer_${i}`;

      // create label text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // add the text to label
      theLabel.appendChild(theLabelText);

      // add input + label to main div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // append all divs to answers area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);

  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
      return;
    }
  });
}

function showResults(count) {
  let theResult;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResult = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResult = `<span class="perfect">Perfect</span>, All Answers Are Good`;
    } else {
      theResult = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }

    theResultContainer.innerHTML = theResult;
    theResultContainer.style.padding = "10px";
    theResultContainer.style.backgroundColor = "white";
    theResultContainer.style.marginTop = "10px";
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}
