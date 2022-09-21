import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Resume() {
  const handleLoad = () => {
    window.addEventListener('load', () => {
      window.scroll(0, 0);
    })
  }
  useEffect(() => {
    window.scroll(0, 0);
    handleLoad()
  }, [])
  return (
    <div>
      Resume
      
      <div className='navigation'>
        <button className='next'><Link to='/projects'><i className="fa-solid fa-arrow-left"></i> <strong>About</strong></Link></button>
        <div></div>
      </div>
    </div>
  )
}

export default Resume
