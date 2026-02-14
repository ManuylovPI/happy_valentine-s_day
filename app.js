function goToPage(num) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById('page' + num).classList.remove('hidden');
}

function startGame() {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById('gamePage').classList.remove('hidden');
  initGame();
}

const noBtn = document.getElementById('noBtn');
noBtn.addEventListener('mouseover', () => {
  const x = Math.random() * 200;
  const y = Math.random() * 100;
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
});

function createHearts() {
  const heartsContainer = document.getElementById('hearts');
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    heartsContainer.appendChild(heart);
  }
}
createHearts();

let emojis = ['💖','💘','💝','🌸','🧸','💞','💋','🌹'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matched = 0;

function initGame() {
  const board = document.getElementById('gameBoard');
  board.innerHTML = '';
  cards.sort(() => 0.5 - Math.random());
  cards.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.innerHTML = '';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    this.innerHTML = this.dataset.emoji;
    flippedCards.push(this);
  }
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
    matched += 2;
    if (matched === cards.length) {
      setTimeout(() => goToPage(3), 1000);
    }
  } else {
    flippedCards.forEach(card => {
      card.classList.remove('flipped');
      card.innerHTML = '';
    });
  }
  flippedCards = [];
}
