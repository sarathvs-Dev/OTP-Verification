import React from 'react'
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <div>

      <a href="#" className="flex items-center`">
        <img src={logo} alt="Epic Designers" className="min-w-20 m-10" />
      </a>
    </div>
  )
}

export default NavBar