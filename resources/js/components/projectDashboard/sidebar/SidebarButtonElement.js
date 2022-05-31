import React from 'react'
import {Link} from 'react-router-dom'

const SidebarButtonElement = (props) => {
  return (
    <Link to={`/project/${props.url}`}>
      <div className={`bg-white flex h-9 items-center pl-2 rounded-xl border-blue
                      ${props.selected === "true" ? "font-bold border-2" : ""}
                      hover:border-2  hover:font-bold hover:cursor-pointer
                      `}>
          <img src={props.img} alt="icon" className="w-6 h-6 mr-4"></img>
          <label className="">{props.desc}</label>
      </div>
    </Link>
  )
}

export default SidebarButtonElement