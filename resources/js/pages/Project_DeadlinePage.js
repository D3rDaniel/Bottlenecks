import {React, useContext} from 'react'
import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Deadline from '../components/projectDashboard/dashboardDeadline/dashboardDeadline'
import UserContext from '../store/user-context'
import ProjectContext from '../store/project-context'
import { Navigate } from 'react-router-dom'

const Project_DeadlinePage = () => {

  const userCtx = useContext(UserContext);
  const projectCtx = useContext(ProjectContext);

  return userCtx.user_id == null || userCtx.user_id == undefined || projectCtx.project_id == null || projectCtx.project_id == undefined? <Navigate replace to='/Login'/> : 
    <div className='flex w-screen'>
        <Sidebar page="deadline"/>
        <Deadline token={userCtx.user_token} projectID={projectCtx.project_id}/>  
    </div>
}

export default Project_DeadlinePage