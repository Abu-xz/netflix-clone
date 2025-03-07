import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import firebaseAuth from '../../firebase.js'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isScrolled ? "nav-dark" : ""}`} >
      <div className='navbar-left'>
        <img src={logo} alt='netflix-logo' />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className='navbar-right'>
        <img src={search_icon} alt='search_icon' className='icons' />
        <p>children</p>
        <img src={bell_icon} alt='search_icon' className='icons' />

        <div className='navbar-profile'>
          <img src={profile_img} alt='search_icon' className='profile' />
          <img src={caret_icon} alt='search_icon' />
          <div className='dropdown'>
            <p onClick={()=> {firebaseAuth.logout()}}>Sign out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
