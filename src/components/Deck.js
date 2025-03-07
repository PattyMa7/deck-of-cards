import React, { useState } from "react";
import Card from "./Card";
import "../styles.css";

const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const createDeck = () => {
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

const Deck = () => {
  const [deck, setDeck] = useState(createDeck());
  const [selectedCards, setSelectedCards] = useState([]);
  const [pickedCard, setPickedCard] = useState(null);

  const drawCard = () => {
    if (deck.length === 0) return;
    const randomIndex = Math.floor(Math.random() * deck.length);
    const newCard = deck[randomIndex];
    setDeck(deck.filter((_, index) => index !== randomIndex));
    setSelectedCards([...selectedCards, newCard]);
  };

  // Deal specified number of cards
  const dealCards = (count) => {
    let newCards = [];
    let updatedDeck = [...deck];
    for (let i = 0; i < count && updatedDeck.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * updatedDeck.length);
        newCards.push(updatedDeck[randomIndex]);
        updatedDeck.splice(randomIndex, 1);
    }
    setDeck(updatedDeck);
    setSelectedCards(newCards);
  };

  const resetDeck = () => {
    setDeck(createDeck());
    setSelectedCards([]);
    setPickedCard(0);
  };

  const selectCard = (index) => {
    if (pickedCard === null) {
      setPickedCard(index);
    } else {
      let updatedCards = [...selectedCards];
      [updatedCards[pickedCard], updatedCards[index]] = [updatedCards[index], updatedCards[pickedCard]];
      setSelectedCards(updatedCards);
      setPickedCard(null);
    }
  };

  const tossCard = () => {
    if (pickedCard === null) return;
    const tossedCard = selectedCards[pickedCard];
    setSelectedCards(selectedCards.filter((_, index) => index !== pickedCard));
    setDeck(deck.filter(card => !(card.suit === tossedCard.suit && card.value === tossedCard.value)));
    setPickedCard(null);
  };

  const regroupCards = () => {
    let shuffledCards = [...selectedCards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setSelectedCards(shuffledCards);
  };

  const addWildcard = () => {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    setSelectedCards([...selectedCards, { suit: randomSuit, value: randomValue }]);
  };

  return (
    <div className="deck-container">
      <h1>Deck of Cards</h1>
      <div className="deck" onClick={drawCard}>
        {deck.length > 0 ? "Deck" : "No Cards Remaining"}
      </div>

      <div className="buttons">
        <button onClick={() => dealCards(5)}>Deal 5</button>
        <button onClick={() => dealCards(7)}>Deal 7</button>
        <button onClick={resetDeck}>Reset</button>
        <button onClick={tossCard} disabled={pickedCard === null}>Toss</button>
        <button onClick={addWildcard}>Wildcard</button>
        <button onClick={regroupCards}>Regroup</button>
      </div>

      <div className="selected-cards">
        {selectedCards.map((card, index) => (
          <Card
            key={index}
            suit={card.suit}
            value={card.value}
            onClick={() => selectCard(index)}
            isSelected={pickedCard === index}
          />
        ))}
      </div>
    </div>
  );
};

export default Deck;
