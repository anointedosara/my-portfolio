import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Type from '../Components/Type'

function Home() {
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
    <div className='home'>
      <div className='home-section1'>
        <div className='section1-intro'>
          <div className='intro'>
            <h1>Hi There! <span className='wave'>👋🏻</span></h1>
            <h2>I'M <strong>ANOINTED OSARA</strong></h2>
            <div className='type'><strong><Type /></strong></div>
          </div>
          <div className='intro-img'>
            <img src="../images/home-main.svg" alt="" />
          </div>
        </div>
      </div>

      <div className='introduction'>
        <div className='introduction-text'>
          <h1>LET ME <span>INTRODUCE</span> MYSELF</h1>
          <div>
            <p>I fell in love with programming and I have at least learnt something, I think… 🤷‍♂️</p>
            <p>I am a year 1 student of the great University of Benin, Faculty of Environmental Science, Department of Geomatics.
               I'm a self taught Frontend Web Developer with sound knowledge on <b>Reactjs, 
                Tailwind, HTML5, CSS3, Restful Apis, Github and more.</b></p>
            <p>My field of Interest's are building new <b>Web Technologies, Application developement and Products</b> and also in areas related to <b>Clouds.</b></p>
            <p>Whenever possible, I also apply my passion for developing products with <b>Modern Javascript Library and Frameworks</b> like <b>React.js.</b></p>
            <p>Click <Link to='/projects'><button className='btn'>Here</button></Link> to view my Portfolio.</p>
          </div>
        </div>
        <div className='my-img'>
          <img src="../images/profile-img.png.jpg" alt="" />
        </div>
      </div>

      <div className='contact'>
        <h1>FIND ME ON</h1>
        <p>Feel free to <span>connect</span> with me</p>
        <div className='media'>
          <div><a href="https://github.com/anointedosara" target='_blank' rel="noreferrer"><i className="fa-brands fa-github"></i></a></div>
          <div><a href="https://www.linkedin.com/in/anointed-osara-34313b23a" target='_blank' rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a></div>
          <div><a href="https://twitter.com/OsaraAnointed?t=VR6QJnhafSghm1946wJKUw&s=09" target='_blank' rel="noreferrer"><i className="fa-brands fa-twitter"></i></a></div>
          <div><a href="mailto:anointedosara@gmail.com?subject=Getting in touch with Wisdom from Website"><i className="fa-regular fa-envelope"></i></a></div>
          <div><a href="tel:08139950502"><i className="fa-solid fa-phone"></i></a></div>
        </div>
      </div>
    </div>
  )
}

export default Home
