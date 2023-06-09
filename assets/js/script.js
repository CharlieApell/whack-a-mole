const cursor = document.querySelector('.cursor');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');
const sound = new Audio("assets/media/smash.mp3");
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

// Code to random pick a hole and not the same hole twice.

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function popOut(){
    const time = Math.random() * 1200 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if(!timeUp) popOut();
    }, time);
}

// Start Game function/button.

function startGame(){
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);
    
    let startCountdown = setInterval(function(){
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if (countdown < 0){
        countdown = 0;
        clearInterval(startCountdown);
        countdownBoard.textContent = 'TIMES UP!';
    }
    }, 1000);
}
startButton.addEventListener('click', startGame);

// Whacks and points

function whack(e){
    score++; 
    this.style.backgroundImage = 'url("assets/images/sadchris.gif")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("assets/images/chrisrock.png")';
        this.style.pointerEvents = 'all';

    }, 800);
    scoreBoard.textContent = score;
    sound.play();
}

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

moles.forEach (mole => mole.addEventListener('click', whack));

// The how to box and animation

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });
  
  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
      closeModal(modal);
    });
  });
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
    });
  });
  
  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
  }
  
  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }