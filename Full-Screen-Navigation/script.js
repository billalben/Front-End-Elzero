const toggler = document.querySelector(".toggle");
const nav = document.querySelector("nav");
const closed = document.querySelector(".close");
const links = document.querySelectorAll(".item-link");

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

toggler.addEventListener("click", () => {
  nav.classList.add("open");
});

closed.addEventListener("click", () => {
  nav.classList.remove("open");
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    nav.classList.remove("open");
  }
});
