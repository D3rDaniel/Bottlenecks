import React from 'react'

import {Link} from 'react-router-dom'
import Icon from '../../../../images/icons/nutzer.jpg'

const AdminButton = (props) => {
  return (
    <Link to={'/project/admin'}>
      <button className={`bg-lightorange text-white h-8 flex item-center pt-1 mx-2 rounded-xl border-black w-72
                            ${props.selected === "admin" ? "font-bold border-2" : ""}
                            hover:border-2 hover:font-bold hover:cursor-pointer`}>
      <img src= {Icon} alt="icon" className="h-5 w-5 float-left mx-2"></img>
      Admin - Dashboard</button>
    </Link>
  )
}

export default AdminButton 