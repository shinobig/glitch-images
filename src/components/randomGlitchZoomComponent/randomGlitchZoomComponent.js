/* eslint-disable */
import React from 'react';



const randomGlitchZoomComponentTest = (props) => {
 // console.log(props)
  return (
    <div className="random-glitch" className="glitch-container" style={{ position: "fixed", top: `${props.positiony}vh`, left: `${props.positionx}vw`, width: `100vw`, height:`${props.maxHeight}vh` }}>
       <img src={props.imageSrc }  className="glitch-image"
      style={{top:`-${props.positiony}vh`, left :`-${props.positionx}vw`}}/>
    </div>
  )
}


/*<div className="random-glitch" style={{ position: "fixed", top: `${props.positiony}`, left: `${props.positionx}`, width: `${props.maxWidth}`, height:`${props.maxHeight}` }}>
    </div>
    */
export default randomGlitchZoomComponentTest;