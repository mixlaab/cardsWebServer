window.addEventListener('load', () => {
  (async () => {
    await createDeck('/table', ".table", 2);
    await createDeck('/deck/2', ".hand", 2);
  })();
});

const createDeck = async (path, selector, flipped) => {
  const container = document.querySelector(selector);
  const deck = await (await fetch(path)).json();
  deck.forEach((card, index) => {
    container.append(createCard(card, (index < flipped)));
  });
}

const createCard = (card, flipped) => {
  //const deck = await (await fetch('/deck')).json();
  const number = card.slice(0, -1);
  const symbol = card.slice(-1);
  const container = document.querySelector('.deck');
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.setAttribute('number', number);
  cardDiv.setAttribute('symbol', symbol);
  cardDiv.innerHTML = `
    <div class = "card-inner">
      <div class = "card-front">
        ${frontContent(number, symbol)}
      </div>
      <div class = "card-back">
      </div>
    </div>
    `;
  //container.append(cardDiv);

  cardDiv.addEventListener('click', () => {
    if (cardDiv.classList.contains('flipped')) {
      cardDiv.classList.remove('flipped');
    }
    else {
      cardDiv.classList.add('flipped');
    }
    console.log(cardDiv.classList);
    console.log(`The card ${number} ${symbol} was clicked!`);
  });

  if (flipped) {
    cardDiv.classList.add('flipped');
  }
  //console.log('json', symbol);

  return cardDiv;
};

const frontContent = (number, symbol) => {
  const isNumber = !isNaN(number);

  return `<div class="card-corner top-left">
<div>${number}</div>
<div>${symbol}</div>
</div>
<div class="symbols">
${(isNumber) ? `${new Array(parseInt(number))
      .fill(symbol)
      .map((cardSymbol) => `
<div class = "qty">${cardSymbol}</div>
`)
      .join('')
      }` : ''}
${(number == "A") ? `<div class = "qty">${symbol}</div>` : ''}
</div>
<div class="card-corner bottom-right">
<div>${number}</div>
<div>${symbol}</div>
</div>`;
}


/*
<div class = "card-front">
        ${frontContent(number, symbol)}
      </div>
<div class="deck">${deck.cards
    .map((card) => {
        const number = card.slice(0, -1);
        const symbol = card.slice(-1);
        const isNumber = !isNaN(number);
        //let test = new Array(parseInt(number));
        return `<div class="card ${symbol} ${number}">
            <div class="card-corner top-left">
              <div>${number}</div>
              <div>${symbol}</div>
            </div>
            <div class="symbols">
              ${(isNumber) ? `${new Array(parseInt(number))
                .fill(symbol)
                .map((cardSymbol) => `
                  <div class="qty qty-${number}">${cardSymbol}</div>
                `)
                .join('')
                }` : ''}
            </div>
            <div class="card-corner bottom-right">
              <div>${number}</div>
              <div>${symbol}</div>
            </div>
          </div>`
    })
    .join('')
}</div>
*/