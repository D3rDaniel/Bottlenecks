import React from 'react'

const SidebarButtonElement = ({img, desc, selected, gap}) => {
  return (
    <div className={`bg-white flex h-9 items-center pl-2
                    hover:border-2 rounded-xl border-blue hover:font-bold hover:cursor-pointer`}>
        <img src={img} alt="icon" className="w-6 h-5 mr-4"></img>
        <label className="">{desc}</label>
    </div>
  )
}

export default SidebarButtonElement