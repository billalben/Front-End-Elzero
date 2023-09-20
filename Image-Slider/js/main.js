// get slider items | Array.from [ES6 Feature]
let sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);

// get number of slides
let slidesCount = sliderImages.length;

// set current slide
let currentSlide = 1;

// slide number string element
let slideNumberElement = document.getElementById("slide-number");

// previous and next button
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

// handle click on previous and next button
nextButton.onclick = nextSlide;
prevButton.onclick = function () {
  prevSlide();
};

// create the main ul element
let paginationElement = document.createElement("ul");

// set Id on created element
paginationElement.setAttribute("id", "pagination-ul");

// create list items based on slides count
for (let i = 1; i <= slidesCount; i++) {
  // create the li
  let paginationItem = document.createElement("li");

  // set custom attribute
  paginationItem.setAttribute("data-index", i);

  // set item content
  paginationItem.appendChild(document.createTextNode(i));

  // append items to the main ul list
  paginationElement.appendChild(paginationItem);
}

// add the created ul element to the page
document.getElementById("indicators").appendChild(paginationElement);

// get the new created UL
let paginationCreatedUl = document.getElementById("pagination-ul");

// get pagination items | Array.from [ES6 Feature]
let paginationBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);

// loop through all bullets items
for (let i = 0; i < paginationBullets.length; i++) {
  paginationBullets[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    theChecker();
  };
}

// trigger the checker function
theChecker();

// next slide function
function nextSlide() {
  if (nextButton.classList.contains("disabled")) {
    // do nothing
    return false;
  } else {
    currentSlide++;
    theChecker();
  }
}

// previous slide function
function prevSlide() {
  if (prevButton.classList.contains("disabled")) {
    // do nothing
    return false;
  } else {
    currentSlide--;
    theChecker();
  }
}

// create the checker function
function theChecker() {
  // set the slide number
  slideNumberElement.textContent = `Slide #${currentSlide} of ${slidesCount}`;

  // remover all active classes
  removerAllActive();

  // set active class on current slide
  sliderImages[currentSlide - 1].classList.add("active");

  // set active class on current pagination item
  paginationCreatedUl.children[currentSlide - 1].classList.add("active");

  // check if current is the first
  if (currentSlide === 1) {
    // add disabled class on previous button
    prevButton.classList.add("disabled");
  } else {
    // remove disabled class from previous button
    prevButton.classList.remove("disabled");
  }

  // check if current is the last
  if (currentSlide === slidesCount) {
    // add disabled class on next button
    nextButton.classList.add("disabled");
  } else {
    // remove disabled class from next button
    nextButton.classList.remove("disabled");
  }
}

// remove all active classes from images and pagination bullets
function removerAllActive() {
  // loop through images
  sliderImages.forEach((img) => {
    if (img.classList.contains("active")) {
      img.classList.remove("active");
      return;
    }
  });
  paginationBullets.forEach((bullet) => {
    if (bullet.classList.contains("active")) {
      bullet.classList.remove("active");
      return;
    }
  });
}
