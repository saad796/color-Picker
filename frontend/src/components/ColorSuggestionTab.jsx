import React from 'react'

function ColorSuggestionTab(props) {
  return (
    <div className="color-container">
          <h3>{props.title.toUpperCase()}</h3>
          <div className='color-display'>
            {
              props.suggestedColor.map((ele)=>{
                return (
                  <div className='color-display-item'>
                    <div className='color-box' style={{backgroundColor :ele}}>
                    </div>
                    <p>{ele}</p>
                  </div>
                )
              })
            }
          </div>
    </div>
  )
}

export default ColorSuggestionTab