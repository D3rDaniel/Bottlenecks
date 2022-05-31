import React from 'react'

import Sidebar from '../components/projectDashboard/sidebar/Sidebar'
import Admin from '../components/projectDashboard/dashboardAdmin/dashboardAdmin'

const Project_AdminPage = () => {
  return (
    <div className='flex w-screen'>
        <Sidebar page="admin"/>
        <Admin />  
    </div>
  )
}

export default Project_AdminPage