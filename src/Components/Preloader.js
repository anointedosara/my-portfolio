import React from 'react'
import { useState } from 'react'

function Preloader() {
    const [opacity, setOpacity] = useState({
        opacity: 1
    })
    setInterval(() => {
        setOpacity({
            opacity: 0
        })
    }, 700);
  return (
    <div className='preloader'>
      <img src="./images/preloader.svg" alt="" />
      <h1 style={opacity}>Welcome...</h1>
    </div>
  )
}

export default Preloader
