import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import portfolioData from '../data'
import gsap from 'gsap';

function Projects() {
  const handleLoad = () => {
    window.addEventListener('load', () => {
      window.scroll(0, 0);
    })
  }

  const data = portfolioData.filter(data => data.id < 11)

  useEffect(() => {
    window.scroll(0, 0);
    handleLoad()
  }, [])


useEffect(() => {
  gsap.utils.toArray(".project-scroll").forEach((scrollElement, i) => {
    gsap.fromTo(scrollElement, {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      visibility: "visible",
      scrollTrigger: {
        trigger: scrollElement
      }
    })
  })

  gsap.utils.toArray(".resume-scroll-right").forEach((scrollElement, i) => {
    gsap.fromTo(scrollElement, {
      x: -30,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      visibility: "visible",
      scrollTrigger: {
        trigger: scrollElement
      }
    })
  })

  gsap.utils.toArray(".resume-scroll-left").forEach((scrollElement, i) => {
    gsap.fromTo(scrollElement, {
      x: 30,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      visibility: "visible",
      scrollTrigger: {
        trigger: scrollElement
      }
    })
  })
}, [])
  
  return (
    <div className='projects'>
      <div className='all project-scroll' style={{visibility: "hidden"}}>
        <h1>Check Out Some of <b>My Works</b></h1>
        <p>Here are a few projects I've worked on recently.</p>
        <div className='my-projects'>
          {
            data?.map(item => 
            <div key={item?.id} className='project project-scroll' style={{visibility: "hidden"}}>
              <img src={item?.img} alt="" />
              <div>
                <h4>{item?.title}</h4>
                <p>{item?.writeup}</p>
                <div className='links'>
                  <a href={item?.project} target='_blank' rel="noreferrer"><button><i className="fa-solid fa-arrow-up-right-from-square"></i> View Project</button></a>
                  <a href={item?.site} target='_blank' rel="noreferrer"><button><i className="fa-solid fa-arrow-up-right-from-square"></i> Live</button></a>
                </div>
              </div>
            </div>)
          }
        </div>
      </div>

      <div className='navigation'>
        <button className='next resume-scroll-left'><Link to='/about'><i className="fa-solid fa-arrow-left"></i> <strong>About</strong></Link></button>
        <button className='next resume-scroll-right'><Link to='/resume'><strong>Resume</strong> <i className="fa-solid fa-arrow-right"></i></Link></button>
      </div>
    </div>
  )
}

export default Projects
