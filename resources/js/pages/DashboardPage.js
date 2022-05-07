import React from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardProjects from '../components/dashboard/dashboardProjects/DashboardProjects'

const DashboardPage = () => {
    return(
        <div className='flex w-screen'>
            <Sidebar></Sidebar>
            <DashboardProjects></DashboardProjects>
        </div>
    )
}

export default DashboardPage