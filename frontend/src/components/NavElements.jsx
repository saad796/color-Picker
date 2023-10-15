import React,{useState} from 'react'
import { Link } from 'react-router-dom'

function NavElements() {
  const [curInd,setCurInd]=useState("0");

  return (
    <ul className='nav-elements'>
        <li><Link to="/colorPicker">Color Picker</Link></li>
        <li><Link to="/">File Converter</Link></li>
        <li><Link to="/">QR Genrator</Link></li>
    </ul>
  )
}

export default NavElements