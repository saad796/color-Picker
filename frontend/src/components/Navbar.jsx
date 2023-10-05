import React from 'react'
import {Link } from 'react-router-dom';

function Navbar() {

  return (
    <div className='nav-container'>
        <h1 className='logo'>Logo</h1>
        <Link to="/register" className='login-btn-container'><button className='login-btn'>Register</button></Link>
    </div>
  )
}

export default Navbar