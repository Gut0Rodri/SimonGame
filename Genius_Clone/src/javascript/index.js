const buttonInitGame = document.getElementById("button-init-game");
const currentScoreHTML = document.getElementById("current-score");
const previuosScoreHTML = document.getElementById("previous-score");
const bestScoreHTML = document.getElementById("best-score");
const buttonsTableGame = document.querySelectorAll(".button-table-game");

const colors = ["green", "red", "blue", "yellow"];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let canPlay = false;
let currentScore = 0;
let previuosScore = 0;
let bestScore = 0;
let indexUserSequence = 0;
let currentSequence = [];
let userSequence = [];

currentScoreHTML.textContent = currentScore;
previuosScoreHTML.textContent = previuosScore;
bestScoreHTML.textContent = bestScore;

// Função de contagem regressiva para iniviar o jogo
async function countdown() {
  
  document.body.classList.add("block");
  // Tempo para contagem regressiva
  let time = 3;

  let container = document.querySelector(".circle-mid");

  // Desabilitando o botão de inicializar
  buttonInitGame.disabled = true;
  buttonInitGame.classList.remove("usable");

  // Lógica para contagem regressiva
  while (time > 0) {
    container.textContent = time;

    await sleep(1000);

    time--;
  }

  container.textContent = "";

  await sleep(1000);

  randomColor();
}

// Função para escolher uma cor aleatóriamente
function randomColor() {
  // Gera um número aleatório
  const randomIndex = Math.floor(Math.random() * colors.length);

  // Insere cor na lista
  currentSequence.push(colors[randomIndex]);

  activeColor();

  return;
}

// Função para ativar as cores e mostrar para o usuário
async function activeColor() {
  for (const item of currentSequence) {
    const buttonColor = document.querySelector(`#${item}`);

    buttonColor.classList.add("active");

    await sleep(500);

    buttonColor.classList.remove("active");

    await sleep(500);
  }

  canPlay = true;

  await sleep(100);

  buttonsTableGame.forEach((button) => {
    button.classList.add("usable");
  });
}

async function checkSequence() {
  if (userSequence[indexUserSequence] !== currentSequence[indexUserSequence]) {
    gameOver();
    return;
  }

  indexUserSequence++;

  if (indexUserSequence === currentSequence.length) {
    win();
    return;
  }
}

async function win() {
  buttonsTableGame.forEach(async (button) => {
    button.classList.add("win");
    button.classList.remove("usable");

    await sleep(1000);

    button.classList.remove("win");
  });

  canPlay = false;
  userSequence = [];
  indexUserSequence = 0;
  currentScore++;
  currentScoreHTML.textContent = currentScore;

  await sleep(2000);

  randomColor();
}

async function gameOver() {
  document.body.classList.remove("block");

  buttonsTableGame.forEach(async (button) => {
    button.classList.add("game-over");
    button.classList.remove("usable");

    await sleep(1000);

    button.classList.remove("game-over");
  });

  await sleep(1000);

  if (currentScore > bestScore) {
    bestScore = currentScore;
  }

  buttonInitGame.disabled = false;
  buttonInitGame.classList.add("usable");
  userSequence = [];
  currentSequence = [];
  previuosScore = currentScore;
  currentScore = 0;
  indexUserSequence = 0;
  canPlay = false;

  currentScoreHTML.textContent = currentScore;
  previuosScoreHTML.textContent = previuosScore;
  bestScoreHTML.textContent = bestScore;
}

buttonsTableGame.forEach((button) => {
  button.addEventListener("click", async () => {
    if (!canPlay) return;

    button.classList.add("active");

    await sleep(150);

    button.classList.remove("active");

    const colorClicked = button.getAttribute("id");
    userSequence.push(colorClicked);

    checkSequence();
  });
});
