export default function Card(props: any) {
  
  const { card, handleCardClick } = props;
  
  return (
    <div className='card' 
      onClick={() => handleCardClick(card)}
      style={{
        backgroundImage: `url(${card.image})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}></div>
  )
}
