import React, {useContext, useEffect} from 'react'
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

  let projectTitle = projectCtx.project_title

  useEffect(() => {
    projectTitle = projectCtx.project_title;
    props.refresh ? props.setRefresh(): {};
  }, [props.refresh ? props.refresh : {}])

  return (
    <div className="flex flex-col min-w-max w-72 justify-between mt-1">
      
      {/* Header */}
        <div className="mb-10">
            <div className="rounded-xl bg-white h-16 mb-10">
                <Link to='/'><img src= {Logo} alt="logo" className="h-16 w-16 mr-2 pl-2 float-left hover:cursor-pointer"></img></Link>
                <h1 className="font-bold text-xl mt-1">Projekt</h1>
                <h2><span className="text-darkorange">{projectTitle.length > 20 ? projectTitle.toString().substring(0,19)+"..." : projectTitle}</span></h2>
            </div>    
            {userCtx.user_name === projectCtx.project_admin ? <Admin selected={props.page}></Admin> : ""}
        </div>
        
        <SidebarButtonList selected={props.page}></SidebarButtonList>          
    
      {/* Footer */}
      <div>
        <SidebarButtonElement
          url="info"
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