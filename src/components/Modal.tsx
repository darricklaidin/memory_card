import React from 'react'

export default function Modal(props: any) {
  // game result
  // score
  // high score
  // should display
  
  const { isDisplayed } = props;
  
  if (!isDisplayed) return null;
  
  return (
    <div className="gameOverModalBackground">
      <div className="gameOverModal">
        <p>You {"win"}</p>
        <p>Score: {5}</p>
        <p>High score: {10}</p>
        <button>Play again</button>
      </div>
    </div>
  )
}
