import React from 'react'

import Plus from '../../../../images/icons/plus.png'

const TagInputField = () => {
  return (
    <div className="mx-5 mb-4 flex drop-shadow-md">
        <input type="text" placeholder="Titel..." className="bg-customgray w-full rounded-l-md pl-3 h-8 outline-none"></input>
        <div className="bg-blue rounded-r-md w-40 flex items-center hover:cursor-pointer">
            <img src={Plus} alt="plus" className="h-6 w-6 mx-2"></img>
            <button className="text-white hover:font-bold">Neuer Tag</button>
        </div>
    </div>
    
  )
}

export default TagInputField