import React from 'react'

import MemberMinView from './MemberMinView'
import InputField from './MemberInputField'

const MemberView = (props) => {

  return (
    <div className="bg-white rounded-xl w-1/3 h-3/4 drop-shadow-xl flex flex-col justify-between">
        <div>
            <div className="font-bold mt-2 ml-1">Mitglieder</div>
            <div className="h-full w-full">
                {props.members.map((member, index) => {
                    return (
                        <MemberMinView member={member} key={index}/>
                    )
                })}  
            </div>
   
        </div>
        
        <InputField />
    </div>
  )
}

export default MemberView