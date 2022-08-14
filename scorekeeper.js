const winningValueSelect = document.getElementById("winningValueSelect");
const playerOneButton = document.getElementById("playerOneAddButton");
const playerTwoButton = document.getElementById("playerTwoAddButton");
const resetButton = document.getElementById("resetScore");
const playerOneCounterText = document.getElementById("playerOneCounter");
const playerTwoCounterText = document.getElementById("playerTwoCounter");

const NUMBER_OF_OPTIONS = 10;

let playerOneCounter = 0;
let playerTwoCounter = 0;
let selectedOptionValue = 1;

(function addOption() {
  for (i = 1; i <= NUMBER_OF_OPTIONS; i++) {
    let newOption = document.createElement("option");
    newOption.setAttribute("value", i);
    newOption.innerText = i;
    winningValueSelect.appendChild(newOption);
  }
})();

const disableInput = () => {
  playerOneButton.disabled = true;
  playerTwoButton.disabled = true;
  winningValueSelect.disabled = true;
};

const enableInput = () => {
  playerOneButton.disabled = false;
  playerTwoButton.disabled = false;
  winningValueSelect.disabled = false;
};

const resetGame = () => {
  playerOneCounterText.innerText = 0;
  playerTwoCounterText.innerText = 0;
  playerOneCounter = 0;
  playerTwoCounter = 0;
  playerOneCounterText.className = "";
  playerTwoCounterText.className = "";
  enableInput();
};

winningValueSelect.addEventListener("change", (e) => {
  selectedOptionValue = e.target.value;
  resetGame();
});

playerOneButton.addEventListener("click", (e) => {
  playerOneCounter++;
  playerOneCounterText.innerText = playerOneCounter;
  endGame();
});

playerTwoButton.addEventListener("click", (e) => {
  playerTwoCounter++;
  playerTwoCounterText.innerText = playerTwoCounter;
  endGame();
});

resetButton.addEventListener("click", resetGame);

const endGame = () => {
  const hasPlayerOneWon = selectedOptionValue == playerOneCounter;
  const hasPlayerTwoWon = selectedOptionValue == playerTwoCounter;
  const hasPlayerWon = hasPlayerOneWon || hasPlayerTwoWon;

  if (hasPlayerWon) {
    disableInput();

    if (hasPlayerOneWon) {
      playerOneCounterText.className = "won";
      playerTwoCounterText.className = "lost";
    } else {
      playerTwoCounterText.className = "won";
      playerOneCounterText.className = "lost";
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
};
