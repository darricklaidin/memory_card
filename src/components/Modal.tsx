import React from 'react'

export default function Modal(props: any) {
  const { isDisplayed, gameResult, score, highScore, handleRestartClick } = props;
  
  if (!isDisplayed) return null;
  
  return (
    <div className="gameOverModalBackground">
      <div className="gameOverModal">
        <p>You {gameResult ? "win" : "lose"}!</p>
        <p>Score: {score}</p>
        <p>High score: {highScore}</p>
        <button onClick={handleRestartClick}>Play again</button>
      </div>
    </div>
  )
}
