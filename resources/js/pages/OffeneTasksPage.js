import React from 'react'
import Sidebar from '../components/dashboard/sidebar/Sidebar'
import DashboardOffeneTasks from '../components/dashboard/dashboardOffeneTasks/DashboardOffeneTasks'

function OffeneTasksPage() {
  return (
    <div className='flex w-screen'>
            <Sidebar></Sidebar>
            <DashboardOffeneTasks></DashboardOffeneTasks>
    </div>
  )
}

export default OffeneTasksPage