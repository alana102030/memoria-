// Array de cartas com imagens de gatos
const cartas = [
  { id: 1, imagem: 'https://placekitten.com/100/100' },
  { id: 2, imagem: 'https://placekitten.com/101/100' },
  { id: 3, imagem: 'https://placekitten.com/102/100' },
  { id: 4, imagem: 'https://placekitten.com/103/100' },
  { id: 5, imagem: 'https://placekitten.com/104/100' },
  { id: 6, imagem: 'https://placekitten.com/105/100' },
];

// Variáveis de controle
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;

// Referências ao DOM
const campoJogo = document.getElementById('campo-jogo');
const nomeJogadorInput = document.getElementById('nome-jogador');
const mensagem = document.getElementById('mensagem');
const contador = document.getElementById('contador');
const btnReiniciar = document.getElementById('reiniciar');

// Embaralhar as cartas
function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Criar as cartas na tela
function criarCartas() {
  campoJogo.innerHTML = '';
  embaralhar(cartas);
  cartas.forEach(carta => {
    const cartaElemento = document.createElement('div');
    cartaElemento.classList.add('carta');
    cartaElemento.dataset.id = carta.id;

    const frente = document.createElement('img');
    frente.src = 'https://placehold.co/100x100?text=?'; // Imagem de trás
    frente.classList.add('frente');

    const verso = document.createElement('img');
    verso.src = carta.imagem;
    verso.classList.add('verso');

    cartaElemento.appendChild(frente);
    cartaElemento.appendChild(verso);

    cartaElemento.addEventListener('click', virarCarta);

    campoJogo.appendChild(cartaElemento);
  });
  // Reiniciar variáveis
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
  paresEncontrados = 0;
  contador.textContent = `Pares encontrados: ${paresEncontrados}`;
  mensagem.textContent = '';
}

// Função para virar a carta
function virarCarta(e) {
  if (bloqueado) return;

  const carta = e.currentTarget;

  if (carta.classList.contains('virada')) return;

  carta.classList.add('virada');

  if (!primeiraCarta) {
    primeiraCarta = carta;
    return;
  }

  if (!segundaCarta) {
    segundaCarta = carta;
    verificarPar();
  }
}

// Verificar se as cartas combinam
function verificarPar() {
  const id1 = primeiraCarta.dataset.id;
  const id2 = segundaCarta.dataset.id;

  if (id1 === id2) {
    paresEncontrados++;
    mensagem.textContent = 'Par encontrado!';
    resetarSelecao();
    if (paresEncontrados === cartas.length) {
      mensagem.textContent = `Parabéns, ${nomeJogadorInput.value}! Você ganhou!`;
    }
  } else {
    bloqueado = true;
    setTimeout(() => {
      primeiraCarta.classList.remove('virada');
      segundaCarta.classList.remove('virada');
      resetarSelecao();
    }, 1000);
  }
}

// Resetar a seleção de cartas
function resetarSelecao() {
  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
  contador.textContent = `Pares encontrados: ${paresEncontrados}`;
}

// Evento do botão reiniciar
btnReiniciar.addEventListener('click', criarCartas);

// Inicializar o jogo
criarCartas();
