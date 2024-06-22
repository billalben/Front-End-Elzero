const count = document.querySelector(".count");
const progress = document.querySelector(".progress");
const input = document.querySelector("input");
const maxLength = input.getAttribute("maxlength");

count.textContent = maxLength;

input.addEventListener("input", () => {
  const remainingChars = maxLength - input.value.length;
  count.textContent = remainingChars;

  count.classList.toggle("zero", remainingChars === 0);
  progress.classList.toggle("final", remainingChars === 0);

  progress.style.width = `${(input.value.length * 100) / maxLength}%`;
});
