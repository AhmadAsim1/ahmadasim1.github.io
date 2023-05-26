const myForm = document.querySelector("#myform");
const body = document.querySelector(".body");
const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");
const inputName = document.querySelector("#name");
const highest = document.querySelector(".highscore");
var highscore = 5; //Default HighScore
const scoreboard = {
  player: 0,
  computer: 0,
};

//Playing Function
function play(event) {
  if (inputName.value == "") {
    checkName();
  } else {
    restart.style.display = "inline-block";
    const playerChoice = event.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
    gameEnd();
  }
}

function checkName() {
  modal.style.display = "block";
  result.innerHTML = `<h2>Hold Up a Sec!!!</h2>
        <i id="paper" class="paperHand fas fa-hand-paper fa-10x"></i>
        <p>Enter a Name or Something if You Really Wanna Play</p>
        `;
}

//Computers Choice
function getComputerChoice() {
  var num = Math.random();
  if (num <= 0.34) {
    return "rock";
  } else if (num > 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
}
//winner
function getWinner(p, c) {
  if (p === c) {
    return "Draw";
  } else if (p === "rock") {
    if (c === "paper") {
      return "computer";
    } else {
      return "player";
    }
  } else if (p === "paper") {
    if (c === "rock") {
      return "player";
    } else {
      return "computer";
    }
  } else if (p === "scissors") {
    if (c === "rock") {
      return "computer";
    } else {
      return "player";
    }
  }
}

//ScoreBoard
function showWinner(winner, computerChoice) {
  if (winner === "player") {
    scoreboard.player++;
    result.innerHTML = `
                <h2>You WON!</h2>
                <i id="rock" class="fas fa-hand-${computerChoice} fa-10x"></i>
                <p>Computer Chose ${
                  computerChoice.charAt(0).toUpperCase() +
                  computerChoice.slice(1)
                }</strong></p>`;
  } else if (winner === "computer") {
    scoreboard.computer++;
    result.innerHTML = `
        <h2>You LOST!</h2>
        <i id="rock" class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose ${
          computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
        }</strong></p>
`;
  } else {
    result.innerHTML = `
        <h2>Its A DRAW!</h2>
        <i id="rock" class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose ${
          computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
        }</strong></p>
`;
  }
  //Scoreboard Show
  score.innerHTML = `
        <p>${inputName.value}: ${scoreboard.player}</p>
        <p id='comp'>Computer: ${scoreboard.computer}</p>
    `;
  //Modal Display
  modal.style.display = "block";
}

//Restart Button
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>${inputName.value}: 0</p>
    <p id='comp'>Computer: 0</p>
    `;
  restart.style.display = "none";
}

//Clear Model
function clearModal(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//
function onSubmit(e) {
  e.preventDefault();
  if (inputName.value == "") {
    checkName();
  } else {
    score.innerHTML = `
        <p>${inputName.value}: 0</p>
        <p id='comp'>Computer: 0</p>
        `;
    myForm.style.display = "none";
  }
}

//HighScore
function highCheck() {
  if (scoreboard.player > highscore) {
    highscore = scoreboard.player;
    result.innerHTML = `
        <h2>Congrats ${inputName.value} New HighScore</h2>
        <p>Your highscore is ${scoreboard.player}</p>
        `;
    highest.innerHTML = `
        <h2>Current HighScore is: ${highscore}</h2>
        `;
    restartGame();
  }
}

function gameEnd() {
  if (scoreboard.computer >= 5) {
    result.innerHTML = `
        <h2>${inputName.value} Lost</h2>
        <p>You lost the match!</p>
        `;
    highCheck();
    restartGame();
  }
}

//Event Listeners
choices.forEach((choice) => choice.addEventListener("click", play));

window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);
myForm.addEventListener("submit", onSubmit);
