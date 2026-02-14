function goToPage(num){
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  document.getElementById('page'+num).classList.remove('hidden');
}

function startGame(){
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  document.getElementById('gamePage').classList.remove('hidden');
  initGame();
}

const noBtn=document.getElementById('noBtn');
noBtn.addEventListener('mouseover',()=>{
  const x=Math.random()*200;
  const y=Math.random()*100;
  noBtn.style.left=x+'px';
  noBtn.style.top=y+'px';
});

function createHearts(){
  const container=document.getElementById('hearts');
  for(let i=0;i<40;i++){
    const heart=document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML='💖';
    heart.style.left=Math.random()*100+'vw';
    heart.style.fontSize=Math.random()*20+15+'px';
    heart.style.animationDuration=Math.random()*6+4+'s';
    container.appendChild(heart);
  }
}
createHearts();

let emojis=['💖','💘','💝','🧸','🌹','💋','💕','✨'];
let cards=[...emojis,...emojis];
let flipped=[];
let matched=0;

function initGame(){
  const board=document.getElementById('gameBoard');
  board.innerHTML='';
  cards.sort(()=>0.5-Math.random());
  matched=0;
  flipped=[];
  cards.forEach(e=>{
    const card=document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji=e;
    card.addEventListener('click',flipCard);
    board.appendChild(card);
  });
}

function flipCard(){
  if(flipped.length<2 && !this.classList.contains('flipped')){
    this.classList.add('flipped');
    this.innerHTML=this.dataset.emoji;
    flipped.push(this);
  }
  if(flipped.length===2){
    setTimeout(checkMatch,700);
  }
}

function checkMatch(){
  if(flipped[0].dataset.emoji===flipped[1].dataset.emoji){
    matched+=2;
    if(matched===cards.length){
      setTimeout(()=>goToPage(3),1000);
    }
  }else{
    flipped.forEach(c=>{
      c.classList.remove('flipped');
      c.innerHTML='';
    });
  }
  flipped=[];
}
