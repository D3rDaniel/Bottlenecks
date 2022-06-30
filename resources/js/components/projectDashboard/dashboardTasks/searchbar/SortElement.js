import React, { useState } from 'react'
import Arrow from '../../../../../images/icons/arrow.jpg'

const SortElement = (props) => {

  const [rotate, setRotate] = useState(0);

  const sorElement = () => { 
    if(rotate){
        setRotate(false);
    }else{
        setRotate(true);
    }
    props.sortElements(event, rotate)
  }


  return (
    <div className={`flex mt-1 w-1/5`}>
        <label className="text-white">{props.label}</label>
        <img id={props.id} src={Arrow} alt="arrow" className={`w-4 h-4 mt-1.5 ml-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={sorElement}></img>    
    </div>
  )
}

export default SortElement