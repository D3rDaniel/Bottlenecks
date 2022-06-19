import React from 'react'
import SidebarButtonList from './SidebarButtonList'
import SidebarButtonElement from './SidebarButtonElement'
import SignOut from './SignOutButton'
import Logo from '../../../../images/logo.jpg'
import InfoIcon from '../../../../images/icons/info.jpg'
import { Link } from 'react-router-dom'

const Sidebar = (props) => {
  return (
    <div className="flex flex-col min-w-max w-80 justify-between mt-2">
      
      {/* Header */}
      <div className="rounded-xl bg-white">
        <Link to='/'><img src= {Logo} alt="logo" className="h-16 w-16 mr-2 pl-2 float-left hover:cursor-pointer"></img></Link>
        <h1 className="font-bold text-xl mt-1">Dashboard</h1>
        <h2>von <span className="text-darkorange">{props.username}</span></h2>
      </div>

      {/* Body */}
      <div className="mt-16">
        <SidebarButtonList></SidebarButtonList> 
      </div>
      
      {/* Footer */}
      <div className="">
        <SidebarButtonElement
          img={InfoIcon}
          desc="Info" 
          selected="false"
          url="info">
        </SidebarButtonElement>
        <SignOut token={props.token}></SignOut>
      </div>
      
    </div>
  )
}

export default Sidebar 