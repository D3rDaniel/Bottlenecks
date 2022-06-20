import {React, useContext} from 'react'
import { Navigate } from 'react-router-dom'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Overview from '../components/projectDashboard/dashboardOverview/dashboardOverView'
import UserContext from '../store/user-context'
import ProjectContext from '../store/project-context'

const Project_OverviewPage = () => {

  const userCtx = useContext(UserContext);
  const projectCtx = useContext(ProjectContext);

  return userCtx.user_id == null || userCtx.user_id == undefined || projectCtx.project_id == null || projectCtx.project_id == undefined? <Navigate replace to='/Login'/> : 
    <div className='flex w-screen'>
        <Sidebar page="uebersicht" token={userCtx.user_token}/>
        <Overview token={userCtx.user_token} projectID ={projectCtx.project_id}/>  
    </div>
}

export default Project_OverviewPage