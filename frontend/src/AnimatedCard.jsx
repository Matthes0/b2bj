import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './AnimatedCard.css';
import axios from 'axios';

import tenOfClubs from './karty/10_of_clubs.png';
import tenOfDiamonds from './karty/10_of_diamonds.png';
import tenOfHearts from './karty/10_of_hearts.png';
import tenOfSpades from './karty/10_of_spades.png';
import twoOfClubs from './karty/2_of_clubs.png';
import twoOfDiamonds from './karty/2_of_diamonds.png';
import twoOfHearts from './karty/2_of_hearts.png';
import twoOfSpades from './karty/2_of_spades.png';
import threeOfClubs from './karty/3_of_clubs.png';
import threeOfDiamonds from './karty/3_of_diamonds.png';
import threeOfHearts from './karty/3_of_hearts.png';
import threeOfSpades from './karty/3_of_spades.png';
import fourOfClubs from './karty/4_of_clubs.png';
import fourOfDiamonds from './karty/4_of_diamonds.png';
import fourOfHearts from './karty/4_of_hearts.png';
import fourOfSpades from './karty/4_of_spades.png';
import fiveOfClubs from './karty/5_of_clubs.png';
import fiveOfDiamonds from './karty/5_of_diamonds.png';
import fiveOfHearts from './karty/5_of_hearts.png';
import fiveOfSpades from './karty/5_of_spades.png';
import sixOfClubs from './karty/6_of_clubs.png';
import sixOfDiamonds from './karty/6_of_diamonds.png';
import sixOfHearts from './karty/6_of_hearts.png';
import sixOfSpades from './karty/6_of_spades.png';
import sevenOfClubs from './karty/7_of_clubs.png';
import sevenOfDiamonds from './karty/7_of_diamonds.png';
import sevenOfHearts from './karty/7_of_hearts.png';
import sevenOfSpades from './karty/7_of_spades.png';
import eightOfClubs from './karty/8_of_clubs.png';
import eightOfDiamonds from './karty/8_of_diamonds.png';
import eightOfHearts from './karty/8_of_hearts.png';
import eightOfSpades from './karty/8_of_spades.png';
import nineOfClubs from './karty/9_of_clubs.png';
import nineOfDiamonds from './karty/9_of_diamonds.png';
import nineOfHearts from './karty/9_of_hearts.png';
import nineOfSpades from './karty/9_of_spades.png';
import aceOfClubs from './karty/ace_of_clubs.png';
import aceOfDiamonds from './karty/ace_of_diamonds.png';
import aceOfHearts from './karty/ace_of_hearts.png';
import aceOfSpades from './karty/ace_of_spades.png';
import jackOfClubs from './karty/jack_of_clubs.png';
import jackOfDiamonds from './karty/jack_of_diamonds.png';
import jackOfHearts from './karty/jack_of_hearts.png';
import jackOfSpades from './karty/jack_of_spades.png';
import kingOfClubs from './karty/king_of_clubs.png';
import kingOfDiamonds from './karty/king_of_diamonds.png';
import kingOfHearts from './karty/king_of_hearts.png';
import kingOfSpades from './karty/king_of_spades.png';
import queenOfClubs from './karty/queen_of_clubs.png';
import queenOfDiamonds from './karty/queen_of_diamonds.png';
import queenOfHearts from './karty/queen_of_hearts.png';
import queenOfSpades from './karty/queen_of_spades.png';
import cardBackground from './karty/card_background.png';
import {getCurrentUser} from "./api/auth.jsx";

const initialCardImages = [
  tenOfClubs, tenOfDiamonds, tenOfHearts, tenOfSpades,
  twoOfClubs, twoOfDiamonds, twoOfHearts, twoOfSpades,
  threeOfClubs, threeOfDiamonds, threeOfHearts, threeOfSpades,
  fourOfClubs, fourOfDiamonds, fourOfHearts, fourOfSpades,
  fiveOfClubs, fiveOfDiamonds, fiveOfHearts, fiveOfSpades,
  sixOfClubs, sixOfDiamonds, sixOfHearts, sixOfSpades,
  sevenOfClubs, sevenOfDiamonds, sevenOfHearts, sevenOfSpades,
  eightOfClubs, eightOfDiamonds, eightOfHearts, eightOfSpades,
  nineOfClubs, nineOfDiamonds, nineOfHearts, nineOfSpades,
  aceOfClubs, aceOfDiamonds, aceOfHearts, aceOfSpades,
  jackOfClubs, jackOfDiamonds, jackOfHearts, jackOfSpades,
  kingOfClubs, kingOfDiamonds, kingOfHearts, kingOfSpades,
  queenOfClubs, queenOfDiamonds, queenOfHearts, queenOfSpades
];

const getCardValue = (cardImage) => {
  try {
    if (!cardImage) return 0;
    const filename = cardImage.split('/').pop().split('.')[0].toLowerCase();
    const valuePart = filename.includes('_of_')
      ? filename.split('_of_')[0]
      : filename.replace(/([0-9])([a-z])/, '$1 $2').split(' ')[0];

    const numberWords = {
      two: 2, three: 3, four: 4, five: 5, six: 6,
      seven: 7, eight: 8, nine: 9, ten: 10
    };

    if (numberWords[valuePart]) return numberWords[valuePart];
    if (["jack", "queen", "king"].includes(valuePart)) return 10;
    if (valuePart === 'ace') return 11;

    return parseInt(valuePart, 10) || 0;
  } catch (e) {
    console.error('Error parsing card value:', cardImage, e);
    return 0;
  }
};

const calculateHandValue = (hand) => {
  let value = hand.reduce((acc, card) => acc + getCardValue(card.image), 0);
  let aces = hand.filter(card =>
    card.image.split('/').pop().split('.')[0].toLowerCase().includes('ace')
  ).length;

  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }
  return value;
};

const AnimatedCard = () => {
    const [user, setUser] = useState(null);
    const [balance, setBalance] = useState(0); // <- To jest setBalance
    useEffect(() => {
    getCurrentUser().then(data => {
      setUser(data);
      setBalance(data.profile.balance); // <- Ustawiamy początkowy balans
    });
    }, []);
  const [playerHand, setPlayerHand] = useState([]);
  const [betAmount, setBetAmount] = useState(0);
  const [dealerHand, setDealerHand] = useState([]);
  const [remainingCards, setRemainingCards] = useState(initialCardImages);
  const [gameStatus, setGameStatus] = useState('waiting');
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [isDealerDrawing, setIsDealerDrawing] = useState(false);
  const [gamePhase, setGamePhase] = useState('betting');
  const [isSecondDealerCardHidden, setIsSecondDealerCardHidden] = useState(true);
  const [isDealerCardFlipping, setIsDealerCardFlipping] = useState(false);
  const [splitHands, setSplitHands] = useState([]); // np. [[hand1], [hand2]]
  const [splitScores, setSplitScores] = useState([]);
  const [isSplit, setIsSplit] = useState(false);
  const [activeSplitIndex, setActiveSplitIndex] = useState(0);

  const dealerTimeoutRef = useRef(null);

  const handleBetChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    setBetAmount(value);
  };

  const multiplyBet = (multiplier) => {
    setBetAmount(prev => Math.max(0, Math.floor(prev * multiplier)));
  };
function getCookie(name) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null;
}
  const startGame = async () => {
  if (betAmount <= 0 || betAmount > balance) return;
const csrfToken = getCookie('csrftoken');
  try {
    const res = await axios.post('http://localhost:8000/api/games/bets/', {
      game: 1,
      user: 1,
      amount: betAmount,
      rate: 2.0
    },
     {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json',
      },
    }
    );
    console.log('Zakład zapisany w Django:', res.data);
  } catch (err) {
    console.error('Błąd przy zapisie zakładu:', err);
    return;
  }

  // Reset all game state including split
  setBalance(prev => prev - betAmount);
  setGameStatus('playing');
  setGamePhase('initial');
  setPlayerHand([]);
  setDealerHand([]);
  setPlayerScore(0);
  setDealerScore(0);
  setIsSecondDealerCardHidden(true);
  setSplitHands([]);
  setSplitScores([]);
  setIsSplit(false);
  setActiveSplitIndex(0);

  await new Promise(resolve => setTimeout(resolve, 300));
  const dealDelay = 500;

  await dealCard(setPlayerHand, setPlayerScore);
  await new Promise(resolve => setTimeout(resolve, dealDelay));
  await dealCard(setDealerHand, setDealerScore);
  await new Promise(resolve => setTimeout(resolve, dealDelay));
  await dealCard(setPlayerHand, setPlayerScore);
  await new Promise(resolve => setTimeout(resolve, dealDelay));
  await dealCard(setDealerHand, setDealerScore);

  setGamePhase('player-turn');
};

 const dealCard = (handSetter, scoreSetter, afterDrawCallback, isSplitDeal = false) => {
  return new Promise((resolve) => {
    if (remainingCards.length === 0) {
      console.warn('No cards left in deck!');
      resolve(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    const selectedImage = remainingCards[randomIndex];

    setRemainingCards(prev => prev.filter((_, index) => index !== randomIndex));

    const newCard = { id: Date.now(), image: selectedImage };

    if (isSplitDeal) {
      resolve(newCard);
      return;
    }

    if (typeof handSetter === 'function') {
      handSetter(prevHand => {
        const newHand = [...prevHand, newCard];
        const newScore = calculateHandValue(newHand);

        if (scoreSetter) {
          scoreSetter(newScore);
        }

        if (afterDrawCallback) afterDrawCallback(newHand, newScore);

        resolve(true);
        return newHand;
      });
    } else {
      resolve(newCard);
    }
  });
};

const handleHit = async () => {
  if (gamePhase !== 'player-turn') return;

  if (isSplit) {
    const newCard = await dealCard(null, null, null, true);

    // Use functional updates to get the latest state
    setSplitHands(prevHands => {
      const updatedHands = [...prevHands];
      updatedHands[activeSplitIndex] = [...updatedHands[activeSplitIndex], newCard];

      // Update score based on the updated hand
      setSplitScores(prevScores => {
        const newScores = [...prevScores];
        newScores[activeSplitIndex] = calculateHandValue(updatedHands[activeSplitIndex]);
        return newScores;
      });

      // Check if current hand is busted
      if (calculateHandValue(updatedHands[activeSplitIndex]) > 21) {
        if (activeSplitIndex < prevHands.length - 1) {
          setActiveSplitIndex(activeSplitIndex + 1); // Move to next hand
        } else {
          setTimeout(() => handleStand(), 500); // Small delay before stand
        }
      }

      return updatedHands;
    });
  } else {
    await dealCard(setPlayerHand, setPlayerScore, (newHand, newScore) => {
      if (newScore > 21) endGame('LOSE');
    });
  }
};


  useEffect(() => {
    const dealerValue = calculateHandValue(dealerHand);
    if (gamePhase === 'dealer-turn' && !isDealerDrawing) {
      if (dealerValue >= 17 || dealerValue > 21 || dealerHand.length >= 5) {
        endGame();
      } else {
        startDealerDrawing();
      }
    }
  }, [dealerHand, gamePhase, isDealerDrawing]);

const handleStand = () => {
  if (isSplit) {
    if (activeSplitIndex < splitHands.length - 1) {
      setActiveSplitIndex(activeSplitIndex + 1); // Move to next hand
    } else {
      // All hands finished, now dealer's turn
      setIsSecondDealerCardHidden(false);
      setGamePhase('dealer-turn');
    }
  } else {
    setIsSecondDealerCardHidden(false);
    setGamePhase('dealer-turn');
  }
};

  const handleDouble = () => {
    if (gamePhase !== 'player-turn' || playerHand.length !== 2) return;
    if (betAmount <= balance) {
      setBalance(prev => prev - betAmount);
      setBetAmount(prev => prev * 2);
      dealCard(setPlayerHand, setPlayerScore, () => handleStand());
    }
  };

const handleSplit = async () => {
  if (playerHand.length === 2 &&
      getCardValue(playerHand[0].image) === getCardValue(playerHand[1].image)) {
    // Create two new hands from the initial cards
    const hand1 = [{ ...playerHand[0], id: Date.now() }];
    const hand2 = [{ ...playerHand[1], id: Date.now() + 1 }];

    setSplitHands([hand1, hand2]);
    setSplitScores([
      getCardValue(hand1[0].image),
      getCardValue(hand2[0].image)
    ]);
    setIsSplit(true);
    setActiveSplitIndex(0);
    setPlayerHand([]);

    // Deal a card to each split hand with proper state updates
    const card1 = await dealCard(null, null, null, true);
    const card2 = await dealCard(null, null, null, true);

    setSplitHands(prev => [
      [...prev[0], card1],
      [...prev[1], card2]
    ]);

    setSplitScores([
      calculateHandValue([...hand1, card1]),
      calculateHandValue([...hand2, card2])
    ]);
  }
};



  const startDealerDrawing = () => {
    setIsDealerDrawing(true);
    drawDealerCards();
  };

  const drawDealerCards = () => {
    return new Promise(async (resolve) => {
      setIsDealerDrawing(true);
      if (isSecondDealerCardHidden) {
        setIsDealerCardFlipping(true);
        await new Promise(res => setTimeout(res, 800));
        setIsSecondDealerCardHidden(false);
        setIsDealerCardFlipping(false);
      }
      await dealCard(setDealerHand, setDealerScore);
      setIsDealerDrawing(false);
      resolve();
    });
  };

  const endGame = (forcedResult = null) => {
  setIsDealerDrawing(false);

  setTimeout(async () => {
    const finalDealerScore = calculateHandValue(dealerHand);
    let results = [];
    let totalPayout = 0;

    if (isSplit) {
      // Evaluate each split hand separately
      results = splitHands.map(hand => {
        const handScore = calculateHandValue(hand);
        let result;

        if (handScore > 21) result = 'LOSE';
        else if (finalDealerScore > 21) result = 'WIN';
        else if (handScore > finalDealerScore) result = 'WIN';
        else if (handScore < finalDealerScore) result = 'LOSE';
        else result = 'DRAW';

        // Blackjack check for split hands (typically counts as 21 in splits)
        if (handScore === 21 && hand.length === 2) {
          result = 'WIN'; // Usually split blackjacks pay 1:1
        }

        return result;
      });

      // Calculate total payout
      totalPayout = results.reduce((total, result) => {
        if (result === 'WIN') return total + betAmount;
        if (result === 'DRAW') return total + betAmount;
        return total;
      }, 0);

    } else {
      // Original single hand logic
      const finalPlayerScore = calculateHandValue(playerHand);
      let result = forcedResult;

      if (!forcedResult) {
        if (finalPlayerScore > 21) result = 'LOSE';
        else if (finalDealerScore > 21) result = 'WIN';
        else if (finalPlayerScore > finalDealerScore) result = 'WIN';
        else if (finalPlayerScore < finalDealerScore) result = 'LOSE';
        else result = 'DRAW';

        // Blackjack check
        if (finalPlayerScore === 21 && playerHand.length === 2 &&
            !(finalDealerScore === 21 && dealerHand.length === 2)) {
          result = 'BLACKJACK';
        }
      }

      results = [result];

      if (result === 'WIN') totalPayout = betAmount * 2;
      else if (result === 'BLACKJACK') totalPayout = Math.floor(betAmount * 2.5);
      else if (result === 'DRAW') totalPayout = betAmount;
    }

    try {
      await axios.post('http://localhost:8000/api/games/results/', {
        game: 1,
        user: 1,
        bet: betAmount,
        payout: totalPayout,
        result: results.join(', ')
      });
    } catch (err) {
      console.error('Error saving result:', err);
    }

    if (totalPayout > 0) {
      setBalance(prev => prev + totalPayout);
    }

    setGameStatus(results.includes('WIN') ? 'win' :
                 results.every(r => r === 'LOSE') ? 'lose' : 'draw');
    setGamePhase('game-over');
  }, 300);
};

  const handleNewGame = () => {
    setGamePhase('betting');
    setGameStatus('waiting');
    setBetAmount(0);
  };

return (
  <div className="game-container">
    <div className="controls-panel">
      {gamePhase === 'betting' && (
        <>
          <div className="bet-controls">
            <input
              type="number"
              placeholder="Bet amount"
              value={betAmount || ''}
              onChange={handleBetChange}
              className="bet-input"
            />
            <div className="bet-multipliers">
              <button onClick={() => multiplyBet(2)} className="multiplier-button">
                x2
              </button>
              <button onClick={() => multiplyBet(0.5)} className="multiplier-button">
                1/2
              </button>
            </div>
          </div>

          <button
            onClick={startGame}
            disabled={betAmount <= 0 || betAmount >= balance}
            className={`start-button ${(betAmount > 0 && betAmount <= balance) ? 'active' : 'disabled'}`}
          >
            Start Game
          </button>
        </>
      )}

      {gamePhase !== 'betting' && (
        <div className="game-controls">
          <div className="game-buttons-row">
            <button
              onClick={handleHit}
              disabled={gamePhase !== 'player-turn'}
              className={`game-button ${gamePhase === 'player-turn' ? 'active' : 'disabled'}`}
            >
              Hit
            </button>
            <button
              onClick={handleStand}
              disabled={gamePhase !== 'player-turn'}
              className={`game-button ${gamePhase === 'player-turn' ? 'active' : 'disabled'}`}
            >
              Stand
            </button>
          </div>
          <div className="game-buttons-row">
            <button
              onClick={handleDouble}
              disabled={gamePhase !== 'player-turn' || playerHand.length !== 2 || betAmount > balance}
              className={`game-button ${(gamePhase === 'player-turn' && playerHand.length === 2 && betAmount <= balance) ? 'active' : 'disabled'}`}
            >
              Double
            </button>
            <button
              onClick={handleSplit}
              disabled={gamePhase !== 'player-turn' || playerHand.length !== 2 ||
                !playerHand[0]?.image.includes(playerHand[1]?.image.split('_')[0])}
              className={`game-button ${(gamePhase === 'player-turn' && playerHand.length === 2 && 
                playerHand[0]?.image.includes(playerHand[1]?.image.split('_')[0])) ? 'active' : 'disabled'}`}
            >
              Split
            </button>
          </div>
        </div>
      )}

      {gamePhase === 'game-over' && (
        <div className="game-over-panel">
          <h2 className={`result-message ${gameStatus}`}>
            {gameStatus === 'win' ? 'You Won!' :
            gameStatus === 'lose' ? 'You Lost!' : 'It\'s a Tie!'}
          </h2>

          <button onClick={handleNewGame} className="new-game-button">
            New Game
          </button>
        </div>
      )}
    </div>

   <div className="game-board">
  {gamePhase === 'betting' ? (
    <div className="betting-message">
      <h2>Place your bet to start</h2>
      <p>Current bet: {betAmount}</p>
    </div>
  ) : (
    <>
      <div className="hand dealer-hand">
        <h2>Dealer's Hand (Score: {isSecondDealerCardHidden ? '?' : dealerScore})</h2>
        {dealerHand.map((card, index) => (
          <motion.div
            key={card.id}
            className="card"
            initial={{ opacity: 0, top: 0, left: '50%' }}
            animate={{ opacity: 1, top: 140, left: `calc(45% + ${index * 70}px)`, transform: 'translate(-50%, -50%)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img src={index === 1 && isSecondDealerCardHidden ? cardBackground : card.image} alt="Card" />
          </motion.div>
        ))}
      </div>

      {isSplit ? (
        <div className="split-hands-container">
          {splitHands.map((hand, handIndex) => (
            <div
              key={handIndex}
              className={`hand player-hand split-hand ${handIndex === activeSplitIndex ? 'active-hand' : ''}`}
              style={{ top: handIndex === 0 ? '40%' : '50%' }}
            >
              <h2>Hand {handIndex + 1} (Score: {splitScores[handIndex]})</h2>
              {hand.map((card, cardIndex) => (
                <motion.div
                  key={`${handIndex}-${cardIndex}`}
                  className="card"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: cardIndex * 0.1 }}
                  style={{ top: '50px',left: `calc(40% + ${cardIndex * 80}px)`, transform: 'translate(-50%, -50%)' }}
                >
                  <img src={card.image} alt="Card" />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="hand player-hand">
          <h2>Player's Hand (Score: {playerScore})</h2>
          {playerHand.map((card, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ top: '70px',left: `calc(41% + ${index * 70}px)`, transform: 'translate(-50%, 50%)' }}
            >
              <img src={card.image} alt="Card" />
            </motion.div>
          ))}
        </div>
      )}
    </>
  )}
</div>


  </div>
);

};

export default AnimatedCard;