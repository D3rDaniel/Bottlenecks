import {React, useContext} from 'react'
import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Admin from '../components/projectDashboard/dashboardAdmin/dashboardAdmin'
import ProjectContext from '../store/project-context'
import UserContext from '../store/user-context'
import { Navigate } from 'react-router-dom'

const Project_AdminPage = () => {

    const projectCtx = useContext(ProjectContext);
    const userCtx = useContext(UserContext);

  return  userCtx.user_id == null || userCtx.user_id == undefined || projectCtx.project_id == null || projectCtx.project_id == undefined? <Navigate replace to='/Login'/> : (
    <div className='flex w-screen'>
        <Sidebar page="admin"/>
        <Admin token={userCtx.user_token} projectID={projectCtx.project_id}/>  
    </div>
  )
}

export default Project_AdminPage