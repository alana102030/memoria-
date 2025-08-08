const emojis = ['🐱', '🐱', '😺', '😺', '😻', '😻', '😸', '😸'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

const jogoContainer = document.getElementById('jogo');
const resultadoDiv = document.getElementById('resultado');

// Embaralha os emojis
function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Cria as cartas
function createCards() {
  const shuffledEmojis = shuffle([...emojis]);
  for (let i = 0; i < shuffledEmojis.length; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = shuffledEmojis[i];
    card.innerHTML = '';
    card.addEventListener('click', flipCard);
    jogoContainer.appendChild(card);
  }
}

// Função ao clicar na carta
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.innerHTML = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Verifica se as cartas combinam
function checkForMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    matches++;
    resetCards();
    if (matches === emojis.length / 2) {
      const nome = document.getElementById('nomeInput').value.trim();
      resultadoDiv.innerHTML = `Parabéns, ${nome || 'jogador'}! Você venceu!`;
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.innerHTML = '';
      secondCard.innerHTML = '';
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Inicializa o jogo
createCards();
