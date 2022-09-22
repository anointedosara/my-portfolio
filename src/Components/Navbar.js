import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [display, setDisplay] = useState(false)

  const handleClick = () => {
    setDisplay(!display)
  }
    const [scroll, setScroll] = useState(false)

    function scrollHandler() {
        if (window.scrollY >= 20) {
          setScroll(true)
        } else {
          setScroll(false)
        }
      }
    
      window.addEventListener('scroll', scrollHandler)
  return (
    <div className={scroll ? 'nav sticky' : display ? 'nav sticky' : 'navbar sticky'}>
      <div className='navb'>
      <div className='inner-nav'>
        <Link to='/' className='a'><p>Anointed Osara</p></Link>
        <Link to='/' className='ao'><p>A <span>O.</span></p></Link>
        <div>
            <Link to='/'><button><i className="fa-solid fa-house"></i> Home</button>
            <div className='line'></div></Link>
            <Link to='/about'><button><i className="fa-regular fa-address-card"></i> About</button>
            <div className='line'></div></Link>
            <Link to='/projects'><button><i className="fa-solid fa-list-check"></i> Projects</button>
            <div className='line'></div></Link>
            <Link to='/resume'><button><i className="fa-solid fa-file"></i> Resume</button>
            <div className='line'></div></Link>
            <a href="https://github.com/anointedosara/my-portfolio" className='fork-a' target='_blank' rel="noreferrer"><button className='fork'><i className="fa-solid fa-code-branch"></i> <i className="fa-solid fa-star"></i></button></a>
        </div>
        <div className='drop-img' onClick={handleClick}>
          <img style={{display: display ? 'none' : 'block'}} src="../images/hamburger.png" alt="" />
          <img style={{display: !display ? 'none' : 'block'}} src="https://www.wisdomosara.com/assets/images/icons8-delete-30.png" alt="" />
        </div>
      </div>
      </div>
      <section onClick={() => setDisplay(!display)} style={{pointerEvents: !display ? 'none' : 'all'}}>
        <div onClick={(e) => e.stopPropagation()} className={`hide ${display ? "dropdown" : ""}`} id='drop'>
              <Link to='/' onClick={() => setDisplay(!display)}><button><i className="fa-solid fa-house"></i> Home</button></Link>
              <Link to='/about' onClick={() => setDisplay(!display)}><button><i className="fa-regular fa-address-card"></i> About</button></Link>
              <Link to='/projects' onClick={() => setDisplay(!display)}><button><i className="fa-solid fa-list-check"></i> Projects</button></Link>
              <Link to='/resume' onClick={() => setDisplay(!display)}><button><i className="fa-solid fa-file"></i> Resume</button></Link>
              <a href="https://github.com/anointedosara/my-portfolio" onClick={() => setDisplay(!display)} className='fork-a' target='_blank' rel="noreferrer"><button className='fork'><i className="fa-solid fa-code-branch"></i> <i className="fa-solid fa-star"></i></button></a>
          </div>
      </section>
    </div>
  )
}

export default Navbar
