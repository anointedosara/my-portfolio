import React from 'react'
import { useEffect } from 'react';

function About() {
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
          <img src="https://portfolio-mohitsojitra.vercel.app/static/media/about.aee0f771.png" alt="" />
        </div>
      </div>

      <div className='service'>
        <h1>What Can I Do For You?</h1>
        <p>Professional <b>Skillset</b></p>
        <div className='services'>
          <div className='skill'>
            <img src="https://www.wisdomosara.com/assets/images/carbon_earth.png" alt="" />
            <h4>WEB DEVELOPMENT</h4>
            <div></div>
            <p>A very professional front-end web developer with enthusiasm for Full Stack Web Development.</p>
          </div>
          <div className='skill'>
            <img src="https://www.wisdomosara.com/assets/images/bx_bx-image.png" alt="" />
            <h4>PIXEL PERFECT</h4>
            <div></div>
            <p>All my works are pixel perfect and they match design with 100% conversion.</p>
          </div>
          <div className='skill'>
            <img src="https://www.wisdomosara.com/assets/images/bi_toggles.png" alt="" />
            <h4>RESPONSIVENESS</h4>
            <div></div>
            <p>All my works are responsive on all screensizes from small to extra large screensizes.</p>
          </div>
          <div className='skill'>
            <img src="https://www.wisdomosara.com/assets/images/bi_window.png" alt="" />
            <h4>REACTJS</h4>
            <div></div>
            <p>I also come with sound knowledge and experience in Reactjs and its important plugins.</p>
          </div>
          <div className='skill'>
            <img src="https://www.wisdomosara.com/assets/images/bx_bx-image.png" alt="" />
            <h4>MORE THAN DESIGN</h4>
            <div></div>
            <p>I also don't just do the design part of front end, I develop using Javascript, Jquery, APIs and more.</p>
          </div>
          <div className='skill'>
            <img src="https://www.wisdomosara.com/assets/images/Group.png" alt="" />
            <h4>LEARNING CULTURE</h4>
            <div></div>
            <p>I never settle for less. I'm always looking to learn new technologies and quickly too.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About