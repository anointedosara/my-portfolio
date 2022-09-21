import React from 'react'
import { useEffect } from 'react';
import portfolioData from '../data'

function Projects() {
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
    <div className='projects'>
      <div className='all'>
        <h1>Check Out Some of <b>My Works</b></h1>
        <p>Here are a few projects I've worked on recently.</p>
        <div className='my-projects'>
          {
            portfolioData?.map(data => 
            <div key={data.id} className='project'>
              <img src={data.img} alt="" />
              <div>
                <h4>{data.title}</h4>
                <p>{data.writeup}</p>
                <div className='links'>
                  <a href={data.project} target='_blank' rel="noreferrer"><button><i className="fa-solid fa-arrow-up-right-from-square"></i> View Project</button></a>
                  <a href={data.site} target='_blank' rel="noreferrer"><button><i className="fa-solid fa-arrow-up-right-from-square"></i> Live</button></a>
                </div>
              </div>
            </div>)
          }
          <p className='refer'>Most of my projects are gotten from Front-End Mentor. Click <a href="https://www.frontendmentor.io/" target='_blank' rel="noreferrer"><button className='btn'>Here</button></a> to see Front-End Mentor's Challenges.</p>
        </div>
      </div>
    </div>
  )
}

export default Projects
