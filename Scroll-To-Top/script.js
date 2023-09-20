let span = document.querySelector(".up");

window.onscroll = function () {
  this.scrollY >= 800 ? span.classList.add("show") : span.classList.remove("show");
};

span.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// span.onclick = function () {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// };