// main variables
const $input = document.querySelector(".get-repos input");
const $getButton = document.querySelector(".get-button");
const $reposData = document.querySelector(".show-data");

$getButton.addEventListener("click", getRepos);

// get repos function
function getRepos() {
  const username = $input.value.trim();
  
  if (username === "") {
    $reposData.innerHTML = "<span>Please write Github Username</span>";
    return;
  }

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
      $reposData.innerHTML = "";

      data.forEach(repo => {
        const mainDiv = document.createElement("div");
        const secondDiv = document.createElement("div");
        const repoName = document.createTextNode(repo.name);

        mainDiv.appendChild(repoName);

        const theUrl = document.createElement("a");
        const theUrlText = document.createTextNode("Visit");

        theUrl.appendChild(theUrlText);
        theUrl.href = `https://github.com/${username}/${repo.name}`;
        theUrl.setAttribute("target", "_blank");

        secondDiv.appendChild(theUrl);

        const starsSpan = document.createElement("span");
        const starsText = document.createTextNode(`stars: ${repo.stargazers_count}`);

        starsSpan.appendChild(starsText);
        secondDiv.appendChild(starsSpan);

        mainDiv.className = "repo-box";
        mainDiv.appendChild(secondDiv);

        $reposData.appendChild(mainDiv);
      });
    });
}
