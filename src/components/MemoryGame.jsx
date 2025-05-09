import React, { useState, useEffect } from 'react';
import { generateCards } from '../data/cardsData';
import './MemoryGame.css';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [errors, setErrors] = useState(0);
  const [matches, setMatches] = useState(0);

  const initializeGame = () => {
    const shuffled = generateCards().sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
    setErrors(0);
    setMatches(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (!firstCard || !secondCard) return;

    const isMatch = firstCard.framework === secondCard.framework;

    if (isMatch) {
      disableCards();
      setMatches(prev => prev + 1);
    } else {
      unflipCards();
      setErrors(prev => prev + 1);
    }
  }, [secondCard]);

  const handleCardClick = (card) => {
    if (lockBoard || card.flipped || card === firstCard) return;

    const updatedCards = cards.map(c =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      setLockBoard(true);
    }
  };

  const disableCards = () => {
    setTimeout(() => {
      setFirstCard(null);
      setSecondCard(null);
      setLockBoard(false);
    }, 500);
  };

  const unflipCards = () => {
    setTimeout(() => {
      const updated = cards.map(c =>
        c.id === firstCard.id || c.id === secondCard.id
          ? { ...c, flipped: false }
          : c
      );
      setCards(updated);
      setFirstCard(null);
      setSecondCard(null);
      setLockBoard(false);
    }, 1000);
  };

  return (
    <div className="memory-container">

      <div className="memory-game">
        {cards.map(card => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped ? 'flip' : ''}`}
            onClick={() => handleCardClick(card)}
          >
            <img className="front-face" src={card.img} alt={card.framework} />
            <img className="back-face" src="/img/back.png" alt="Back" />
          </div>
        ))}
      </div>

      <div className="score-panel">
        <p className="errors">Errors: {errors}</p>
        {matches === cards.length / 2 && (
          <p className="win-message">🎉 You won ! Errors: {errors}</p>
        )}
        <button onClick={initializeGame}>Restart</button>
      </div>
    </div>
  );
};

export default MemoryGame;
