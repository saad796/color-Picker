import React,{useState,useRef} from 'react'

function ColorDisplay(props) {

  const col = {backgroundColor : props.bgColor}

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
  const {r,g,b} = hexToRgb(props.bgColor)
  const rgbColor = `${r}, ${g}, ${b}`

function copyToClipboard(value) {
  navigator.clipboard.writeText(value);

}

function copyRgb(e)
{
  e.target.disabled = true;
  e.target.innerText = "...";
  copyToClipboard(rgbColor);
  e.target.innerText = "copy";
  e.target.disabled = false;
}

function copyHex(e)
{
  e.target.disabled = true;
  e.target.innerText = "...";
  copyToClipboard(props.bgColor);
  e.target.innerText = "copy";
  e.target.disabled = false;
}

// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  console.log(r , g ,b);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
      h = s = 0;
  } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          default :
      }
      h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// Function to suggest color combinations
function suggestColorCombinations(inputColor) {
  const [h, s, l] = rgbToHsl(parseInt(inputColor.slice(1, 3), 16), parseInt(inputColor.slice(3, 5), 16), parseInt(inputColor.slice(5, 7), 16));
  
  const complementary = `#${(h + 180) % 360 < 10 ? '0' : ''}${((h + 180) % 360).toFixed(2)}${s.toFixed(2)}${l.toFixed(2)}`;
  const analogous1 = `#${(h + 30) % 360 < 10 ? '0' : ''}${((h + 30) % 360).toFixed(2)}${s.toFixed(2)}${l.toFixed(2)}`;
  const analogous2 = `#${(h - 30) % 360 < 10 ? '0' : ''}${((h - 30) % 360).toFixed(2)}${s.toFixed(2)}${l.toFixed(2)}`;
  const triadic1 = `#${(h + 120) % 360 < 10 ? '0' : ''}${((h + 120) % 360).toFixed(2)}${s.toFixed(2)}${l.toFixed(2)}`;
  const triadic2 = `#${(h - 120) % 360 < 10 ? '0' : ''}${((h - 120) % 360).toFixed(2)}${s.toFixed(2)}${l.toFixed(2)}`;
  
  return {
      complementary,
      analogous: [analogous1, analogous2],
      triadic: [triadic1, triadic2]
      
  };
}

const colorCombinations = suggestColorCombinations(props.bgColor);
console.log(colorCombinations);


  return (
    <>
      <div className='color-display' style={col}>
      </div>
      <p><strong>RGB </strong>: {rgbColor} <button onClick={copyRgb}>copy</button></p>
      <p><strong>HEX </strong>: {props.bgColor} <button onClick={copyHex}>copy</button></p>
    </>
  )
}

export default ColorDisplay