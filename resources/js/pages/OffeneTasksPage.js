import React from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardOffeneTasks from '../components/dashboard/dashboardOffeneTasks/DashboardOffeneTasks'
import PreviousMap from 'postcss/lib/previous-map';

function OffeneTasksPage(props) {

  return (
    <div className='flex w-screen'>
            <Sidebar></Sidebar>
            <DashboardOffeneTasks userID={props.userID}></DashboardOffeneTasks>
    </div>
  )
}

export default OffeneTasksPage