import React, { useState } from 'react'

import Arrow from '../../../../images/icons/arrow-black.jpg'
import MaxView from './AnkuendigungMaximumView'

const AnkuendigungMinimumView = (props) => {

    const [rotate, setRotate] = useState(0);

    const rotateArrow = () => { rotate ? setRotate(false) : setRotate(true) }

  return (
    <div className="my-5 mx-8">
        <div className={`flex h-14 bg-white ${rotate ? null : "drop-shadow-md"} rounded-xl items-center`} >
            
            <div className="w-1/2 flex justify-between">
                <label className="ml-12 font-bold min-w-max">{props.message.subject}</label>
                <label className="mr-24 text-blue font-bold">{props.message.creator}</label>   
            </div>
                
            <label className="w-1/2">{props.message.created_at.substring(0,10)}</label>

            <img src={Arrow} alt="maxView" className={`h-5 w-5 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>
        </div>
        {rotate ? <MaxView subject={props.message.subject} message={props.message.message}></MaxView> : null}
    </div>
  )
}

export default AnkuendigungMinimumView