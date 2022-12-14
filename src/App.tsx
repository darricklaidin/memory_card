import { useState } from 'react'
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

  const [isDisplayed, setIsDisplayed] = useState(false);  // todo: dont need this; can be derived from game state
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [seenCards, setSeenCards] = useState(new Set());
  const [gameState, setGameState] = useState("playing"); // playing, won, lost
  
  console.log("seen cards:", seenCards);
  
  let unseenCards:any[] = playableCards.filter((card: any) => !seenCards.has(card));
  console.log("unseen cards:", unseenCards);
  // todo: if no more unseen card, player wins
  
  let unseenCardsToShow:Set<any> = getUnseenCardsToShow();
  console.log("unseen cards to show:", unseenCardsToShow.size);
  
  let seenCardsToShow:Set<any> = getSeenCardsToShow(unseenCardsToShow.size);
  console.log("seen cards to show:", seenCardsToShow);
  
  
  const shownCards:any[] = [...unseenCardsToShow, ...seenCardsToShow];  // 8 cards
  console.log("shown cards:", shownCards);
  
  
  function getUnseenCardsToShow():Set<any> {
    let n = 8;
    if (seenCards.size > 0) {
      let max = Math.min(7, unseenCards.length);
      n = (Math.random() * max) + 1;
    }
    // randomly pick n cards from unseenCards
    let unseenCardsToShow:Set<any> = new Set();
    for (let i = 0; i < n; i++) {
      let index = Math.floor(Math.random() * unseenCards.length);
      
      while (unseenCardsToShow.has(unseenCards[index])) {
        index = Math.floor(Math.random() * unseenCards.length);
      }
      
      unseenCardsToShow.add(unseenCards[index]);
    }
    return unseenCardsToShow;
  }
  
  function getSeenCardsToShow(unseenCardsShownLength:number):Set<any> {
    const n = 8 - unseenCardsShownLength;
    let seenCardsToShow:Set<any> = new Set();
    let seenCardsList = Array.from(seenCards);
    for (let i = 0; i < n; i++) {
      let index = Math.floor(Math.random() * seenCardsList.length);
      
      while (seenCardsToShow.has(seenCardsList[index])) {
        index = Math.floor(Math.random() * seenCardsList.length);
      }
      
      seenCardsToShow.add(seenCardsList[index]);
    }
    return seenCardsToShow;
  }
  
  return (
    <div className="App">
      <h1>Memory Card</h1>
      <p className="scoreRow">Score: {score} | High score: {highScore}</p>
      <div className="cardContainer">
        {
          shownCards.map((card: any) => {
            return <Card key={card.id} name={card.name} />
          })
        }
      </div>
      
      <Modal isDisplayed={isDisplayed} />
      
    </div>
  )
}

export default App
