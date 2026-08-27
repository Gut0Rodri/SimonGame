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

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.3
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}

function playGreenSound() {
    playSound(261.63);
}

function playRedSound() {
    playSound(329.63);
}

function playYellowSound() {
    playSound(392.00);
}

function playBlueSound() {
    playSound(523.25);
}

function playCorrectSound() {
    playSound(523.25, 0.15);

    setTimeout(() => {
        playSound(659.25, 0.15);
    }, 150);

    setTimeout(() => {
        playSound(783.99, 0.3);
    }, 300);
}

function playWrongSound() {
    playSound(196.00, 0.3);

    setTimeout(() => {
        playSound(130.81, 0.5);
    }, 300);
}


// Função de contagem regressiva para iniviar o jogo
async function countdown() {
    document.body.classList.add("block");

    let time = 3;
    let container = document.querySelector(".circle-mid");

    buttonInitGame.disabled = true;
    buttonInitGame.classList.remove("usable");

    while (time > 0) {
        container.textContent = time;

        playSound(261.63, 0.15);

        await sleep(1000);

        time--;
    }

    container.textContent = "GO!";

    playSound(783.99, 0.4);

    await sleep(1000);

    container.textContent = "";

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
    const colorActive = buttonColor.getAttribute('id')

    buttonColor.classList.add("active");

    switch (colorActive) {
      case 'green':
        playGreenSound()
        break;
      case 'red':
        playRedSound()
        break;
      case 'blue':
        playBlueSound()
        break;
      case 'yellow':
        playYellowSound()
        break;
    }

    await sleep(500);

    buttonColor.classList.remove("active");

    await sleep(300);
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
  playCorrectSound();

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

  playWrongSound();

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

    switch (colorClicked) {
      case 'green':
        playGreenSound()
        break;
      case 'red':
        playRedSound()
        break;
      case 'blue':
        playBlueSound()
        break;
      case 'yellow':
        playYellowSound()
        break;
    }

    userSequence.push(colorClicked);

    checkSequence();
  });
});
