import React from 'react'
import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import DashboardTasks from '../components/projectDashboard/dashboardTasks/DashboardTasks'

const ProjectPage = () => {
    return(
        <div className='flex w-screen'>
            <Sidebar></Sidebar>
            <DashboardTasks></DashboardTasks>
        </div>
    )
}

export default ProjectPage