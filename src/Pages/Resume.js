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
    <div className='resume'>
      <div className='row'><a href="./images/anointedosara's-resume.pdf" target='_blank'><button><i class="fa-solid fa-download"></i> Download CV</button></a></div>

      <div className='credentials'>
        <h5>My Credentials</h5>
        <p>Here are detailed information about my credentials and my current and past work experience.</p>

        <div className='my-credentials'>
          <h1 style={{color: '#cd5ff8'}}>Work Experience</h1>
          <div className='experience'>
            <div className='title'>
              <h1>Front-End Developer</h1>
              <p>November 2021-present</p>
            </div>
            <div className='writeup'>
              <div className='img'>
                <img src="../images/briefcase.png" alt="" />
              </div>
              <h1>SELF TAUGHT</h1>
              <div className="line"></div>
              <p>Used alot of online resources, internships and hands on projects to be the Front-End developer
                 I am today. Some of the resources are: Freecodecamp, Codecademy, W3schools, Youtube videos, JavaScript.Info etc.</p>
            </div>
          </div>
          <div className='experience ex'>
              <div className='title'>
                <h1>Zuri Intern</h1>
                <p>April 2022-June 2022</p>
              </div>
              <div className='writeup exp'>
                <div className='img'>
                  <img src="../images/briefcase.png" alt="" />
                </div>
                <h1>Zuri</h1>
                <div className="line"></div>
                <p>Two months on a rigorous, fast paced and project based internship to improve on existing skills
                  and learn more. I built several products and was mentored by some really good programmers.</p>
              </div>
          </div>
        </div>

        <div className='my-credentials cred'>
          <h1 style={{color: '#cd5ff8'}}>Education</h1>
          <div className='experience'>
            <div className='title'>
              <h1>Undergraduate</h1>
              <p>August 2021-present</p>
            </div>
            <div className='writeup'>
              <div className='img'>
                <img src="../images/graduation-cap.png" alt="" />
              </div>
              <h1>University of Benin.</h1>
              <div className="line"></div>
              <p>Year 1 student Faculty of Environmental Science, Department of Geomatics.</p>
            </div>
          </div>
          <div className='experience'>
            <div className='title'>
              <h1>Responsive Web Design</h1>
              <p>March 2022</p>
            </div>
            <div className='writeup'>
              <div className='img'>
                <img src="../images/graduation-cap.png" alt="" />
              </div>
              <h1>FreeCodeCamp.org</h1>
              <div className="line"></div>
              <p>You can view the certificate <a href="https://www.freecodecamp.org/certification/fcc2c83f31b-22dc-4437-a2f7-3f17ce85444d/responsive-web-design" target='_blank' rel="noreferrer"><button className='btn'>Here</button></a>. Learnt the basics to advanced Responsive Web Design.</p>
            </div>
          </div>
          <div className='experience ex'>
              <div className='title'>
                <h1>Javascript Data<br /> Structures and<br /> Algorithms</h1>
                <p>June 2022</p>
              </div>
              <div className='writeup exp'>
                <div className='img'>
                  <img src="../images/graduation-cap.png" alt="" />
                </div>
                <h1>FreeCodeCamp.org</h1>
                <div className="line"></div>
                <p>Learnt the basics to intermediate Javascript and became very fluent with the language. You can view this Certificate <a href="#hjdgh"  target='_blank' rel="noreferrer"><button className='btn'>Here</button></a>.</p>
              </div>
          </div>
        </div>
      </div>

      <div className='row'><a href="./images/anointedosara's-resume.pdf" target='_blank'><button><i class="fa-solid fa-download"></i> Download CV</button></a></div>
      <div className='navigation'>
        <button className='next'><Link to='/projects'><i className="fa-solid fa-arrow-left"></i> <strong>About</strong></Link></button>
        <div></div>
      </div>
    </div>
  )
}

export default Resume
