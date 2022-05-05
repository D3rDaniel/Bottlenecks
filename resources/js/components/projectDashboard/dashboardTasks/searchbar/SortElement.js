import React, { useState } from 'react'
import Arrow from '../../../../../images/icons/arrow.jpg'

const SortElement = ({label}) => {

  const [rotate, setRotate] = useState(0);

  const rotateArrow = () => { 
    if(rotate){
        setRotate(false);
    }else{
        setRotate(true);
    }
  }


  return (
    <div className={`flex mt-1 w-1/4`}>
        <label className="text-white">{label}</label>
        <img src={Arrow} alt="arrow" className={`w-4 h-4 mt-1.5 ml-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>    
    </div>
  )
}

export default SortElement