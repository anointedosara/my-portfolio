import React from 'react'
import { useEffect } from 'react';
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
  return (
    <div className='about'>
      <div className='about-section1'>
        <div className='about-info'>
          <h1>Know Who <b>I'M</b></h1>
          <div>
            <p>Hi Everyone, I am <b>Anointed Osara</b> from <b>Edo State, Nigeria.</b><br />
            I am a Full Stack Javascript Developer.<br /><br />
            Apart from coding, some other activities that I love to do!</p>
            <ul>
              <li><i className="fa-regular fa-hand-point-right"></i> Playing Games</li>
              <li><i className="fa-regular fa-hand-point-right"></i> Writting Tech Blogs</li>
              <li><i className="fa-regular fa-hand-point-right"></i> Watching Movies and Web Series</li>
            </ul>
            <blockquote>"The world rewards you for value provided, not time spent."</blockquote>
            <span><i className="fa-solid fa-minus"></i> James clear</span>
          </div>
        </div>
        <div className='info-img'>
          <img src="../images/about.main.png" alt="" />
        </div>
      </div>

      <div className='service'>
        <h1>What Can I Do For You?</h1>
        <p>Professional <b>Skillset</b></p>
        <div className='services'>
          {
            data?.map(item =>
              <div className='skill'>
                <img src={item.image} alt="" />
                <h4>{item?.skill}</h4>
                <div></div>
                <p>{item?.speech}</p>
              </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default About