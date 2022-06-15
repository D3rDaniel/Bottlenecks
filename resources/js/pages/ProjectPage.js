import {React, useContext} from 'react'
import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import DashboardTasks from '../components/projectDashboard/dashboardTasks/DashboardTasks'
import UserContext from '../store/user-context'
import ProjectContext from '../store/project-context'
import { Navigate } from 'react-router-dom'

const ProjectPage = () => {

    const userCtx = useContext(UserContext);
    const projectCtx = useContext(ProjectContext);

    return userCtx.user_id == null || userCtx.user_id == undefined || projectCtx.project_id == null || projectCtx.project_id == undefined? <Navigate replace to='/Login'/> : 
    <div className='flex w-screen'>
            <Sidebar page="" projectTitle={projectCtx.project_title} isAdmin={userCtx.user_id === projectCtx.project_admin ? true : false }></Sidebar>
            <DashboardTasks token={userCtx.user_token} projectID={projectCtx.project_id}></DashboardTasks>
        </div>
}

export default ProjectPage