import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';
import Modal from './components/Modal'

// 17 cards
const playableCards = [
  { id: 1, name: "Phantom" },
  { id: 2, name: "Vandal" },
  { id: 3, name: "Ares" },
  { id: 4, name: "Bulldog" },
  { id: 5, name: "Specter" },
  { id: 6, name: "Marshal" },
  { id: 7, name: "Stinger" },
  { id: 8, name: "Operator" },
  { id: 9, name: "Ghost" },
  { id: 10, name: "Frenzy" },
  { id: 11, name: "Odin" },
  { id: 12, name: "Guardian" },
  { id: 13, name: "Bucky" },
  { id: 14, name: "Judge" },
  { id: 15, name: "Classic" },
  { id: 16, name: "Shorty" },
  { id: 17, name: "Sheriff" },
];

function App() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [gameResult, setGameResult] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [seenCards, setSeenCards] = useState(new Set());
  
  let unseenCards:any[] = playableCards.filter((card: any) => !seenCards.has(card));
  if (unseenCards.length === 0 && !isDisplayed) {
    console.log("no more unseen cards");
    setIsDisplayed(true);
    setGameResult(true);
  }
  
  let seenCardsToShow:Set<any> = getSeenCardsToShow();
  let unseenCardsToShow:Set<any> = getUnseenCardsToShow(seenCardsToShow);
  const shownCards:any[] = [...unseenCardsToShow, ...seenCardsToShow];  // 8 cards
  // shuffle shown cards
  for (let i = shownCards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shownCards[i], shownCards[j]] = [shownCards[j], shownCards[i]];
  }
  
  function getUnseenCardsToShow(seenCardsToShow:Set<any>):Set<any> {
    let remainingLength = 8 - seenCardsToShow.size;
    let unseenCardsToShow:Set<any> = new Set();
    
    if (unseenCards.length < remainingLength) {
      for (let i = 0; i < unseenCards.length; i++) {
        // show all unseen cards (might need to randomize)
        unseenCardsToShow.add(unseenCards[i]);
      }
      remainingLength -= unseenCardsToShow.size;
      for (let i = 0; i < remainingLength; i++) {
        // show random of seen cards
        let index = Math.floor(Math.random() * seenCards.size);
        while (seenCardsToShow.has([...seenCards][index]) || unseenCardsToShow.has([...seenCards][index])) {
          index = Math.floor(Math.random() * seenCards.size);
        }
        unseenCardsToShow.add([...seenCards][index]);
      }
    }
    else {
      for (let i = 0; i < remainingLength; i++) {
        let index = Math.floor(Math.random() * unseenCards.length);
        while (unseenCardsToShow.has(unseenCards[index])) {
          index = Math.floor(Math.random() * unseenCards.length);
        }
        unseenCardsToShow.add(unseenCards[index]);
      }
    }
    return unseenCardsToShow;
  }
  
  function getSeenCardsToShow():Set<any> {
    if (seenCards.size === 0) return new Set();
    
    let n = Math.floor(Math.random() * Math.min(7, seenCards.size)) + 1;
    
    // randomly pick n cards from seenCards
    let seenCardsToShow:Set<any> = new Set();

    for (let i = 0; i < n; i++) {
      let index = Math.floor(Math.random() * seenCards.size);
      while (seenCardsToShow.has([...seenCards][index])) {
        index = Math.floor(Math.random() * seenCards.size);
      }
      seenCardsToShow.add([...seenCards][index]);
    }
    return seenCardsToShow;
  }
  
  function handleCardClick(card:any) {
    if (seenCards.has(card)) {
      console.log("game over");
      setIsDisplayed(true);
      setGameResult(false);
      return;
    }
    
    setSeenCards(new Set(seenCards).add(card));
    setScore(score + 1);
    if (score + 1 > highScore) {
      setHighScore(score + 1);
    }
  }
  
  function handleRestartClick() {
    setIsDisplayed(false);
    setScore(0);
    setSeenCards(new Set());
  }
  
  return (
    <div className="App">
      <h1>Memory Card</h1>
      <p className="scoreRow">Score: {score} | High score: {highScore}</p>
      <div className="cardContainer">
        {
          shownCards.map((card: any) => {
            return <Card 
                      key={card.id} 
                      card={card} 
                      handleCardClick={handleCardClick} />
          })
        }
      </div>
      
      <Modal 
        isDisplayed={isDisplayed}
        gameResult={gameResult}
        score={score}
        highScore={highScore}
        handleRestartClick={handleRestartClick} />
      
    </div>
  )
}

export default App
