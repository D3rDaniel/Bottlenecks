import React from 'react'
import Icon from '../../../../images/icons/nutzer.jpg'

const AdminButton = () => {
  return (
    <button className="bg-lightorange text-white w-full h-8 mb-20 flex item-center pt-1 pl-1
    hover:border-2 rounded-xl border-black hover:font-bold hover:cursor-pointer` ">
    <img src= {Icon} alt="icon" className="h-5 w-5 float-left mr-2"></img>
    Admin - Dashboard</button>
  )
}

export default AdminButton 