import React from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardAbgeschlosseneTasks from '../components/dashboard/dashboardAbgeschlosseneTasks/DashboardAbgeschlosseneTasks'

function AbgeschlosseneTasksPage(props) {
  return (
    <div className='flex w-screen'>
            <Sidebar></Sidebar>
            <DashboardAbgeschlosseneTasks userID={props.userID}></DashboardAbgeschlosseneTasks>
    </div>
  )
}

export default AbgeschlosseneTasksPage