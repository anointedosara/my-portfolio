import gsap from 'gsap';
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
  
  useEffect(() => {
    gsap.utils.toArray(".resume-scroll").forEach((scrollElement, i) => {
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
    <div className='resume'>
      <div className='row resume-scroll' style={{visibility: "hidden"}}><a href="./images/anointedosara's-CV.pdf" target='_blank'><button><i class="fa-solid fa-download"></i> Download CV</button></a></div>

      <div className='credentials resume-scroll' style={{visibility: "hidden"}}>
        <h5>My Credentials</h5>
        <p>Here are detailed information about my credentials and my current and past work experience.</p>

        <div className='my-credentials resume-scroll' style={{visibility: "hidden"}}>
          <h1 style={{color: '#cd5ff8'}}>Work Experience</h1>
          <div className='experience resume-scroll' style={{visibility: "hidden"}}>
            <div className='title resume-scroll-right'>
              <h1>Front-End Developer</h1>
              <p>November 2021-present</p>
            </div>
            <div className='writeup'>
              <div className='img'>
                <img src="../images/briefcase.png" alt="" />
              </div>
              <div className='resume-scroll-left'>
                <h1>SELF TAUGHT</h1>
                <div className="line"></div>
                <p>Used alot of online resources, internships and hands on projects to be the Front-End developer
                 I am today. Some of the resources are: Freecodecamp, Codecademy, W3schools, Youtube videos, JavaScript.Info etc.</p>
              </div>
              
            </div>
          </div>
          <div className='experience ex resume-scroll' style={{visibility: "hidden"}}>
              <div className='title resume-scroll-right'>
                <h1>Zuri Intern</h1>
                <p>April 2022-June 2022</p>
              </div>
              <div className='writeup exp'>
                <div className='img'>
                  <img src="../images/briefcase.png" alt="" />
                </div>
                <div className='resume-scroll-left'>
                  <h1>Zuri</h1>
                  <div className="line"></div>
                  <p>Two months on a rigorous, fast paced and project based internship to improve on existing skills
                  and learn more. I built several products and was mentored by some really good programmers.</p>
                </div>
              </div>
          </div>
        </div>

        <div className='my-credentials cred resume-scroll' style={{visibility: "hidden"}}>
          <h1 style={{color: '#cd5ff8'}}>Education</h1>
          <div className='experience resume-scroll'>
            <div className='title resume-scroll-right'>
              <h1>Undergraduate</h1>
              <p>August 2021-present</p>
            </div>
            <div className='writeup'>
              <div className='img'>
                <img src="../images/graduation-cap.png" alt="" />
              </div>
              <div className='resume-scroll-left'>
                <h1>University of Benin.</h1>
                <div className="line"></div>
                <p>Year 1 student Faculty of Environmental Science, Department of Geomatics.</p>
              </div>
            </div>
          </div>
          <div className='experience resume-scroll' style={{visibility: "hidden"}}>
            <div className='title resume-scroll-right'>
              <h1>Responsive Web Design</h1>
              <p>March 2022</p>
            </div>
            <div className='writeup'>
              <div className='img'>
                <img src="../images/graduation-cap.png" alt="" />
              </div>
              <div className='resume-scroll-left'>
                <h1>FreeCodeCamp.org</h1>
                <div className="line"></div>
                <p>You can view the certificate <a href="https://www.freecodecamp.org/certification/fcc2c83f31b-22dc-4437-a2f7-3f17ce85444d/responsive-web-design" target='_blank' rel="noreferrer"><button className='btn'>Here</button></a>. Learnt the basics to advanced Responsive Web Design.</p>
              </div>
              </div>
          </div>
          <div className='experience ex resume-scroll' style={{visibility: "hidden"}}>
              <div className='title resume-scroll-right'>
                <h1>Javascript Data<br /> Structures and<br /> Algorithms</h1>
                <p>June 2022</p>
              </div>
              <div className='writeup exp'>
                <div className='img'>
                  <img src="../images/graduation-cap.png" alt="" />
                </div>
                <div className='resume-scroll-left'>
                  <h1>FreeCodeCamp.org</h1>
                <div className="line"></div>
                <p>Learnt the basics to intermediate Javascript and became very fluent with the language. You can view this Certificate <a href="#hjdgh"  target='_blank' rel="noreferrer"><button className='btn'>Here</button></a>.</p>
                </div>
                </div>
          </div>
        </div>
      </div>

      <div className='row resume-scroll' style={{visibility: "hidden"}}><a href="./images/anointedosara's-CV.pdf" target='_blank'><button><i class="fa-solid fa-download"></i> Download CV</button></a></div>
      <div className='navigation'>
        <button className='next resume-scroll-left'><Link to='/projects'><i className="fa-solid fa-arrow-left"></i> <strong>About</strong></Link></button>
        <div></div>
      </div>
    </div>
  )
}

export default Resume
