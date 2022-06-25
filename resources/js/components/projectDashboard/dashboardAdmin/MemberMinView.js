import React, {useState} from 'react'

import Arrow from '../../../../images/icons/arrow-black.png'
import MemberMaxView from './MemberMaxView'

const MemberMinView = (props) => {
    const [rotate, setRotate] = useState(0);

    const rotateArrow = () => { rotate ? setRotate(false) : setRotate(true) }

  return (
    <div className="mx-1 my-4">
        <div className={`flex h-8 bg-gray-200 ${rotate ? null : "drop-shadow-md"} rounded-md items-center justify-between`}>
            <div>
                
                <label className="ml-4 font-bold">{props.member.username}</label>  
            </div>
            
            <img src={Arrow} alt="maxView" className={`h-7 w-7 mr-3 mt-1 hover:cursor-pointer ${rotate ? "rotate-180" : "rotate-0"}`} onClick={rotateArrow}></img>
        </div>
        {rotate ? <MemberMaxView member={props.member} token={props.token} getData={props.getData}></MemberMaxView> : null}
    </div>
  )
}

export default MemberMinView