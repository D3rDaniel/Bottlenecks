import React from 'react'
import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import DashboardTasks from '../components/projectDashboard/dashboardTasks/DashboardTasks'

const ProjectPage = (props) => {

    return(
        <div className='flex w-screen'>
            <Sidebar page=""></Sidebar>
            <DashboardTasks projectID={props.projectID}></DashboardTasks>
        </div>
    )
}

export default ProjectPage