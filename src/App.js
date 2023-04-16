import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CardShufflingApp = () => {
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffleCount, setShuffleCount] = useState(0);

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
      setDeck(response.data.cards);
    };
    fetchDeck();
  }, []);

  const shuffle = () => {
    let shuffledDeck = [...deck];
    for (let i = 0; i < 22; i++) {
      shuffledDeck = shuffledDeck.sort(() => Math.random() - 0.5);
    }
    setDeck(shuffledDeck);
    setCurrentCard(shuffledDeck[0]);
    setIsShuffled(true);
    setShuffleCount((count) => count + 1);
  };

  return (
    <div className="app">
      <h1>Card Shuffling Application</h1>
      {isShuffled ? (
        <img className="card-image" src={currentCard?.image} alt={`${currentCard?.value} of ${currentCard?.suit}`} />
      ) : (
        <div className="face-down-card" />
      )}
      <button onClick={shuffle}>Shuffle</button>
      <p>
        Deck count: <strong>{deck.length}</strong>
      </p>
      <p>
        Shuffling count: <strong>{shuffleCount}</strong>
      </p>
    </div>
  );
};

export default CardShufflingApp;
