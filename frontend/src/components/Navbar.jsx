import React from 'react'
import {Link } from 'react-router-dom';

function Navbar(props) {
  console.log(props);
  return (
    <div className='nav-container'>
        <h1 className='logo'>Logo</h1>
        {
          props.loginStatus?
          <>
            <h2 className='login-btn-container'>{props.username}</h2>
            <button className='logout-btn form-btn' onClick={()=>{props.logout()}}>logout</button>
          </> 
          :
          <Link to="/register" className='login-btn-container'><button className='login-btn' clearForm={props.clearForm}>Register</button></Link>
        }
    </div>
  )
}

export default Navbar