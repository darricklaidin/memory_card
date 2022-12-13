import React from 'react'

export default function Card(props: any) {
  
  const { name } = props;
  
  return (
    <div className='card'>{name}</div>
  )
}
