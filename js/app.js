import Deck from './deck.js';
import GamePlay from './gamePlay.js';
import GameUI from './gameUI.js';
import Player from './player.js';

const deck = new Deck();
const gamePlay = new GamePlay();
const gameUI = new GameUI();
const players = new Player();

gamePlay.setGameUI(gameUI);
gamePlay.setDeck(deck);
gamePlay.setPlayers(players);
gamePlay.newGame();

document.querySelector('#hit').addEventListener('click', () => {
    gamePlay.playerTurn();
});

document.querySelector('#stay').addEventListener('click', () => {
    document.querySelector('#hit').setAttribute('disabled', true);
    gamePlay.dealerTurn();
});

document.querySelector('#new').addEventListener('click', () => {
    document.querySelector('#hit').removeAttribute('disabled')
    gamePlay.nextRound();
});