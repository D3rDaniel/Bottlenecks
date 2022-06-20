import {React, useContext} from 'react'
import UserContext from '../store/user-context'
import ProjectContext from '../store/project-context'
import { Navigate } from 'react-router-dom'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Rooms from '../components/projectDashboard/dashboardRooms/dashboardRooms'

const Project_RoomsPage = () => {

  const userCtx = useContext(UserContext);
  const projectCtx = useContext(ProjectContext);

  return userCtx.user_id == null || userCtx.user_id == undefined || projectCtx.project_id == null || projectCtx.project_id == undefined? <Navigate replace to='/Login'/> : 
    <div className='flex w-screen'>
        <Sidebar page="rooms" token={userCtx.user_token}/>
        <Rooms token={userCtx.user_token} projectID={projectCtx.project_id}/>  
    </div>
}

export default Project_RoomsPage