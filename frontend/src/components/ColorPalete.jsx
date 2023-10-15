import {useState,useEffect} from 'react';
import axios from "axios";

function ColorPalete(props) {

  const [palleteColor,setPalleteColor] = useState({})
  const [addBtn,setAddBtn] = useState(true)

  function getRandom(min , max)
  {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum
  }

  function getSuggestion()
  {
    const first = props.origCol;
    const second = props.suggestedColor.monochromatic[getRandom(0,4)];
    const third = props.suggestedColor.analogous[getRandom(0,1)];
    const fourth = props.suggestedColor.triadic[getRandom(0,1)];
    const paleteColor = {
      first,
      second,
      third,
      fourth
    }
    return paleteColor
  }

  const addPaleteToFavourite = async ()=>{
    try {
      const response = await axios.post("http://localhost:8000/addColor",{color : palleteColor,id :props.userData.userid});
      console.log(response.data);
      setAddBtn(false)
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.error)
      } else {
        alert("An unexpected error occurred.Please try again")
      }
    }
  }

  useEffect(()=>{
    const palleteColor = getSuggestion();
    setPalleteColor(palleteColor)
    setAddBtn(true)
  },[props.origCol])

  return (
    <div className="color-container">
          <h3>{props.title.toUpperCase()}</h3>
          {props.userData.loginStatus && addBtn && <button onClick={addPaleteToFavourite}>add to favourite</button>}
          <div className='color-display'>
              <div className='color-display-item'>
                <div className='color-box' style={{backgroundColor :palleteColor.first}}>
                </div>
                <p>{palleteColor.first}</p>
              </div>
              <div className='color-display-item'>
                <div className='color-box' style={{backgroundColor :palleteColor.second}}>
                </div>
                <p>{palleteColor.second}</p>
              </div>
              <div className='color-display-item'>
                <div className='color-box' style={{backgroundColor :palleteColor.third}}>
                </div>
                <p>{palleteColor.third}</p>
              </div>
              <div className='color-display-item'>
                <div className='color-box' style={{backgroundColor :palleteColor.fourth}}>
                </div>
                <p>{palleteColor.fourth}</p>
              </div>
          </div>
    </div>
  )
}

export default ColorPalete