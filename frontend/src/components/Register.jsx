import React from 'react'
import {Link } from 'react-router-dom';

function Register() {
  return (
    <div className='register-form-container'>
        <h3>Its Good to know each other</h3>
        <p>
         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos itaque ea totam sed vero libero? Ad sapiente qui ullam sint distinctio dolor rem unde iste!
        </p>
        <div className="reg-btn-conatainer">
            <Link to="/login" ><button className='login-btn'>Login</button></Link>
            <Link to="/signin" ><button className='login-btn'>Sign In</button></Link>
        </div>
    </div>
  )
}

export default Register