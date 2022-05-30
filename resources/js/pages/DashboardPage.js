import React from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardProjects from '../components/dashboard/dashboardProjects/DashboardProjects'

const DashboardPage = (props) => {
    return(
        <div className='flex w-screen'>
            <Sidebar/>
            <DashboardProjects userID={props.userID}/>
        </div>
    )
}

export default DashboardPage