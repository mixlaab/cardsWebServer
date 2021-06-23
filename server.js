const express = require('express')
const cors = require('cors');
const app = express()
app.use(express.static('public'));
app.use(cors());

const port = 3000;

const { Deck, Hand } = require('./app/game.js');
const deck = new Deck();

const table = deck.dispatchCards(5);

app.get('/deck', (req, res) => {
  res.send(deck.cards);
});

app.get('/table', (req, res) => {
  res.send(table);
});

app.get(`/deck/:size`, (req, res) => {
  const { size } = req.params;
  res.send(deck.dispatchCards(parseInt(size)));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
