import {React, useContext, useState} from 'react'
import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Admin from '../components/projectDashboard/dashboardAdmin/dashboardAdmin'
import ProjectContext from '../store/project-context'
import UserContext from '../store/user-context'
import { Navigate } from 'react-router-dom'

const Project_AdminPage = () => {

  const [refresh,setRefresh] = useState(false)

    const projectCtx = useContext(ProjectContext);
    const userCtx = useContext(UserContext);

  return  userCtx.user_id == null || userCtx.user_id == undefined || projectCtx.project_id == null || projectCtx.project_id == undefined? <Navigate replace to='/Login'/> : (
    <div className='flex w-screen'>
        <Sidebar refresh={refresh} setRefresh={function(){setRefresh(false)}} page="admin" token={userCtx.user_token}/>
        <Admin setRefresh={function(){setRefresh(true)}} token={userCtx.user_token} userID = {userCtx.user_id} projectID={projectCtx.project_id}/>  
    </div>
  )
}

export default Project_AdminPage