import React from 'react'

import Plus from '../../../../images/icons/plus.png'

const MemberInputField = () => {
  return (
    <div className="mx-2 mb-2 flex drop-shadow-md">
    <input type="text" placeholder="Name..." className="bg-gray-200 placeholder-gray-600 w-full rounded-md pl-3 h-8 outline-none"></input>
    <div className="bg-blue rounded-r-md w-40 flex items-center justify-center hover:cursor-pointer">
        <button className="text-white hover:font-bold min-w-max text-sm">hinzufügen</button>
    </div>
</div>
  )
}

export default MemberInputField