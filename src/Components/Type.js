import React from 'react'
import Typewriter from 'typewriter-effect'

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          'Developer',
          'Frontend Developer',
          'Software Engineer',
          'The Name is MILES'
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
        cursor: ''
      }}
    />
  )
}

export default Type