const buttonInitGame = document.getElementById('button-init-game')
const currentScoreHTML = document.getElementById('current-score')
const previuosScoreHTML = document.getElementById('previous-score')
const bestScoreHTML = document.getElementById('best-score')

let currentScore = 0;
let previuosScore = 0;
let bestScore = 0;

currentScoreHTML.textContent = currentScore
previuosScoreHTML.textContent = previuosScore
bestScoreHTML.textContent = bestScore

// LISTA DE CORES DISPONÍVEIS
const colors = ["green", "red", "blue", "yellow"];

// LISTA ATUAL DE CORES ALEATÓRIAS
const currentSequence = [];

// LISTA DO USUÁRIO
const userSequence = [];

// FUNÇÃO DE CONTAGEM REGRESSIVA PARA INICIAR O JOGO
function countdown () {
  // TEMPO PARA CONTAGEM REGRESSIVA
  let time = 3;

  // CONTAINER ONDE IRÁ APARECER A CONTAGEM
  let container = document.querySelector('.circle-mid');

  // DESABILITANDO O BOTÃO
  buttonInitGame.disabled = true
  buttonInitGame.classList.remove('usable')

  // LÓGICA PARA CONTAGEM REGRESSIVA
  const interval = setInterval(() => {
    if (time > 0) {
      container.textContent = time
      time--;
    } else {
      container.textContent = 'Go'

      const timeout = setTimeout(() => {
        container.textContent = ''

        randomColor();

        clearInterval(interval)
        clearTimeout(timeout)
      }, 1000)
      return;
    }
  }, 1000)
}

function randomColor () {
  const randomIndex = Math.floor(Math.random() * colors.length)
  currentSequence.push(colors[randomIndex])
  return;
}

function activeColor () {
  currentSequence.forEach((item, index) => {
    const buttonColor = document.querySelector(`#${item}`);

    setTimeout(() => {
      buttonColor.classList.add("active")

      setTimeout(() => {
        buttonColor.classList.remove("active")
      }, 500)
    }, 0 + (1000 * index))
  })

  return;
}

