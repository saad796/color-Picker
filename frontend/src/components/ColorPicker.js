import { useState } from 'react';
import { HexColorPicker,HexColorInput } from "react-colorful";
import ColorDisplay from './ColorDisplay';

function ColorPicker(props) {
    const [color, setColor] = useState("#aabbcc");
    return(
    <div className='picker-container'>
      <HexColorPicker color={color} onChange={setColor} />
      <HexColorInput color={color} onChange={setColor} />
      <ColorDisplay bgColor={color}/>
    </div>)
}

export default ColorPicker