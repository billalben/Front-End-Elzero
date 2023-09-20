let count = document.querySelector(".count");
let progress = document.querySelector(".progress");
let input = document.querySelector("input");
let div = document.querySelector("div");
let maxLength = input.getAttribute("maxlength");

count.textContent = maxLength;

input.oninput = function () {
  count.textContent = maxLength - this.value.length;

  if (count.textContent == 0) {
    count.classList.add("zero");
    progress.classList.add("final");
  } else {
    count.classList.remove("zero");
    progress.classList.remove("final");
  }

  progress.style.width = `${(this.value.length * 100) / maxLength}%`;
};
