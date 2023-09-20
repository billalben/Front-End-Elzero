// main variables

let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// get repos function
function getRepos() {
  if (theInput.value == "") {
    // If Value Is Empty
    reposData.innerHTML = "<span>Please write Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((data) => {
        // empty the container
        reposData.innerHTML = "";

        // loop on repos
        data.forEach((repo) => {
          // create the main element
          let mainDiv = document.createElement("div");

          // create div inside mainDiv
          let secondDiv = document.createElement("div");

          // create repo name text
          let repoName = document.createTextNode(repo.name);

          // append the text to main div
          mainDiv.appendChild(repoName);

          // create repo url anchor
          let theUrl = document.createElement("a");

          // create repo url text
          let theUrlText = document.createTextNode("Visit");

          // append to the repo url text to anchor tag
          theUrl.appendChild(theUrlText);

          // add the hyperText reference "href"
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          // set attribute blank
          theUrl.setAttribute("target", "_blank");
          // theUrl.target = "_blank";

          // append url anchor to the secondDiv
          secondDiv.appendChild(theUrl);

          // create stars count span
          let starsSpan = document.createElement("span");

          // create the stars count text
          let starsText = document.createTextNode(
            `stars: ${repo.stargazers_count}`
          );

          // add stars count text to stars span
          starsSpan.appendChild(starsText);

          // append stars count span to secondDiv
          secondDiv.appendChild(starsSpan);

          // add class on mainDiv
          mainDiv.className = "repo-box";

          // append the secondDiv to mainDiv
          mainDiv.appendChild(secondDiv);

          // append the mainDiv to container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
