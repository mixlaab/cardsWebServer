const { Deck, Hand } = require('./game.js');

const deck = new Deck();
const player1 = new Hand(deck, 5);
player1.bringBackCards();