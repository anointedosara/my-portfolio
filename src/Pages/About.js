import gsap from 'gsap';
import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import portfolioData from '../data'

function About() {
  const handleLoad = () => {
    window.addEventListener('load', () => {
      window.scroll(0, 0);
    })
  }
  const data = portfolioData.filter(data => data.id > 10)
  useEffect(() => {
    window.scroll(0, 0);
    handleLoad()
  }, [])

  useEffect(() => {
    gsap.utils.toArray(".about-scroll").forEach((scrollElement, i) => {
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
    <div className='about'>
      <div className='about-section1'>
        <div className='about-info about-scroll' style={{visibility: "hidden"}}>
          <h1>Know Who <b style={{color: '#cd5ff8'}}>I Am</b></h1>
          <div>
            <p>Hi Everyone, I am <b style={{color: '#cd5ff8'}}>Anointed Osara</b> from <b>Edo State, Nigeria.</b><br />
            I am a Front-End Web Developer.<br /><br />
            Apart from coding, some other activities that I love to do!</p>
            <ul>
              <li><i className="fa-regular fa-hand-point-right"></i> Playing Games</li>
              <li><i className="fa-regular fa-hand-point-right"></i> Watching Movies and Web Series</li>
            </ul>
            <blockquote>"The world rewards you for value provided, not time spent."</blockquote>
            <span><i className="fa-solid fa-minus"></i> James clear</span>
          </div>
        </div>
        <div className='info-img about-scroll' style={{visibility: "hidden"}}>
          <img src="../images/about.main.png" alt="" />
        </div>
      </div>

      <div className='service about-scroll' style={{visibility: "hidden"}}>
        <h1>What Can I Do For You?</h1>
        <p>Professional <b>Skillset</b></p>
        <div className='services'>
          {
            data?.map(item =>
              <div className='skill about-scroll' style={{visibility: "hidden"}}>
                <img src={item?.image} alt="" />
                <h4>{item?.skill}</h4>
                <div></div>
                <p>{item?.speech}</p>
              </div>)
          }
        </div>
      </div>

      <div className='navigation'>
        <button className='next resume-scroll-left'><Link to='/'><i className="fa-solid fa-arrow-left"></i> <b>Home</b></Link></button>
        <button className='next resume-scroll-right'><Link to='/projects'><b>Projects</b> <i className="fa-solid fa-arrow-right"></i></Link></button>
      </div>
    </div>
  )
}

export default About