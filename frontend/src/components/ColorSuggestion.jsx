import React from 'react'
import ColorSuggestionTab from './ColorSuggestionTab';
import ColorPalete from './ColorPalete';

function ColorSuggestion(props) {

    function suggestColorCombinations(inputColor) {
        const [h, s, l] = inputColor;
        
        const complementaryHue = (h + 180) % 360;
        const analogous1Hue = (h + 30) % 360;
        const analogous2Hue = (h - 30) % 360;
        const triadic1Hue = (h + 120) % 360;
        const triadic2Hue = (h - 120) % 360;
      
        return {
          complementary: [hslToHex(complementaryHue, s, l)],
          analogous: [hslToHex(analogous1Hue, s, l),hslToHex(analogous2Hue, s, l)],
          triadic: [hslToHex(triadic1Hue, s, l), hslToHex(triadic2Hue, s, l)],
          monochromatic : generateMonochromaticColors(h,s,l)
        };
    }
      function generateMonochromaticColors(hue, saturation, lightness) {
        const colors = [];
      
        const numVariations = 5; 
      
        const satStep = (100 - saturation) / (numVariations + 1);
        const lightStep = (100 - lightness) / (numVariations + 1);
      
        for (let i = 0; i < numVariations; i++) {
            const newSaturation = saturation + (i + 1) * satStep;
            const newLightness = lightness + (i + 1) * lightStep;
      
            colors.push(hslToHex(hue, newSaturation, newLightness));
        }
      
        return colors;
      }
      
      function hslToHex(h, s, l) {
        h = (h % 360 + 360) % 360;
      
        s = Math.min(100, Math.max(0, s));
        l = Math.min(100, Math.max(0, l));
      
        s = s / 100;
        l = l / 100;
      
        const C = (1 - Math.abs(2 * l - 1)) * s;
        const X = C * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - C / 2;
      
        let r, g, b;
        if (h < 60) {
            r = C;
            g = X;
            b = 0;
        } else if (h < 120) {
            r = X;
            g = C;
            b = 0;
        } else if (h < 180) {
            r = 0;
            g = C;
            b = X;
        } else if (h < 240) {
            r = 0;
            g = X;
            b = C;
        } else if (h < 300) {
            r = X;
            g = 0;
            b = C;
        } else {
            r = C;
            g = 0;
            b = X;
        }
      
        const red = Math.round((r + m) * 255);
        const green = Math.round((g + m) * 255);
        const blue = Math.round((b + m) * 255);
      
        const redHex = red.toString(16).padStart(2, '0');
        const greenHex = green.toString(16).padStart(2, '0');
        const blueHex = blue.toString(16).padStart(2, '0');
      
        return `#${redHex}${greenHex}${blueHex}`;
      }
      const colorCombinations = suggestColorCombinations(props.hslColor);
      
  return (
    <div className='suggestion-container'>
        <h2>Suggestions</h2>
        <ColorPalete title="pallete" suggestedColor={colorCombinations} origCol={props.origCol} userData={props.userData}/>
        <ColorSuggestionTab title="complementary" suggestedColor={colorCombinations.complementary} />
        <ColorSuggestionTab title="analogous" suggestedColor={colorCombinations.analogous} />
        <ColorSuggestionTab title="triadic" suggestedColor={colorCombinations.triadic} />
        <ColorSuggestionTab title="monochromatic" suggestedColor={colorCombinations.monochromatic} />
    </div>
  )
}

export default ColorSuggestion