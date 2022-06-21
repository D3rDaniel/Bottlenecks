import React, {useContext} from 'react'
import Admin from './AdminButton'
import SidebarButtonList from './SidebarButtonList'
import SidebarButtonElement from './SidebarButtonElement'
import SignOut from './SignOutButton'
import Logo from '../../../../images/logo.jpg'
import InfoIcon from '../../../../images/icons/info.jpg'
import ProjectContext from '../../../store/project-context'
import UserContext from '../../../store/user-context'
import { Link } from 'react-router-dom'

const Sidebar = (props) => {

  const projectCtx = useContext(ProjectContext);
  const userCtx = useContext(UserContext);

  return (
    <div className="flex flex-col min-w-max w-72 justify-between mt-1">
      
      {/* Header */}
        <div className="mb-10">
            <div className="rounded-xl bg-white h-16 mb-10">
                <Link to='/'><img src= {Logo} alt="logo" className="h-16 w-16 mr-2 pl-2 float-left hover:cursor-pointer"></img></Link>
                <h1 className="font-bold text-xl mt-1">Projekt</h1>
                <h2><span className="text-darkorange">{projectCtx.project_title.length > 20 ? projectCtx.project_title.toString().substring(0,19)+"..." : projectCtx.project_title}</span></h2>
            </div>    
            {userCtx.user_id === projectCtx.project_admin ? <Admin selected={props.page}></Admin> : ""}
        </div>
        
        <SidebarButtonList selected={props.page}></SidebarButtonList>          
    
      {/* Footer */}
      <div>
        <SidebarButtonElement
          img={InfoIcon}
          desc="Info" 
          selected="false">
        </SidebarButtonElement>
        <SignOut token={props.token}></SignOut>
      </div>
      
    </div>
  )
}

export default Sidebar 