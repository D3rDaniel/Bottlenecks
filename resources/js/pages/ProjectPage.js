import React from 'react'
import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import DashboardTasks from '../components/projectDashboard/dashboardTasks/DashboardTasks'

const ProjectPage = () => {

    const projectID = 1;

    return(
        <div className='flex w-screen'>
            <Sidebar></Sidebar>
            <DashboardTasks projectID={projectID}></DashboardTasks>
        </div>
    )
}

export default ProjectPage