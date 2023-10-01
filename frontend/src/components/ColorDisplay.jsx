import { useState } from 'react';
import { HexColorPicker,HexColorInput } from "react-colorful";
import ColorSuggestion from './ColorSuggestion';

function ColorDisplay() {
  const [color, setColor] = useState("#aabbcc");
  const col = {backgroundColor : color}

function copyToClipboard(value) {
  navigator.clipboard.writeText(value);
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return {
      r,
      g,
      b
  };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
      h = s = 0; 
  } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
          case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
          case g:
              h = (b - r) / d + 2;
              break;
          case b:
              h = (r - g) / d + 4;
              break;
            default: break;
      }

      h /= 6;
  }

  h *= 360;
  s *= 100;
  l *= 100;

  return [Math.round(h), Math.round(s), Math.round(l)];
}

const {r,g,b} = hexToRgb(color)
const rgbColor = `${r}, ${g}, ${b}`;
const hslColor = rgbToHsl(r,g,b);
const hslColorString = `${hslColor[0]} , ${hslColor[1]} , ${hslColor[2]}`;

  return (
    <div className='main-color-container'>
      <div className='picker-container'>
        <HexColorPicker color={color} onChange={setColor} />
        <HexColorInput color={color} onChange={setColor} />
        <p className='inp-post-text'>Enter your color hex value</p>
        <div className='color-box' style={col}>
        </div>
        <p><strong>RGB </strong>: {rgbColor} <button className='copy-btn' onClick={()=>{copyToClipboard(rgbColor)}}>copy</button></p>
        <p><strong>HEX </strong>: {color} <button className='copy-btn' onClick={()=>{copyToClipboard(color)}}>copy</button></p>
        <p><strong>HSL </strong>: {hslColorString} <button className='copy-btn' onClick={()=>{copyToClipboard(hslColorString)}}>copy</button></p>
      </div>
      <ColorSuggestion hslColor={hslColor} />
    </div>
  )
}

export default ColorDisplay