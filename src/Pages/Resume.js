import React from 'react'
import { useEffect } from 'react';

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
    </div>
  )
}

export default Resume
