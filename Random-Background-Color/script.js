function generateRandomColor() {
  const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += hexArray[Math.floor(Math.random() * hexArray.length)];
  }

  return color;
}

setInterval(() =>{
  document.body.style.backgroundColor = generateRandomColor();
}, 2000)

