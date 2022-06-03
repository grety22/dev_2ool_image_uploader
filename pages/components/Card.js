import React from 'react'

export default function Card(props) {
  return (
    <div className={`rounded-lg w-full max-w-2xl mb-10 ${props.bgColor} ${props.shadow} ${props.grid}`}>
        {props.children}
    </div>
  )
}
