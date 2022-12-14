export default function Card(props: any) {
  
  const { card, handleCardClick } = props;
  
  return (
    <div className='card' onClick={() => handleCardClick(card)}>{card.name}</div>
  )
}
