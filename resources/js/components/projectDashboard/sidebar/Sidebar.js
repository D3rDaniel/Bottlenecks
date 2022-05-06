import React from 'react'
import Admin from './AdminButton'
import SidebarButtonList from './SidebarButtonList'
import SidebarButtonElement from './SidebarButtonElement'
import SignOut from './SignOutButton'
import Logo from '../../../../images/logo.jpg'
import InfoIcon from '../../../../images/icons/info.jpg'

const Sidebar = () => {
  return (
    <div className="flex flex-col min-w-max w-80 justify-between mt-2">
      
      {/* Header */}
      <div className="rounded-xl bg-white">
        <img src= {Logo} alt="logo" className="h-16 w-16 mr-2 pl-2 float-left hover:cursor-pointer"></img>
        <h1 className="font-bold text-xl mt-1">Dashboard</h1>
        <h2>von <span className="text-darkorange">xxx</span></h2>
      </div>

      {/* Body */}
      <div className="-mt-12">
        <Admin></Admin>     
        <SidebarButtonList></SidebarButtonList> 
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