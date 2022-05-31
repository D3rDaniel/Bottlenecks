import React from 'react'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Deadline from '../components/projectDashboard/dashboardDeadline/dashboardDeadline'

const Project_DeadlinePage = () => {
  return (
    <div className='flex w-screen'>
        <Sidebar page="deadline"/>
        <Deadline />  
    </div>
  )
}

export default Project_DeadlinePage