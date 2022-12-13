import { useState } from 'react'
import './App.css'
import Card from './components/Card';
import Modal from './components/Modal'

const data = [
  { name: "Phantom" },
  { name: "Vandal" },
  { name: "Ares" },
  { name: "Bulldog" },
  { name: "Specter" },
  { name: "Marshal" },
  { name: "Stinger" },
  { name: "Operator" },
  { name: "Ghost" },
  { name: "Frenzy" },
  { name: "Odin" },
  { name: "Guardian" },
  { name: "Bucky" },
  { name: "Judge" },
  { name: "Classic" },
  { name: "Shorty" },
  { name: "Sheriff" },
];

function App() {

  const [isDisplayed, setIsDisplayed] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // playable cards
  // seen cards
  // unseen cards
  
  return (
    <div className="App">
      <h1>Memory Card</h1>
      <p className="scoreRow">Score: {score} | High score: {highScore}</p>
      <div className="cardContainer">
        {/* Map generated */}
        <Card name={"Phantom"} />
      </div>
      
      <Modal isDisplayed={isDisplayed} />
      
    </div>
  )
}

export default App
