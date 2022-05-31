import React from 'react'
import Admin from './AdminButton'
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
        <h1 className="font-bold text-xl mt-1">Projekt</h1>
        <h2><span className="text-darkorange">xxx</span></h2>
      </div>

      {/* Body */}
      <div className="-mt-12">
        <Admin selected={props.page} ></Admin>     
        <SidebarButtonList selected={props.page}></SidebarButtonList> 
      </div>
      
      {/* Footer */}
      <div>
        <SidebarButtonElement
          img={InfoIcon}
          desc="Info" 
          selected="false">
        </SidebarButtonElement>
        <SignOut></SignOut>
      </div>
      
    </div>
  )
}

export default Sidebar 