import { useState, useEffect, useMemo } from "react";
import  {fetchUserBalance, subtractBalance, addBalance} from "../../../AnimatedCard.jsx";

const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [
  { rank: "Ace", value: 1 },
  { rank: "2", value: 2 },
  { rank: "3", value: 3 },
  { rank: "4", value: 4 },
  { rank: "5", value: 5 },
  { rank: "6", value: 6 },
  { rank: "7", value: 7 },
  { rank: "8", value: 8 },
  { rank: "9", value: 9 },
  { rank: "10", value: 10 },
  { rank: "Jack", value: 11 },
  { rank: "Queen", value: 12 },
  { rank: "King", value: 13 },
];

const generateDeck = () => {
  let deck = [];
  suits.forEach((suit) => {
    ranks.forEach((rankObj) => {
      deck.push({ ...rankObj, suit });
    });
  });
  return deck.sort(() => Math.random() - 0.5);
};

export function useHiloGame() {
    const [balance, setBalance] = useState(0);
  useEffect(() => {
    fetchUserBalance().then(balance => {
      if (balance !== null) {
        setBalance(balance);
      }
    }).catch(err => console.error("Failed to fetch balance:", err));
  }, []);
  const [deck, setDeck] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [profit, setProfit] = useState(0);
  const [gameStatus, setGameStatus] = useState("idle");
  const [selectedOption, setSelectedOption] = useState(null);
  const [history, setHistory] = useState([]);
  const [betAmount, setBetAmount] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [cardAnimationKey, setCardAnimationKey] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const chances = useMemo(() => calculateChances(currentCard, deck), [currentCard, deck]);

  function calculateChances(card, deck) {
    if (!card || deck.length === 0) return { higher: 0, lower: 0, same: 0, higherOrSame: 0, lowerOrSame: 0 };

    const higher = deck.filter(c => c.value > card.value).length;
    const lower = deck.filter(c => c.value < card.value).length;
    const same = deck.filter(c => c.value === card.value).length;
    const total = deck.length;

    let result = { higher: 0, lower: 0, same: 0, higherOrSame: 0, lowerOrSame: 0 };

    if (card.value === 1) {
      result.higher = Math.round((higher / total) * 100);
      result.same = Math.round((same / total) * 100);
    } else if (card.value === 13) {
      result.lower = Math.round((lower / total) * 100);
      result.same = Math.round((same / total) * 100);
    } else {
      result.higherOrSame = Math.round(((higher + same) / total) * 100);
      result.lowerOrSame = Math.round(((lower + same) / total) * 100);

      const sum = result.higherOrSame + result.lowerOrSame;
      if (sum > 100) {
        if (result.higherOrSame >= result.lowerOrSame) result.higherOrSame -= (sum - 100);
        else result.lowerOrSame -= (sum - 100);
      } else if (sum < 100) {
        if (result.higherOrSame >= result.lowerOrSame) result.higherOrSame += (100 - sum);
        else result.lowerOrSame += (100 - sum);
      }
    }
    return result;
  }

  const getAvailableOptions = (card) => {
    if (!card) return [];
    if (card.value === 1) return ["higher", "same"];
    if (card.value === 13) return ["same", "lower"];
    return ["higherOrSame", "lowerOrSame"];
  };

  const placeFirstBet = () => {
    if (betAmount > 0 ) {
      if (gameStatus === "lost" || deck.length === 0) {
        resetGame();
        setGameStarted(true);
        setGameStatus("playing");
      } else {
        setGameStarted(true);
        setGameStatus("playing");
      }
    }
  };
  

  // const placeBet = (guess) => {
  //   if (!gameStarted || !guess || deck.length === 0) return;

  //   const newDeck = [...deck];
  //   const nextCard = newDeck.pop();
  //   setDeck(newDeck);

  //   let win = false;
  //   if (guess === "higher" && nextCard.value > currentCard.value) win = true;
  //   if (guess === "lower" && nextCard.value < currentCard.value) win = true;
  //   if (guess === "same" && nextCard.value === currentCard.value) win = true;
  //   if (guess === "higherOrSame" && (nextCard.value >= currentCard.value)) win = true;
  //   if (guess === "lowerOrSame" && (nextCard.value <= currentCard.value)) win = true;

  //   if (win) {
  //     let multiplier = 1;
  //     if (["higher", "lower", "higherOrSame", "lowerOrSame"].includes(guess)) multiplier = 1.07;
  //     if (guess === "same") multiplier = 12.5;
  //     setProfit((prev) => +(prev + (betAmount * (multiplier - 1))).toFixed(2));
  //     setCurrentCard(nextCard);
  //     setHistory(prev => {
  //       const updated = [...prev, nextCard];
  //       if (updated.length > 11) updated.shift(); // limit 11 kart
  //       return updated;
  //     });
  //   } else {
  //     setGameStatus("lost");
  //     setGameStarted(false);
  //     setCurrentCard(nextCard);
  //     setHistory(prev => {
  //       const updated = [...prev, nextCard];
  //       if (updated.length > 11) updated.shift();
  //       return updated;
  //     });
  //   }

  //   setSelectedOption(null);
  //   setCardAnimationKey(prev => prev + 1);
  // };



  
  // const skipCard = () => {
  //   if (deck.length === 0) return;
  //   const newDeck = [...deck];
  //   const nextCard = newDeck.pop();
  //   setDeck(newDeck);
  //   setCurrentCard(nextCard);
  //   setHistory(prev => {
  //     const updated = [...prev, nextCard];
  //     if (updated.length > 11) updated.shift();
  //     return updated;
  //   });
  //   setSelectedOption(null);
  //   setCardAnimationKey(prev => prev + 1);
  // };


  const placeBet = (guess) => {
    if (!gameStarted || !guess) return;
  
    let newDeck = [...deck];
  
    if (newDeck.length === 0) {
      newDeck = generateDeck();
    }
  
    const nextCard = newDeck.pop();
    setDeck(newDeck);
  
    let win = false;
    if (guess === "higher" && nextCard.value > currentCard.value) win = true;
    if (guess === "lower" && nextCard.value < currentCard.value) win = true;
    if (guess === "same" && nextCard.value === currentCard.value) win = true;
    if (guess === "higherOrSame" && (nextCard.value >= currentCard.value)) win = true;
    if (guess === "lowerOrSame" && (nextCard.value <= currentCard.value)) win = true;
  
    if (win) {
      let multiplier = 1;
      if (["higher", "lower", "higherOrSame", "lowerOrSame"].includes(guess)) multiplier = 1.07;
      if (guess === "same") multiplier = 12.5;
      setProfit((prev) => +(prev + (betAmount * (multiplier - 1))).toFixed(2));
      setCurrentCard(nextCard);
      setHistory((prev) => {
        const updated = [...prev, nextCard];
        if (updated.length > 11) updated.shift();
        return updated;
      });
    } else {
      setGameStatus("lost");
      setGameStarted(false);
      setCurrentCard(nextCard);
      setHistory((prev) => {
        const updated = [...prev, nextCard];
        if (updated.length > 11) updated.shift();
        return updated;
      });
    }
  
    setSelectedOption(null);
    setCardAnimationKey(prev => prev + 1);
  };
  
  const skipCard = () => {
    let newDeck = [...deck];
  
    if (newDeck.length === 0) {
      newDeck = generateDeck();
    }
  
    const nextCard = newDeck.pop();
    setDeck(newDeck);
    setCurrentCard(nextCard);
    setHistory((prev) => {
      const updated = [...prev, nextCard];
      if (updated.length > 11) updated.shift();
      return updated;
    });
    setSelectedOption(null);
    setCardAnimationKey(prev => prev + 1);
  };
  

const cashout = async () => {
  if (profit > 0) {
    try {
      await addBalance(profit);
      setBalance(prev => +(prev + profit).toFixed(2));
    } catch (error) {
      console.error("Failed to add profit to balance:", error);
    }

    const newDeck = generateDeck();
    const firstCard = newDeck.pop();
    setDeck(newDeck);
    setCurrentCard(firstCard);
    setProfit(0);
    setGameStatus("idle");
    setSelectedOption(null);
    setHistory([firstCard]);
    setBetAmount(1);
    setGameStarted(false);
    setCardAnimationKey(0);
  }
};
  

  const resetGame = () => {
    const newDeck = generateDeck();
    const firstCard = newDeck.pop();
    setDeck(newDeck);
    setCurrentCard(firstCard);
    setProfit(0);
    setGameStatus("idle");
    setSelectedOption(null);
    setHistory([firstCard]); // nowa historia tylko z pierwszą kartą
    setBetAmount(1);
    setGameStarted(false);
    setCardAnimationKey(0);
  };

  return {
    currentCard,
    placeBet,
    skipCard,
    cashout,
    profit,
    selectedOption,
    setSelectedOption,
    gameStatus,
    resetGame,
    chances,
    history,
    betAmount,
    setBetAmount,
    placeFirstBet,
    gameStarted,
    getAvailableOptions,
    cardAnimationKey,
  };
}
