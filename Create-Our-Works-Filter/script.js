const switcherListItems = document.querySelectorAll(".switcher li");
const imgs = Array.from(document.images);

let $lastActiveItem = switcherListItems[0];

switcherListItems.forEach((li) => {
  li.addEventListener("click", () => {
    removeActive(li);
    manageImgs(li.dataset.category);
  });
});

function removeActive(li) {
  $lastActiveItem.classList.remove("active");
  li.classList.add("active");
  $lastActiveItem = li;
}

function manageImgs(category) {
  imgs.forEach((img) => {
    img.style.display = "none";
  });
  document.querySelectorAll(category).forEach((el) => {
    el.style.display = "block";
  });
}
